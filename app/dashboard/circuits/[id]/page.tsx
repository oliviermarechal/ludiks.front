'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Users, 
    Settings, 
    AlertTriangle,
    ChevronRight,
    Trophy,
    Activity,
    ArrowUpRight,
    UserCircle2,
    Upload,
    MousePointerClick,
    TrendingDown
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const circuitData = {
    id: "1",
    name: "Onboarding Utilisateur",
    description: "Parcours d'intégration des nouveaux utilisateurs",
    type: "objective",
    activeUsers: 1250,
    completionRate: 45,
    createdAt: "2024-03-15",
    steps: [
        {
            id: "1",
            name: "Inscription",
            description: "Création du compte utilisateur",
            completionRate: 95,
            icon: UserCircle2,
            completionThreshold: 1,
            usersCompleted: 1187
        },
        {
            id: "2",
            name: "Complétion du profil",
            description: "Remplissage des informations de profil",
            completionRate: 82,
            icon: Settings,
            completionThreshold: 1,
            usersCompleted: 1025
        },
        {
            id: "3",
            name: "Upload photo de profil",
            description: "Ajout d'une photo de profil",
            completionRate: 28,
            icon: Upload,
            completionThreshold: 1,
            usersCompleted: 350,
            alert: true
        },
        {
            id: "4",
            name: "Première action",
            description: "Réalisation de la première action sur la plateforme",
            completionRate: 65,
            icon: MousePointerClick,
            completionThreshold: 1,
            usersCompleted: 812
        }
    ]
};

function getCompletionColor(rate: number) {
    if (rate >= 80) return "bg-emerald-500/20 text-emerald-500 ring-emerald-500/30";
    if (rate >= 60) return "bg-blue-500/20 text-blue-500 ring-blue-500/30";
    if (rate >= 40) return "bg-yellow-500/20 text-yellow-500 ring-yellow-500/30";
    return "bg-red-500/20 text-red-500 ring-red-500/30";
}

function CustomTooltip({ active, payload }: { active?: boolean, payload?: {payload: {name: string, usersCompleted: number, completionRate: number}}[] }) {
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
                </div>
            </div>
        );
    }
    return null;
}

export default function CircuitDetailPage() {
    // Préparer les données pour le graphique de progression
    const chartData = circuitData.steps.map(step => ({
        name: step.name,
        usersCompleted: step.usersCompleted,
        completionRate: step.completionRate
    }));

    const previousStepRate = 100;
    const dropRate = previousStepRate - circuitData.steps[2].completionRate;

    return (
        <div className="container mx-auto py-12">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold bg-gradient-to-r to-primary via-secondary from-secondary text-transparent bg-clip-text">
                            {circuitData.name}
                        </h1>
                        <p className="text-lg text-white/70">
                            {circuitData.description}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Link href={`/dashboard/circuits/${circuitData.id}/steps`}>
                            <Button variant="outline" className="border-primary/20 hover:border-primary/40">
                                Configurer les étapes
                            </Button>
                        </Link>
                        <Button className="bg-secondary hover:bg-secondary/90 text-black">
                            Voir les utilisateurs
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-6">
                    <Card className="p-6 border-primary/20 bg-black/40 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                                <Users className="h-6 w-6 text-secondary" />
                            </div>
                            <div>
                                <p className="text-sm text-white/70">Utilisateurs actifs</p>
                                <p className="text-2xl font-bold text-white">{circuitData.activeUsers}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6 border-primary/20 bg-black/40 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                                <Trophy className="h-6 w-6 text-secondary" />
                            </div>
                            <div>
                                <p className="text-sm text-white/70">Taux de complétion</p>
                                <p className="text-2xl font-bold text-white">{circuitData.completionRate}%</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6 border-primary/20 bg-black/40 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                                <Activity className="h-6 w-6 text-secondary" />
                            </div>
                            <div>
                                <p className="text-sm text-white/70">Étapes</p>
                                <p className="text-2xl font-bold text-white">{circuitData.steps.length}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Visual Overview */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-white">Vue d&apos;ensemble</h2>
                            <p className="text-sm text-white/70 mt-1">
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

                    <Card className="p-6 border-primary/20 bg-black/40 backdrop-blur-sm">
                        <div className="h-[300px] w-full">
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
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-white/5" />
                                    <XAxis 
                                        dataKey="name" 
                                        tick={{ fill: 'rgba(255,255,255,0.5)' }}
                                        tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                                    />
                                    <YAxis
                                        tick={{ fill: 'rgba(255,255,255,0.5)' }}
                                        tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
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
                </div>

                {/* Steps Progress */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-white">Progression des étapes</h2>
                        <Button variant="ghost" className="text-white/70 hover:text-white">
                            Voir les détails <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    <div className="grid gap-4">
                        {circuitData.steps.map((step) => (
                            <div 
                                key={step.id}
                                className="p-6 rounded-xl border border-primary/20 bg-black/20 hover:bg-black/40 transition-all duration-200"
                            >
                                <div className="flex items-center gap-6">
                                    <div className={cn(
                                        "h-12 w-12 rounded-lg flex items-center justify-center",
                                        getCompletionColor(step.completionRate)
                                    )}>
                                        <step.icon className="h-6 w-6" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-semibold text-white">
                                                {step.name}
                                            </h3>
                                            {step.alert && (
                                                <div className="flex items-center gap-1.5 text-red-500 bg-red-500/10 px-2 py-1 rounded-full text-sm">
                                                    <AlertTriangle className="h-4 w-4" />
                                                    Point de friction
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-sm text-white/70 mt-1">
                                            {step.description}
                                        </p>

                                        <div className="mt-4 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-white/70">Progression</span>
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
                                            <p className="text-sm text-white/50">
                                                {step.usersCompleted} utilisateurs ont complété cette étape
                                            </p>
                                        </div>
                                    </div>

                                    <Link 
                                        href={`/dashboard/circuits/${circuitData.id}/steps/${step.id}`}
                                        className="shrink-0"
                                    >
                                        <Button 
                                            variant="ghost" 
                                            size="icon"
                                            className="text-white/30 hover:text-white"
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
        </div>
    );
}

