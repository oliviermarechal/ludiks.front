'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    PlusCircle,
    Activity,
    Sparkles,
    Loader2,
    Target,
    Repeat,
    Star,
    LucideIcon,
    Trash2,
} from "lucide-react";
import { CircuitType, Step } from "@/lib/types/circuit.types";
import { useProjectStore } from "@/lib/stores/project-store";
import { useCircuits } from "@/lib/hooks/use-circuits.hook";
import { useTranslations } from "next-intl";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Link } from "@/lib/navigation";

const circuitTypeIcons: Record<CircuitType, LucideIcon> = {
    points: Star,
    actions: Repeat,
    objective: Target
};

export default function CircuitsPage() {
    const { selectedProject } = useProjectStore();
    const projectId = selectedProject?.id;
    const { circuits, deleteCircuit } = useCircuits(projectId);
    const isLoading = false;
    const error = null;
    const t = useTranslations('dashboard.circuits.list');
    const tCommon = useTranslations('dashboard.circuits.common');

    const handleDeleteCircuit = async (circuitId: string, circuitName: string) => {
        try {
            await deleteCircuit({ circuitId });
            toast.success(tCommon('success.circuitDeleted', { name: circuitName }));
        } catch (err) {
            console.error('Error deleting circuit:', err);
            toast.error(tCommon('errors.deleteFailed'));
        }
    };

    if (!projectId) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-foreground/60">{tCommon('errors.projectRequired.description')}</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-secondary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">{tCommon('errors.loadFailed')}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            {tCommon('title')}
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            {t('description')}
                        </p>
                    </div>
                    <Link href="/dashboard/circuits/new">
                        <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            {tCommon('actions.create')}
                        </Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <Link href="/dashboard/circuits/new" className="block">
                        <Card className="p-6 border border-dashed border-border hover:border-primary transition-colors bg-background flex flex-col items-center justify-center text-center cursor-pointer group h-full">
                            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                                <Sparkles className="h-6 w-6 text-secondary" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">{t('emptyState.createFirst.title')}</h3>
                            <p className="text-sm text-muted-foreground">
                                {t('emptyState.createFirst.description')}
                            </p>
                        </Card>
                    </Link>

                    {circuits?.map((circuit) => {
                        const TypeIcon = circuitTypeIcons[circuit.type as CircuitType];
                        return (
                            <div key={circuit.id} className="relative group">
                                <Link href={`/dashboard/circuits/${circuit.id}`} className="block">
                                    <Card
                                        className="p-6 border border-border group-hover:border-primary transition-colors bg-background cursor-pointer"
                                    >
                                        {/* Header with status and actions */}
                                        <div className="flex justify-between items-start mb-1">
                                            {/* Status Badge */}
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                circuit.active 
                                                    ? 'bg-green-500/10 text-green-600 border border-green-500/20' 
                                                    : 'bg-muted text-muted-foreground border border-border'
                                            }`}>
                                                {circuit.active ? tCommon('status.active') : tCommon('status.draft')}
                                            </span>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>{tCommon('delete.title')}</AlertDialogTitle>
                                                            <AlertDialogDescription asChild>
                                                                <div className="space-y-4 text-sm text-muted-foreground">
                                                                    <div>
                                                                        {tCommon('delete.description')}
                                                                    </div>
                                                                    <ul className="list-disc pl-4 space-y-2">
                                                                        <li>{tCommon('delete.consequences.steps')}</li>
                                                                        <li>{tCommon('delete.consequences.data')}</li>
                                                                        <li>{tCommon('delete.consequences.stats')}</li>
                                                                    </ul>
                                                                    <div className="font-medium">
                                                                        {tCommon('delete.confirm')}
                                                                    </div>
                                                                </div>
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>{tCommon('buttons.cancel')}</AlertDialogCancel>
                                                            <AlertDialogAction 
                                                                onClick={() => handleDeleteCircuit(circuit.id, circuit.name)}
                                                                className="bg-red-500 hover:bg-red-600 text-white"
                                                            >
                                                                {tCommon('actions.delete')}
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>

                                        {/* Circuit Info */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <TypeIcon className="h-5 w-5 text-secondary" />
                                                    <h3 className="text-lg font-semibold text-foreground group-hover:text-secondary transition-colors">
                                                        {circuit.name}
                                                    </h3>
                                                </div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="inline-block px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded">
                                                        {tCommon(`form.type.${circuit.type}.label`)}
                                                    </span>
                                                    <span className="inline-block px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded">
                                                        {circuit.steps?.length || 0} {t('steps')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 overflow-x-auto pb-2">
                                            {circuit.steps?.sort((a: Step, b: Step) => (a?.stepNumber || 0) - (b?.stepNumber || 0)).map((step: Step) => (
                                                <div
                                                    key={step.id}
                                                    className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full min-w-fit"
                                                >
                                                    {circuit.type === 'objective' ? (
                                                        <>
                                                            <Activity className="h-4 w-4 text-secondary" />
                                                            <span className="text-xs text-foreground">{step.name}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Activity className="h-4 w-4 text-secondary" />
                                                            <span className="text-xs text-foreground">{t('stepLevel', { number: step.stepNumber || 0 })}</span>
                                                            <span className="text-xs text-secondary">×{step.completionThreshold}</span>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
