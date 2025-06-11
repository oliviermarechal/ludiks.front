'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    PlusCircle,
    Activity,
    ArrowUpRight,
    Sparkles,
    Loader2,
    Target,
    Repeat,
    Star,
    LucideIcon
} from "lucide-react";
import { useCircuitStore, CircuitType, Step } from "@/lib/stores/circuit-store";
import Link from "next/link";
import { useCircuits } from "@/lib/hooks/use-circuits.hook";

const circuitTypeIcons: Record<CircuitType, LucideIcon> = {
    points: Star,
    actions: Repeat,
    objective: Target
};

const circuitTypeLabels: Record<CircuitType, string> = {
    points: 'Points',
    actions: 'Actions',
    objective: 'Objectifs'
};

export default function CircuitsPage() {
    const { projectId } = useCircuitStore();
    const { circuits } = useCircuits(projectId);
    const isLoading = false;
    const error = null;

    if (!projectId) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-foreground/60">Veuillez sélectionner un projet</p>
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
                <p className="text-red-500">Une erreur est survenue lors du chargement des circuits</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Parcours
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Créez et gérez vos parcours utilisateurs
                        </p>
                    </div>
                    <Link href="/dashboard/circuits/new">
                        <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Nouveau parcours
                        </Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <Link href="/dashboard/circuits/new" className="block">
                        <Card className="p-6 border border-dashed border-border hover:border-primary transition-colors bg-background flex flex-col items-center justify-center text-center cursor-pointer group h-full">
                            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                                <Sparkles className="h-6 w-6 text-secondary" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Créer un nouveau parcours</h3>
                            <p className="text-sm text-muted-foreground">
                                Définissez un nouveau parcours utilisateur à analyser
                            </p>
                        </Card>
                    </Link>

                    {circuits?.map((circuit) => {
                        const TypeIcon = circuitTypeIcons[circuit.type as CircuitType];
                        return (
                            <Link 
                                key={circuit.id} 
                                href={`/dashboard/circuits/${circuit.id}`}
                                className="block"
                            >
                                <Card
                                    className="p-6 border border-border hover:border-primary transition-colors bg-background group cursor-pointer"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <TypeIcon className="h-5 w-5 text-secondary" />
                                                <h3 className="text-lg font-semibold text-foreground group-hover:text-secondary transition-colors">
                                                    {circuit.name}
                                                </h3>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {circuit.description || 'Aucune description'}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="inline-block px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded">
                                                    {circuitTypeLabels[circuit.type as CircuitType]}
                                                </span>
                                                <span className="inline-block px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded">
                                                    {circuit.steps?.length || 0} étapes
                                                </span>
                                            </div>
                                        </div>
                                        <ArrowUpRight className="h-5 w-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
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
                                                        <span className="text-xs text-foreground">Pallier {step.stepNumber}</span>
                                                        <span className="text-xs text-secondary">×{step.completionThreshold}</span>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
