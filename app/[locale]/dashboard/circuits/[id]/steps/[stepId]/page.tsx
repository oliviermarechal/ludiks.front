'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Upload, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { CircuitType } from "@/lib/types/circuit.types";
import { useProjectMetadatas } from "@/lib/hooks/use-project-metadata.hook";
import { useCircuitInsights } from "@/lib/hooks/use-circuit-insights.hook";
import { useParams } from "next/navigation";
import { useProjectStore } from "@/lib/stores/project-store";
import { UserStepList } from "./user-step-list";
import { useTranslations } from "next-intl";

function getCompletionColor(rate: number) {
    if (rate >= 80) return "bg-emerald-500/20 text-emerald-500";
    if (rate >= 60) return "bg-blue-500/20 text-blue-500";
    if (rate >= 40) return "bg-yellow-500/20 text-yellow-500";
    return "bg-red-500/20 text-red-500";
}

function getObjectiveLabel(type: CircuitType, t: (key: string) => string): string {
    switch (type) {
        case CircuitType.ACTIONS:
            return t('detail.stats.objective.actions');
        case CircuitType.POINTS:
            return t('detail.stats.objective.points');
        case CircuitType.OBJECTIVE:
            return t('detail.stats.objective.objective');
        default:
            return t('detail.stats.objective.default');
    }
}

function getObjectiveSuffix(type: CircuitType): string {
    return type === CircuitType.POINTS ? ' pts' : 'x';
}

export default function StepDetailPage() {
    const t = useTranslations('dashboard.circuits.steps');
    const params = useParams();
    const stepId = params.stepId as string;
    const circuitId = params.id as string;

    const { selectedProject } = useProjectStore()
    const { data: projectMetadatas } = useProjectMetadatas(selectedProject?.id || '');
    const { data: circuitInsights } = useCircuitInsights(circuitId);

    const stepData = useMemo(() => {
        if (!circuitInsights) return null;
        const step = circuitInsights.steps.find(s => s.id === stepId);
        if (!step) return null;
        
        return {
            id: step.id,
            name: step.name,
            completionRate: step.completionRate,
            icon: Upload,
            completionThreshold: step.completionThreshold,
            usersCompleted: step.usersCompleted,
            alert: step.alert,
            totalUsers: circuitInsights.activeUsers,
            usersOnThisStep: step.usersOnThisStep,
            circuitId: circuitId,
            circuitType: circuitInsights.type
        };
    }, [circuitInsights, stepId, circuitId]);

    if (!stepData) {
        return <div>{t('detail.loading')}</div>;
    }

    return (
        <div className="container mx-auto py-12">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header avec bouton retour */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href={`/dashboard/circuits/${stepData.circuitId}`}>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            {stepData.name}
                        </h1>
                    </div>
                </div>

                {/* Info de l'étape */}
                <Card className="p-6 border-primary/20 bg-surface-2 backdrop-blur-sm">
                    <div className="flex items-start gap-6">
                        <div className={cn(
                            "h-12 w-12 rounded-lg flex items-center justify-center shrink-0",
                            getCompletionColor(stepData.completionRate)
                        )}>
                            <stepData.icon className="h-6 w-6" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-lg font-semibold text-foreground">
                                    {stepData.name}
                                </h2>
                                {stepData.alert && (
                                    <div className="flex items-center gap-1.5 text-red-500 bg-red-500/10 px-2 py-1 rounded-full text-sm">
                                        <AlertTriangle className="h-4 w-4" />
                                        {t('detail.friction_point')}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="bg-surface-3 rounded-lg p-4">
                                    <p className="text-sm text-foreground/60 mb-1">{t('detail.stats.completion_rate')}</p>
                                    <p className="text-2xl font-bold text-foreground">{stepData.completionRate}%</p>
                                </div>
                                <div className="bg-surface-3 rounded-lg p-4">
                                    <p className="text-sm text-foreground/60 mb-1">{t('detail.stats.users_on_step')}</p>
                                    <p className="text-2xl font-bold text-foreground">
                                        {stepData.usersOnThisStep}
                                    </p>
                                </div>
                                <div className="bg-surface-3 rounded-lg p-4">
                                    <p className="text-sm text-foreground/60 mb-1">{getObjectiveLabel(stepData.circuitType, t)}</p>
                                    <p className="text-2xl font-bold text-foreground">
                                        {stepData.completionThreshold}{getObjectiveSuffix(stepData.circuitType)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Liste des utilisateurs */}
                <UserStepList 
                    circuitId={circuitId}
                    stepId={stepId}
                    projectMetadatas={projectMetadatas}
                />
            </div>
        </div>
    );
}

