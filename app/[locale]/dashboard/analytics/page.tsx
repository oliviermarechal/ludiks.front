'use client';

import { Card } from "@/components/ui/card";
import { 
    Users, 
    Clock,
    Trophy,
    Activity,
    ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock data - à remplacer par les vraies données de l'API
const circuits = [
    {
        id: "1",
        name: "Onboarding Utilisateur",
        description: "Parcours d'intégration des nouveaux utilisateurs",
        type: "objective",
        activeUsers: 1250,
        completionRate: 45,
        avgCompletionTime: "2j 4h",
        createdAt: "2024-03-15",
    },
    {
        id: "2",
        name: "Programme Fidélité",
        description: "Système de points et récompenses",
        type: "points",
        activeUsers: 850,
        completionRate: 72,
        avgCompletionTime: "5j",
        createdAt: "2024-03-10",
    }
];

function getCompletionColor(rate: number) {
    if (rate >= 80) return "bg-emerald-500/20 text-emerald-500 ring-emerald-500/30";
    if (rate >= 60) return "bg-blue-500/20 text-blue-500 ring-blue-500/30";
    if (rate >= 40) return "bg-yellow-500/20 text-yellow-500 ring-yellow-500/30";
    return "bg-red-500/20 text-red-500 ring-red-500/30";
}

export default function AnalyticsPage() {
    return (
        <div className="container mx-auto py-12">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold bg-gradient-to-r to-primary via-secondary from-secondary text-transparent bg-clip-text">
                        Analytiques des Parcours
                    </h1>
                    <p className="text-lg text-white/70">
                        Vue d&apos;ensemble des performances de vos parcours utilisateurs
                    </p>
                </div>

                {/* Global Stats */}
                <div className="grid grid-cols-4 gap-6">
                    <Card className="p-6 border-primary/20 bg-black/40 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                                <Users className="h-6 w-6 text-secondary" />
                            </div>
                            <div>
                                <p className="text-sm text-white/70">Total Utilisateurs</p>
                                <p className="text-2xl font-bold text-white">2,100</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6 border-primary/20 bg-black/40 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                                <Activity className="h-6 w-6 text-secondary" />
                            </div>
                            <div>
                                <p className="text-sm text-white/70">Parcours Actifs</p>
                                <p className="text-2xl font-bold text-white">{circuits.length}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6 border-primary/20 bg-black/40 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                                <Trophy className="h-6 w-6 text-secondary" />
                            </div>
                            <div>
                                <p className="text-sm text-white/70">Taux Moyen</p>
                                <p className="text-2xl font-bold text-white">58%</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6 border-primary/20 bg-black/40 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                                <Clock className="h-6 w-6 text-secondary" />
                            </div>
                            <div>
                                <p className="text-sm text-white/70">Temps Moyen</p>
                                <p className="text-2xl font-bold text-white">3j 6h</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Circuits List */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-white">Tous les parcours</h2>
                    <div className="grid gap-4">
                        {circuits.map((circuit) => (
                            <Link 
                                key={circuit.id}
                                href={`/dashboard/analytics/${circuit.id}`}
                                className="block"
                            >
                                <div 
                                    className="p-6 rounded-xl border border-primary/20 bg-black/20 hover:bg-black/40 hover:border-primary/60 transition-all duration-200"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={cn(
                                            "h-12 w-12 rounded-lg flex items-center justify-center",
                                            getCompletionColor(circuit.completionRate)
                                        )}>
                                            {circuit.type === 'objective' ? (
                                                <Trophy className="h-6 w-6" />
                                            ) : (
                                                <Activity className="h-6 w-6" />
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-semibold text-white">
                                                    {circuit.name}
                                                </h3>
                                                <span className="text-sm text-white/50 px-2 py-0.5 rounded-full border border-white/10">
                                                    {circuit.type === 'objective' ? 'Objectifs' : 'Points'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-white/70 mt-1">
                                                {circuit.description}
                                            </p>

                                            <div className="mt-4 grid grid-cols-3 gap-4">
                                                <div>
                                                    <p className="text-sm text-white/50">Utilisateurs actifs</p>
                                                    <p className="text-lg font-semibold text-white">{circuit.activeUsers}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-white/50">Taux de complétion</p>
                                                    <p className="text-lg font-semibold text-white">{circuit.completionRate}%</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-white/50">Temps moyen</p>
                                                    <p className="text-lg font-semibold text-white">{circuit.avgCompletionTime}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="shrink-0">
                                            <ArrowUpRight className="h-5 w-5 text-white/30" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}