import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Star, Repeat, Target, Trash2 } from "lucide-react";
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
import { useTranslations } from "next-intl";
import { useRouter } from '@/lib/navigation';
import { toast } from "sonner";

interface CircuitHeaderProps {
    name: string;
    type: 'objective' | 'points' | 'actions';
    className?: string;
    active: boolean;
    activable: boolean;
    onActivate: () => void;
    onDelete?: () => void;
}

const typeIcons = {
    points: Star,
    actions: Repeat,
    objective: Target
};

export function CircuitHeader({ name, type, className, active, onActivate, activable, onDelete }: CircuitHeaderProps) {
    const Icon = typeIcons[type];
    const t = useTranslations('dashboard.circuits.common');
    const router = useRouter();

    const handleDelete = async () => {
        if (onDelete) {
            try {
                await onDelete();
                toast.success(`Parcours "${name}" supprimé avec succès`);
                router.push('/dashboard/circuits');
            } catch (err) {
                console.error('Error deleting circuit:', err);
                toast.error("Erreur lors de la suppression du parcours");
            }
        }
    };

    return (
        <div className={cn("relative overflow-hidden rounded-xl border border-border bg-card", className)}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-transparent"></div>
            <div className="relative px-8 py-6">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                                <Icon className="h-5 w-5 text-secondary" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-foreground">
                                    {name}
                                </h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm text-muted-foreground">
                                        {t('form.type.title')}:
                                    </span>
                                    <span className="text-sm px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">
                                        {t(`form.type.${type}.label`)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        {!active && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button 
                                        variant="outline"
                                        disabled={!activable}
                                        className={cn("border-secondary/20 hover:border-secondary/40 bg-secondary/10 hover:bg-secondary/20 text-secondary", !activable && "opacity-50 cursor-not-allowed")}
                                    >
                                        {t('actions.activate')}
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>{t('actions.activate')}</AlertDialogTitle>
                                        <AlertDialogDescription asChild>
                                            <div className="space-y-4 text-sm text-muted-foreground">
                                                <div>
                                                    {t('activate.description')}
                                                </div>
                                                <ul className="list-disc pl-4 space-y-2">
                                                    <li>{t('activate.consequences.steps')}</li>
                                                    <li>{t('activate.consequences.data')}</li>
                                                    <li>{t('activate.consequences.stats')}</li>
                                                </ul>
                                                <div className="font-medium">
                                                    {t('activate.confirm')}
                                                </div>
                                            </div>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>{t('buttons.cancel')}</AlertDialogCancel>
                                        <AlertDialogAction onClick={onActivate} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                                            {t('actions.activate')}
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                        
                        {/* Delete button */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button 
                                    variant="outline"
                                    className="border-red-500/20 hover:border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-500"
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    {t('actions.delete')}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>{t('delete.title')}</AlertDialogTitle>
                                    <AlertDialogDescription asChild>
                                        <div className="space-y-4 text-sm text-muted-foreground">
                                            <div>
                                                {t('delete.description')}
                                            </div>
                                            <ul className="list-disc pl-4 space-y-2">
                                                <li>{t('delete.consequences.steps')}</li>
                                                <li>{t('delete.consequences.data')}</li>
                                                <li>{t('delete.consequences.stats')}</li>
                                            </ul>
                                            <div className="font-medium">
                                                {t('delete.confirm')}
                                            </div>
                                        </div>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>{t('buttons.cancel')}</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white">
                                        {t('actions.delete')}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
        </div>
    );
} 