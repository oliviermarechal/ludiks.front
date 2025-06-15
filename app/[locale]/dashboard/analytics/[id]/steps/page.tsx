'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Users, 
    Clock,
    Trophy,
    ArrowLeft,
    TrendingDown,
    TrendingUp
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from "recharts";

// Mock data - à remplacer par les vraies données de l'API
const stepAnalytics = {
    circuitId: "1",
    circuitName: "Onboarding Utilisateur",
    type: "objective",
    steps: [
        {
            id: "1",
            name: "Inscription",
            description: "Création du compte utilisateur",
            completionRate: 95,
            completionThreshold: 1,
            avgTime: "5min",
            usersCompleted: 1187,
            timeDistribution: [
                { time: "< 1min", users: 250 },
                { time: "1-5min", users: 650 },
                { time: "5-10min", users: 200 },
                { time: "> 10min", users: 87 }
            ],
            trends: {
                weeklyCompletion: [
                    { week: "Sem 1", rate: 92 },
                    { week: "Sem 2", rate: 94 },
                    { week: "Sem 3", rate: 95 },
                    { week: "Sem 4", rate: 95 }
                ],
                weeklyTime: [
                    { week: "Sem 1", time: 7 },
                    { week: "Sem 2", time: 6 },
                    { week: "Sem 3", time: 5 },
                    { week: "Sem 4", time: 5 }
                ]
            }
        },
        {
            id: "2",
            name: "Complétion du profil",
            description: "Remplissage des informations de profil",
            completionRate: 82,
            completionThreshold: 1,
            avgTime: "15min",
            usersCompleted: 1025,
            timeDistribution: [
                { time: "< 5min", users: 150 },
                { time: "5-15min", users: 450 },
                { time: "15-30min", users: 325 },
                { time: "> 30min", users: 100 }
            ],
            trends: {
                weeklyCompletion: [
                    { week: "Sem 1", rate: 75 },
                    { week: "Sem 2", rate: 78 },
                    { week: "Sem 3", rate: 80 },
                    { week: "Sem 4", rate: 82 }
                ],
                weeklyTime: [
                    { week: "Sem 1", time: 18 },
                    { week: "Sem 2", time: 16 },
                    { week: "Sem 3", time: 15 },
                    { week: "Sem 4", time: 15 }
                ]
            }
        }
    ]
};

function getCompletionColor(rate: number) {
    if (rate >= 80) return "bg-emerald-500/20 text-emerald-500 ring-emerald-500/30";
    if (rate >= 60) return "bg-blue-500/20 text-blue-500 ring-blue-500/30";
    if (rate >= 40) return "bg-yellow-500/20 text-yellow-500 ring-yellow-500/30";
    return "bg-red-500/20 text-red-500 ring-red-500/30";
}

function CustomTooltip({ active, payload, label }: { active?: boolean, payload?: never[], label?: string }) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-black/90 border border-primary/20 p-3 rounded-lg">
                <p className="text-white font-medium mb-1">{label}</p>
                <div className="space-y-1 text-sm">
                    {payload.map((entry: {name: string, value: number}, index: number) => (
                        <p key={index} className="text-white/70">
                            {entry.name}: <span className="text-secondary">{entry.value}{entry.name === "Taux" ? "%" : "min"}</span>
                        </p>
                    ))}
                </div>
            </div>
        );
    }
    return null;
}

function TimeDistributionTooltip({ active, payload, label }: { active?: boolean, payload?: {value: number}[], label?: string }) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-black/90 border border-primary/20 p-3 rounded-lg">
                <p className="text-white font-medium mb-1">{label}</p>
                <p className="text-white/70 text-sm">
                    <span className="text-secondary">{payload[0].value}</span> utilisateurs
                </p>
            </div>
        );
    }
    return null;
}

export default function StepsAnalyticsPage() {
    return (
        <div className="container mx-auto py-12">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <div className="flex items-center gap-4">
                            <Link href={`/dashboard/analytics/${stepAnalytics.circuitId}`}>
                                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <h1 className="text-3xl font-bold bg-gradient-to-r to-primary via-secondary from-secondary text-transparent bg-clip-text">
                                {stepAnalytics.circuitName}
                            </h1>
                        </div>
                        <p className="text-lg text-white/70 ml-12">
                            Analyse détaillée des étapes
                        </p>
                    </div>
                </div>

                {/* Steps Analysis */}
                {stepAnalytics.steps.map((step) => (
                    <div key={step.id} className="space-y-6">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                                    {step.name}
                                    <span className={cn(
                                        "text-sm px-2 py-0.5 rounded-full",
                                        getCompletionColor(step.completionRate)
                                    )}>
                                        {step.completionRate}% de complétion
                                    </span>
                                </h2>
                                <p className="text-white/70">{step.description}</p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-4 gap-6">
                            <Card className="p-6 border-primary/20 bg-black/40 backdrop-blur-sm">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                                        <Users className="h-6 w-6 text-secondary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/70">Utilisateurs</p>
                                        <p className="text-2xl font-bold text-white">{step.usersCompleted}</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-6 border-primary/20 bg-black/40 backdrop-blur-sm">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                                        <Trophy className="h-6 w-6 text-secondary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/70">Taux</p>
                                        <p className="text-2xl font-bold text-white">{step.completionRate}%</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-6 border-primary/20 bg-black/40 backdrop-blur-sm">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                                        <Clock className="h-6 w-6 text-secondary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/70">Temps moyen</p>
                                        <p className="text-2xl font-bold text-white">{step.avgTime}</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-6 border-primary/20 bg-black/40 backdrop-blur-sm">
                                <div className="flex items-center gap-4">
                                    {step.trends.weeklyCompletion[3].rate > step.trends.weeklyCompletion[0].rate ? (
                                        <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                            <TrendingUp className="h-6 w-6 text-emerald-500" />
                                        </div>
                                    ) : (
                                        <div className="h-12 w-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                                            <TrendingDown className="h-6 w-6 text-red-500" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-sm text-white/70">Tendance</p>
                                        <p className="text-2xl font-bold text-white">
                                            {Math.abs(step.trends.weeklyCompletion[3].rate - step.trends.weeklyCompletion[0].rate)}%
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Charts Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            {/* Time Distribution */}
                            <Card className="p-6 border-primary/20 bg-black/40 backdrop-blur-sm">
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-white">Distribution du temps</h3>
                                    <p className="text-sm text-white/70">Répartition des utilisateurs par durée</p>
                                </div>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={step.timeDistribution}
                                            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-white/5" />
                                            <XAxis 
                                                dataKey="time"
                                                tick={{ fill: 'rgba(255,255,255,0.5)' }}
                                                tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                                            />
                                            <YAxis
                                                tick={{ fill: 'rgba(255,255,255,0.5)' }}
                                                tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                                            />
                                            <Tooltip content={<TimeDistributionTooltip />} />
                                            <Bar 
                                                dataKey="users" 
                                                fill="var(--secondary)"
                                                opacity={0.8}
                                                radius={[4, 4, 0, 0]}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>

                            {/* Weekly Trends */}
                            <Card className="p-6 border-primary/20 bg-black/40 backdrop-blur-sm">
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-white">Tendances hebdomadaires</h3>
                                    <p className="text-sm text-white/70">Évolution du taux de complétion et du temps</p>
                                </div>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={step.trends.weeklyCompletion}
                                            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                                        >
                                            <defs>
                                                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.3}/>
                                                    <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0}/>
                                                </linearGradient>
                                                <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-white/5" />
                                            <XAxis 
                                                dataKey="week"
                                                tick={{ fill: 'rgba(255,255,255,0.5)' }}
                                                tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                                            />
                                            <YAxis
                                                yAxisId="rate"
                                                tick={{ fill: 'rgba(255,255,255,0.5)' }}
                                                tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                                                tickFormatter={(value) => `${value}%`}
                                            />
                                            <YAxis
                                                yAxisId="time"
                                                orientation="right"
                                                tick={{ fill: 'rgba(255,255,255,0.5)' }}
                                                tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                                                tickFormatter={(value) => `${value}min`}
                                            />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Area
                                                yAxisId="rate"
                                                type="monotone"
                                                dataKey="rate"
                                                name="Taux"
                                                stroke="var(--secondary)"
                                                fill="url(#colorRate)"
                                                strokeWidth={2}
                                            />
                                            <Area
                                                yAxisId="time"
                                                type="monotone"
                                                dataKey="time"
                                                name="Temps"
                                                stroke="#3b82f6"
                                                fill="url(#colorTime)"
                                                strokeWidth={2}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 