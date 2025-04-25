'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    PlusCircle,
    Users,
    Activity,
    Trophy,
    ArrowUpRight,
    Sparkles,
    Loader2,
    Target,
    Repeat,
    Star
} from "lucide-react";
import { useCircuits } from "@/lib/hooks/use-circuits.hook";
import { CircuitType } from "@/lib/types/circuit";
import { useCircuitStore } from "@/lib/stores/circuit-store";
import Link from "next/link";

const circuitTypeIcons: Record<CircuitType, any> = {
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
    const { circuits, isLoading, error } = useCircuits(projectId);

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
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r to-primary via-secondary from-secondary text-transparent bg-clip-text">
                        Parcours
                    </h1>
                    <p className="text-foreground/60 mt-2">
                        Créez et gérez vos parcours utilisateurs
                    </p>
                </div>
                <Link href="/dashboard/circuits/new">
                    <Button className="bg-secondary hover:bg-secondary/90 text-black">
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Nouveau parcours
                    </Button>
                </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Link href="/dashboard/circuits/new" className="block">
                    <Card className="p-6 border border-dashed border-primary/20 hover:border-primary transition-colors bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-center cursor-pointer group h-full">
                        <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                        <Sparkles className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Créer un nouveau parcours</h3>
                    <p className="text-sm text-white/60">
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
                                className="p-6 border border-primary/20 hover:border-primary transition-colors bg-black/40 backdrop-blur-sm group cursor-pointer"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <TypeIcon className="h-5 w-5 text-secondary" />
                                            <h3 className="text-lg font-semibold text-white group-hover:text-secondary transition-colors">
                                                {circuit.name}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-white/60">
                                            {circuit.description}
                                        </p>
                                        <span className="inline-block px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded mt-2">
                                            {circuitTypeLabels[circuit.type]}
                                        </span>
                                    </div>
                                    <ArrowUpRight className="h-5 w-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                                    {circuit.steps?.sort((a, b) => a.stepNumber - b.stepNumber).map((step) => (
                                        <div
                                            key={step.id}
                                            className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full min-w-fit"
                                        >
                                            <Activity className="h-4 w-4 text-secondary" />
                                            <span className="text-xs text-white/80">{step.name}</span>
                                            {step.completionThreshold > 1 && (
                                                <span className="text-xs text-secondary">×{step.completionThreshold}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-3 gap-4 mt-6">
                                    <div className="flex flex-col items-center p-3 bg-black/20 rounded-lg">
                                        <Users className="h-5 w-5 text-secondary mb-2" />
                                        <span className="text-sm font-semibold text-white">{circuit.activeUsers || 0}</span>
                                        <span className="text-xs text-white/60">Utilisateurs</span>
                                    </div>
                                    <div className="flex flex-col items-center p-3 bg-black/20 rounded-lg">
                                        <Activity className="h-5 w-5 text-secondary mb-2" />
                                        <span className="text-sm font-semibold text-white">{circuit.completionRate || 0}%</span>
                                        <span className="text-xs text-white/60">Complétion</span>
                                    </div>
                                    <div className="flex flex-col items-center p-3 bg-black/20 rounded-lg">
                                        <Trophy className="h-5 w-5 text-secondary mb-2" />
                                        <span className="text-sm font-semibold text-white">{circuit.steps.length}</span>
                                        <span className="text-xs text-white/60">Étapes</span>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}



