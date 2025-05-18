import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Users, 
    Trophy,
    Activity,
    AlertTriangle,
    ChevronRight,
    ArrowUpRight,
    TrendingDown,
    Clock
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from "recharts";
import { ExtendedCircuit, ExtendedStep } from "@/app/dashboard/circuits/[id]/page";

interface AnalyticsTabProps {
    circuit: ExtendedCircuit;
}

function getCompletionColor(rate: number) {
    if (rate >= 80) return "bg-emerald-500/20 text-emerald-500 ring-emerald-500/30";
    if (rate >= 60) return "bg-blue-500/20 text-blue-500 ring-blue-500/30";
    if (rate >= 40) return "bg-yellow-500/20 text-yellow-500 ring-yellow-500/30";
    return "bg-red-500/20 text-red-500 ring-red-500/30";
}

function CustomTooltip({ active, payload }: { active?: boolean, payload?: {payload: {name: string, usersCompleted: number, completionRate: number, avgTime: string}}[] }) {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-black/90 border border-primary/20 p-3 rounded-lg">
                <p className="text-white font-medium mb-1">{data.name}</p>
                <div className="space-y-1 text-sm">
                    <p className="text-white/70">
                        <span className="text-secondary">{data.usersCompleted}</span> utilisateurs
                    </p>
                    <p className="text-white/70">
                        Taux de complétion: <span className="text-secondary">{data.completionRate}%</span>
                    </p>
                    <p className="text-white/70">
                        Temps moyen: <span className="text-secondary">{data.avgTime}</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
}

export function AnalyticsTab({ circuit }: AnalyticsTabProps) {
    const chartData = circuit.steps?.map((step: ExtendedStep) => ({
        name: step.name,
        usersCompleted: step.usersCompleted,
        completionRate: step.completionRate,
        avgTime: step.avgTime
    }));

    const previousStepRate = 100;
    const dropRate = previousStepRate - circuit.steps[2].completionRate;

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
                            <p className="text-sm text-foreground/70">Utilisateurs actifs</p>
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
                            <p className="text-sm text-foreground/70">Taux de complétion</p>
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
                            <p className="text-sm text-foreground/70">Étapes</p>
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
                            <p className="text-sm text-foreground/70">Temps moyen</p>
                            <p className="text-2xl font-bold text-foreground">{circuit.avgCompletionTime}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Visual Overview */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Vue d&apos;ensemble</h2>
                        <p className="text-sm text-foreground/70 mt-1">
                            Visualisation du parcours utilisateur et des points de friction
                        </p>
                    </div>
                    {dropRate > 50 && (
                        <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">
                            <TrendingDown className="h-5 w-5" />
                            <span className="text-sm font-medium">
                                Chute de {dropRate}% à l&apos;étape &quot;Upload photo&quot;
                            </span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {/* Completion Rate Chart */}
                    <Card className="p-6 border-secondary/20 bg-surface-2 backdrop-blur-sm">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-foreground">Taux de complétion</h3>
                            <p className="text-sm text-foreground/70">Progression par étape</p>
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
                            <h3 className="text-lg font-semibold text-foreground">Temps de complétion</h3>
                            <p className="text-sm text-foreground/70">Durée moyenne par étape</p>
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
                                        dataKey="usersCompleted" 
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
                    <h2 className="text-xl font-bold text-foreground">Progression des étapes</h2>
                    <Link href={`/dashboard/analytics/${circuit.id}/steps`}>
                        <Button 
                            variant="outline"
                            className="border-secondary/20 hover:border-secondary/40 bg-secondary/10 hover:bg-secondary/20 text-secondary"
                        >
                            Voir les détails <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4">
                    {circuit.steps.map((step: ExtendedStep) => (
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
                                                Point de friction
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-foreground/70 mt-1">
                                        {step.description}
                                    </p>

                                    <div className="mt-4 grid grid-cols-3 gap-4">
                                        <div>
                                            <p className="text-sm text-foreground/50">Utilisateurs</p>
                                            <p className="text-lg font-semibold text-foreground">{step.usersCompleted}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-foreground/50">Taux de complétion</p>
                                            <p className="text-lg font-semibold text-foreground">{step.completionRate}%</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-foreground/50">Temps moyen</p>
                                            <p className="text-lg font-semibold text-foreground">{step.avgTime}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-foreground/70">Progression</span>
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