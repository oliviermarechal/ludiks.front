import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Star, Repeat, Target } from "lucide-react";
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

interface CircuitHeaderProps {
    name: string;
    type: 'objective' | 'points' | 'actions';
    className?: string;
    active: boolean;
    activable: boolean;
    onActivate: () => void;
}

const typeIcons = {
    points: Star,
    actions: Repeat,
    objective: Target
};

const typeLabels = {
    points: 'Points',
    actions: 'Actions',
    objective: 'Objectifs'
};

export function CircuitHeader({ name, type, className, active, onActivate, activable }: CircuitHeaderProps) {
    const Icon = typeIcons[type];

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
                                        Type de parcours:
                                    </span>
                                    <span className="text-sm px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">
                                        {typeLabels[type]}
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
                                        Activer
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Activer le parcours</AlertDialogTitle>
                                        <AlertDialogDescription asChild>
                                            <div className="space-y-4 text-sm text-muted-foreground">
                                                <div>
                                                    Vous êtes sur le point d&apos;activer ce parcours. Cette action est irréversible et aura les conséquences suivantes :
                                                </div>
                                                <ul className="list-disc pl-4 space-y-2">
                                                    <li>Les étapes du parcours ne pourront plus être modifiées</li>
                                                    <li>Les données des utilisateurs commenceront à être collectées</li>
                                                    <li>Les statistiques seront disponibles dans l&apos;onglet Analyse</li>
                                                </ul>
                                                <div className="font-medium">
                                                    Êtes-vous sûr de vouloir activer ce parcours ?
                                                </div>
                                            </div>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                                        <AlertDialogAction onClick={onActivate} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                                            Activer le parcours
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 