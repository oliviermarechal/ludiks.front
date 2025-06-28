import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Users, 
    Trophy,
    Activity,
    AlertTriangle,
    ArrowUpRight,
    TrendingDown,
    Clock
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from "recharts";
import { CircuitStepInsight, useCircuitInsights } from '@/lib/hooks/use-circuit-insights.hook';
import { CircuitType } from "@/lib/types/circuit.types";
import { useLocale, useTranslations } from 'next-intl';

interface AnalyticsTabProps {
    circuitId: string;
}

function getCompletionColor(rate: number) {
    if (rate >= 80) return "bg-emerald-500/20 text-emerald-500 ring-emerald-500/30";
    if (rate >= 60) return "bg-blue-500/20 text-blue-500 ring-blue-500/30";
    if (rate >= 40) return "bg-yellow-500/20 text-yellow-500 ring-yellow-500/30";
    return "bg-red-500/20 text-red-500 ring-red-500/30";
}

function formatDurationAbs(seconds?: number | null, locale: string = "en"): string {
    if (seconds == null || isNaN(seconds)) return "-";
    if (seconds < 60) return new Intl.NumberFormat(locale).format(seconds) + (locale.startsWith("fr") ? " s" : "s");
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return new Intl.NumberFormat(locale).format(minutes) + (locale.startsWith("fr") ? " min" : "min");
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return new Intl.NumberFormat(locale).format(hours) + (locale.startsWith("fr") ? " h" : "h");
    const days = Math.floor(hours / 24);
    if (days < 7) return new Intl.NumberFormat(locale).format(days) + (locale.startsWith("fr") ? " j" : "d");
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return new Intl.NumberFormat(locale).format(weeks) + (locale.startsWith("fr") ? " sem" : "w");
    const months = Math.floor(days / 30);
    if (months < 12) return new Intl.NumberFormat(locale).format(months) + (locale.startsWith("fr") ? " mois" : "mo");
    const years = Math.floor(days / 365);
    return new Intl.NumberFormat(locale).format(years) + (locale.startsWith("fr") ? " an" : "y");
}

function CustomTooltip({ active, payload }: { active?: boolean, payload?: {payload: {name: string, usersCompleted: number, completionRate: number, avgTime: number}}[] }) {
    const locale = useLocale();
    const t = useTranslations('dashboard.circuits.insight');
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-black/90 border border-primary/20 p-3 rounded-lg">
                <p className="text-white font-medium mb-1">{data.name}</p>
                <div className="space-y-1 text-sm">
                    <p className="text-white/70">
                        <span className="text-secondary">{data.usersCompleted}</span> {t('tooltip.users')}
                    </p>
                    <p className="text-white/70">
                        {t('tooltip.completion_rate')} <span className="text-secondary">{data.completionRate}%</span>
                    </p>
                    <p className="text-white/70">
                        {t('tooltip.avg_time')} <span className="text-secondary">{formatDurationAbs(data.avgTime, locale)}</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
}

export function AnalyticsTab({ circuitId }: AnalyticsTabProps) {
    const locale = useLocale();
    const t = useTranslations('dashboard.circuits.insight');
    const { data: circuit, isLoading, error } = useCircuitInsights(circuitId);

    if (isLoading) {
        return <div>{t('loading')}</div>;
    }
    if (error || !circuit) {
        return <div>{t('error')}</div>;
    }

    const getStepLabel = (step: CircuitStepInsight) => {
        switch (circuit.type) {
            case CircuitType.OBJECTIVE:
                return step.name;
            case CircuitType.ACTIONS:
                return t('step_labels.actions', { threshold: step.completionThreshold });
            case CircuitType.POINTS:
                return t('step_labels.points', { threshold: step.completionThreshold });
            default:
                return step.name;
        }
    }

    const chartData = circuit.steps?.map((step) => ({
        name: getStepLabel(step),
        usersCompleted: step.usersCompleted,
        completionRate: step.completionRate,
        avgTime: step.avgTime
    }));

    // Calculer le drop rate entre les étapes consécutives
    let maxDropRate = 0;
    let dropStepName = '';
    
    if (circuit.steps && circuit.steps.length > 1) {
        for (let i = 0; i < circuit.steps.length - 1; i++) {
            const currentStep = circuit.steps[i];
            const nextStep = circuit.steps[i + 1];
            const dropRate = currentStep.completionRate - nextStep.completionRate;
            
            if (dropRate > maxDropRate) {
                maxDropRate = dropRate;
                dropStepName = getStepLabel(nextStep);
            }
        }
    }

    const dropRate = maxDropRate;

    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6">
                <Card className="p-6 border-secondary/20 bg-surface-2 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                            <Users className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                            <p className="text-sm text-foreground/70">{t('stats.active_users')}</p>
                            <p className="text-2xl font-bold text-foreground">{circuit.activeUsers}</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-6 border-secondary/20 bg-surface-2 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                            <Trophy className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                            <p className="text-sm text-foreground/70">{t('stats.completion_rate')}</p>
                            <p className="text-2xl font-bold text-foreground">{circuit.completionRate}%</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-6 border-secondary/20 bg-surface-2 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                            <Activity className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                            <p className="text-sm text-foreground/70">{t('stats.steps')}</p>
                            <p className="text-2xl font-bold text-foreground">{circuit.steps.length}</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-6 border-secondary/20 bg-surface-2 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                            <Clock className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                            <p className="text-sm text-foreground/70">{t('stats.avg_time')}</p>
                            <p className="text-2xl font-bold text-foreground">{formatDurationAbs(circuit.avgCompletionTime, locale)}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Visual Overview */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-foreground">{t('overview.title')}</h2>
                        <p className="text-sm text-foreground/70 mt-1">
                            {t('overview.subtitle')}
                        </p>
                    </div>
                    {dropRate > 50 && (
                        <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">
                            <TrendingDown className="h-5 w-5" />
                            <span className="text-sm font-medium">
                                {t('overview.drop_alert', { rate: dropRate, step: dropStepName })}
                            </span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {/* Completion Rate Chart */}
                    <Card className="p-6 border-secondary/20 bg-surface-2 backdrop-blur-sm">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-foreground">{t('charts.completion_rate.title')}</h3>
                            <p className="text-sm text-foreground/70">{t('charts.completion_rate.subtitle')}</p>
                        </div>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={chartData}
                                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                                >
                                    <defs>
                                        <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-foreground/5" />
                                    <XAxis 
                                        dataKey="name" 
                                        tick={{ fill: 'var(--foreground)' }}
                                        tickLine={{ stroke: 'var(--foreground)' }}
                                        opacity={0.5}
                                    />
                                    <YAxis
                                        tick={{ fill: 'var(--foreground)' }}
                                        tickLine={{ stroke: 'var(--foreground)' }}
                                        opacity={0.5}
                                        tickFormatter={(value) => `${value}%`}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        type="monotone"
                                        dataKey="completionRate"
                                        stroke="var(--secondary)"
                                        fill="url(#colorProgress)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Time Distribution Chart */}
                    <Card className="p-6 border-secondary/20 bg-surface-2 backdrop-blur-sm">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-foreground">{t('charts.completion_time.title')}</h3>
                            <p className="text-sm text-foreground/70">{t('charts.completion_time.subtitle')}</p>
                        </div>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={chartData}
                                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                                >
                                    <CartesianGrid 
                                        strokeDasharray="3 3" 
                                        className="stroke-foreground/5" 
                                        vertical={false}
                                    />
                                    <XAxis 
                                        dataKey="name"
                                        tick={{ fill: 'var(--foreground)' }}
                                        tickLine={{ stroke: 'var(--foreground)' }}
                                        opacity={0.5}
                                    />
                                    <YAxis
                                        tick={{ fill: 'var(--foreground)' }}
                                        tickLine={{ stroke: 'var(--foreground)' }}
                                        opacity={0.5}
                                    />
                                    <Tooltip 
                                        content={<CustomTooltip />}
                                        cursor={{ fill: 'transparent' }}
                                    />
                                    <Bar 
                                        dataKey="avgTime" 
                                        fill="var(--secondary)"
                                        opacity={0.8}
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Steps Progress */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-foreground">{t('steps_progress.title')}</h2>
                </div>

                <div className="grid gap-4">
                    {circuit.steps.map((step) => (
                        <div 
                            key={step.id}
                            className="p-6 rounded-xl border border-secondary/20 bg-surface-2 hover:bg-surface-3 transition-all duration-200"
                        >
                            <div className="flex items-center gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-semibold text-foreground">
                                            {step.name}
                                        </h3>
                                        {step.alert && (
                                            <div className="flex items-center gap-1.5 text-red-500 bg-red-500/10 px-2 py-1 rounded-full text-sm">
                                                <AlertTriangle className="h-4 w-4" />
                                                {t('steps_progress.friction_point')}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4 grid grid-cols-3 gap-4">
                                        <div>
                                            <p className="text-sm text-foreground/50">{t('steps_progress.users')}</p>
                                            <p className="text-lg font-semibold text-foreground">{step.usersCompleted}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-foreground/50">{t('steps_progress.completion_rate')}</p>
                                            <p className="text-lg font-semibold text-foreground">{step.completionRate}%</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-foreground/50">{t('steps_progress.avg_time')}</p>
                                            <p className="text-lg font-semibold text-foreground">{formatDurationAbs(step.avgTime, locale)}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-foreground/70">{t('steps_progress.progress')}</span>
                                            <span className={cn(
                                                "font-medium",
                                                getCompletionColor(step.completionRate).split(" ")[1]
                                            )}>
                                                {step.completionRate}%
                                            </span>
                                        </div>
                                        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                                            <div 
                                                className={cn(
                                                    "h-full rounded-full transition-all duration-500",
                                                    getCompletionColor(step.completionRate).split(" ")[0]
                                                )}
                                                style={{ width: `${step.completionRate}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Link 
                                    href={`/dashboard/circuits/${circuit.id}/steps/${step.id}`}
                                    className="shrink-0"
                                >
                                    <Button 
                                        variant="ghost" 
                                        size="icon"
                                        className="text-secondary/30 hover:text-secondary"
                                    >
                                        <ArrowUpRight className="h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 