import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Star, Repeat, Target } from "lucide-react";

interface CircuitHeaderProps {
    name: string;
    description: string;
    type: 'objective' | 'points' | 'actions';
    className?: string;
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

export function CircuitHeader({ name, description, type, className }: CircuitHeaderProps) {
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
                        <p className="text-base text-muted-foreground max-w-2xl">
                            {description}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button 
                            variant="outline" 
                            className="border-border hover:bg-accent hover:text-accent-foreground"
                        >
                            Prévisualiser
                        </Button>
                        <Button 
                            variant="outline"
                            className="border-secondary/20 hover:border-secondary/40 bg-secondary/10 hover:bg-secondary/20 text-secondary"
                        >
                            Activer
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
} 