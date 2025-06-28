'use client';

import { Circuit } from "@/lib/types/circuit.types";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users, Trophy, Target, Flag } from "lucide-react";
import { useRewards } from "@/lib/hooks/use-rewards.hook";

interface OverviewTabProps {
    circuit: Circuit;
}

export function OverviewTab({ circuit }: OverviewTabProps) {
    const t = useTranslations('dashboard.circuits.common');
    const { rewards } = useRewards(circuit.id);

    const getStepName = (stepId: string) => {
        const step = circuit.steps?.find(step => step.id === stepId);
        return step?.name || t('overview.unknownStep');
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        {t('overview.summary')}
                    </CardTitle>
                    <CardDescription>
                        {t('overview.summaryDescription')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg">
                            <Clock className="h-5 w-5 text-secondary" />
                            <div>
                                <p className="text-sm font-medium">{t('overview.steps')}</p>
                                <p className="text-2xl font-bold">{circuit.steps?.length || 0}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg">
                            <Trophy className="h-5 w-5 text-secondary" />
                            <div>
                                <p className="text-sm font-medium">{t('overview.rewards')}</p>
                                <p className="text-2xl font-bold">{rewards?.length || 0}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg">
                            <Users className="h-5 w-5 text-secondary" />
                            <div>
                                <p className="text-sm font-medium">{t('overview.status')}</p>
                                <Badge variant={circuit.active ? "default" : "secondary"}>
                                    {circuit.active ? t('overview.active') : t('overview.inactive')}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t('overview.stepsTitle')}</CardTitle>
                    <CardDescription>
                        {t('overview.stepsDescription')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {circuit.steps && circuit.steps.length > 0 ? (
                        <div className="space-y-3">
                            {circuit.steps.map((step, index) => (
                                <div key={step.id} className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg">
                                    <div className="flex items-center justify-center w-8 h-8 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">{step.name}</p>
                                        <p className="text-sm text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            {t('overview.noSteps')}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t('overview.rewardsTitle')}</CardTitle>
                    <CardDescription>
                        {t('overview.rewardsDescription')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {rewards && rewards.length > 0 ? (
                        <div className="space-y-3">
                            {rewards.map((reward, index) => (
                                <div key={reward.id} className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg">
                                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">{reward.name}</p>
                                        <p className="text-sm text-muted-foreground">{reward.description}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {reward.stepId ? (
                                            <Badge variant="outline" className="flex items-center gap-1">
                                                <Target className="h-3 w-3" />
                                                <span className="text-xs">
                                                    {t('overview.stepReward')}: {getStepName(reward.stepId)}
                                                </span>
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="flex items-center gap-1">
                                                <Flag className="h-3 w-3" />
                                                {t('overview.completionReward')}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            {t('overview.noRewards')}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
} 