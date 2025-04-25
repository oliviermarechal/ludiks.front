'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Users, 
    Clock,
    Trophy,
    Activity,
    ChevronRight,
    ChevronLeft,
    Download,
    TrendingDown,
    Target,
    AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock data - à remplacer par les vraies données de l'API
const circuitData: Circuit = {
    id: "1",
    name: "Onboarding Utilisateur",
    description: "Parcours d&apos;intégration des nouveaux utilisateurs",
    type: "objective",
    activeUsers: 1250,
    completionRate: 45,
    avgCompletionTime: "2j 4h",
    createdAt: "2024-03-15",
    steps: [
        {
            id: "1",
            name: "Inscription",
            description: "Création du compte utilisateur",
            completionRate: 100,
            completionThreshold: 1,
            avgTime: "0",
            usersCompleted: 1187
        },
        {
            id: "2",
            name: "Complétion du profil",
            description: "Remplissage des informations de profil",
            completionRate: 82,
            completionThreshold: 1,
            avgTime: "15min",
            usersCompleted: 1025
        },
        {
            id: "3",
            name: "Upload photo de profil",
            description: "Ajout d'une photo de profil",
            completionRate: 28,
            completionThreshold: 1,
            avgTime: "8min",
            usersCompleted: 350
        },
        {
            id: "4",
            name: "Première vente",
            description: "Réalisation d'une vente",
            completionRate: 20,
            completionThreshold: 1,
            avgTime: "10min",
            usersCompleted: 350
        }
    ]
};

// Mock data pour un parcours de type points
const pointsCircuitData: Circuit = {
    id: "2",
    name: "Programme Fidélité",
    description: "Système de points et récompenses",
    type: "points",
    activeUsers: 850,
    completionRate: 72,
    avgCompletionTime: "5j",
    createdAt: "2024-03-10",
    steps: [
        {
            id: "1",
            name: "Première commande",
            description: "Réaliser sa première commande",
            completionRate: 100,
            completionThreshold: 1,
            avgTime: "0",
            usersCompleted: 807
        },
        {
            id: "2",
            name: "Commandes régulières",
            description: "Effectuer 5 commandes",
            completionRate: 45,
            completionThreshold: 5,
            avgTime: "15j",
            usersCompleted: 382
        },
        {
            id: "3",
            name: "Client fidèle",
            description: "Atteindre 10 commandes",
            completionRate: 12,
            completionThreshold: 10,
            avgTime: "45j",
            usersCompleted: 102
        }
    ]
};

// Mock data pour les utilisateurs bloqués
const mockBlockedUsers = Array.from({ length: 50 }, (_, i) => ({
    id: `user-${i + 1}`,
    fullName: `Utilisateur ${i + 1}`,
    email: `user${i + 1}@example.com`,
    avatar: i % 3 === 0 ? `https://i.pravatar.cc/150?u=${i}` : null,
    circuitCompletionRate: Math.floor(Math.random() * 70),
    createdAt: new Date(2024, 0, Math.floor(Math.random() * 90) + 1)
}));

function getCompletionColor(rate: number) {
    if (rate >= 80) return "bg-emerald-500/20 text-emerald-500 ring-emerald-500/30";
    if (rate >= 60) return "bg-blue-500/20 text-blue-500 ring-blue-500/30";
    if (rate >= 40) return "bg-yellow-500/20 text-yellow-500 ring-yellow-500/30";
    return "bg-red-500/20 text-red-500 ring-red-500/30";
}

interface TooltipProps {
    active?: boolean;
    payload?: Array<{
        payload: {
            name: string;
            usersCompleted: number;
            completionRate: number;
            avgTime: string;
        };
    }>;
    label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-black/90 border border-primary/20 p-3 rounded-lg">
                <p className="text-white font-medium mb-1">{label || data.name}</p>
                <div className="space-y-1 text-sm">
                    <p className="text-white/70">
                        <span className="text-secondary">{data.usersCompleted}</span> utilisateurs
                    </p>
                    <p className="text-white/70">
                        Taux de complétion: <span className="text-secondary">{data.completionRate}%</span>
                    </p>
                    <p className="text-white/70">
                        Temps moyen complétion: <span className="text-secondary">{data.avgTime}</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
}

function getInitials(name: string) {
    return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase();
}

function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    };
    return date.toLocaleDateString('fr-FR', options);
}

interface Step {
    id: string;
    name: string;
    description: string;
    completionRate: number;
    completionThreshold: number;
    avgTime: string;
    usersCompleted: number;
}

interface Circuit {
    id: string;
    name: string;
    description: string;
    type: 'objective' | 'points';
    activeUsers: number;
    completionRate: number;
    avgCompletionTime: string;
    createdAt: string;
    steps: Step[];
}

interface BlockedUsersModalProps {
    isOpen: boolean;
    onClose: () => void;
    step: Step;
}

function BlockedUsersModal({ isOpen, onClose, step }: BlockedUsersModalProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(mockBlockedUsers.length / itemsPerPage);
    
    const paginatedUsers = mockBlockedUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl bg-black/95 border-primary/20">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold flex items-center gap-3">
                        {step.name}
                        <span className={cn(
                            "text-sm px-2 py-0.5 rounded-full",
                            getCompletionColor(step.completionRate)
                        )}>
                            {step.completionRate}% de complétion
                        </span>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-white/70">
                            {mockBlockedUsers.length} utilisateurs bloqués à cette étape
                        </p>
                        <Button variant="outline" className="border-primary/20">
                            <Download className="h-4 w-4 mr-2" />
                            Exporter en CSV
                        </Button>
                    </div>

                    <div className="divide-y divide-primary/10">
                        {paginatedUsers.map((user) => (
                            <div key={user.id} className="flex items-center gap-4 py-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={user.avatar || ''} />
                                    <AvatarFallback className="bg-secondary/10 text-secondary">
                                        {getInitials(user.fullName)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0 flex items-center gap-6">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white truncate">
                                            {user.fullName}
                                        </p>
                                        <p className="text-sm text-white/60 truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="text-sm text-white/60">Inscrit le</p>
                                            <p className="text-sm font-medium text-white">
                                                {formatDate(user.createdAt)}
                                            </p>
                                        </div>
                                        <div className="text-right min-w-[100px]">
                                            <p className="text-sm text-white/60">Complétion du parcours</p>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-1.5 rounded-full bg-white/5">
                                                    <div 
                                                        className="h-full rounded-full bg-secondary/50"
                                                        style={{ width: `${user.circuitCompletionRate}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-white">
                                                    {user.circuitCompletionRate}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center pt-4">
                        <p className="text-sm text-white/60">
                            Page {currentPage} sur {totalPages}
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="border-primary/20"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="border-primary/20"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

interface CompletionDrop {
    drop: number;
    stepId: string;
    stepName: string;
    previousRate: number;
    currentRate: number;
}

export default function CircuitAnalyticsPage() {
    const params = useParams();
    const data = params.id === "2" ? pointsCircuitData : circuitData;
    const [selectedStep, setSelectedStep] = useState<Step | null>(null);
    
    // Calculer la plus grande chute de taux de complétion pour les parcours de type "objective"
    const completionDrops = data.type === 'objective' ? data.steps.reduce<CompletionDrop[]>((drops, step, index) => {
        if (index === 0) return drops;
        const drop = data.steps[index - 1].completionRate - step.completionRate;
        if (drop > 50) {
            drops.push({
                drop,
                stepId: step.id,
                stepName: step.name,
                previousRate: data.steps[index - 1].completionRate,
                currentRate: step.completionRate
            });
        }
        return drops;
    }, []) : [];

    const biggestDrop = completionDrops.length > 0 ? completionDrops.reduce((max, current) => 
        current.drop > max.drop ? current : max
    ) : null;
    
    // Préparer les données pour le graphique
    const chartData = data.steps.map(step => ({
        name: data.type !== 'objective' ? `${step.completionThreshold}` : step.name,
        usersCompleted: step.usersCompleted,
        completionRate: step.completionRate,
        avgTime: step.avgTime
    }));

    return (
        <div className="container mx-auto py-12">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold bg-gradient-to-r to-primary via-secondary from-secondary text-transparent bg-clip-text">
                            {data.name}
                        </h1>
                        <p className="text-lg text-white/70">
                            {data.description}
                        </p>
                    </div>
                    <Link href={`/dashboard/analytics/${data.id}/steps`}>
                        <Button className="bg-secondary hover:bg-secondary/90 text-black">
                            Voir les détails des étapes
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-6">
                    <Card className="p-6 border-primary/20 bg-black/40 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                                <Users className="h-6 w-6 text-secondary" />
                            </div>
                            <div>
                                <p className="text-sm text-white/70">Utilisateurs actifs</p>
                                <p className="text-2xl font-bold text-white">{data.activeUsers}</p>
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
                                <p className="text-2xl font-bold text-white">{data.completionRate}%</p>
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
                                <p className="text-2xl font-bold text-white">{data.steps.length}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6 border-primary/20 bg-black/40 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                                <Clock className="h-6 w-6 text-secondary" />
                            </div>
                            <div>
                                <p className="text-sm text-white/70">Temps moyen complétion</p>
                                <p className="text-2xl font-bold text-white">{data.avgCompletionTime}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Progress Chart */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-white">Progression des étapes</h2>
                            <p className="text-sm text-white/70 mt-1">
                                {data.type === 'points' 
                                    ? "Progression des utilisateurs par palier d'objectifs"
                                    : "Taux de complétion par étape du parcours"
                                }
                            </p>
                        </div>
                        {biggestDrop && (
                            <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">
                                <TrendingDown className="h-5 w-5" />
                                <span className="text-sm font-medium">
                                    Chute de {biggestDrop.drop}% à l&apos;étape &quot;{biggestDrop.stepName}&quot;
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

                {/* Steps Details */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-white">Détails des étapes</h2>
                    </div>

                    <div className="grid gap-4">
                        {data.steps.map((step) => {
                            const dropForStep = completionDrops.find(d => d.stepId === step.id);
                            
                            return (
                                <div 
                                    key={step.id}
                                    className="p-6 rounded-xl border border-primary/20 bg-black/20 hover:bg-black/40 transition-all duration-200"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={cn(
                                            "h-12 w-12 rounded-lg flex items-center justify-center",
                                            getCompletionColor(step.completionRate)
                                        )}>
                                            {data.type === 'points' ? (
                                                <Activity className="h-6 w-6" />
                                            ) : (
                                                <Trophy className="h-6 w-6" />
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                                    {step.name}
                                                    {data.type !== 'objective' && (
                                                        <span className="flex items-center gap-1.5 text-secondary text-sm">
                                                            (<Target className="h-4 w-4" />
                                                            {step.completionThreshold})
                                                        </span>
                                                    )}
                                                </h3>
                                                {dropForStep && (
                                                    <div className="flex items-center gap-1.5 text-red-500 bg-red-500/10 px-2 py-1 rounded-full text-sm">
                                                        <AlertTriangle className="h-4 w-4" />
                                                        Point de friction
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-sm text-white/70 mt-1">
                                                {step.description}
                                            </p>

                                            <div className="mt-4 grid grid-cols-3 gap-4">
                                                <div>
                                                    <p className="text-sm text-white/50">Utilisateurs</p>
                                                    <p className="text-lg font-semibold text-white">{step.usersCompleted}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-white/50">Taux de complétion</p>
                                                    <p className="text-lg font-semibold text-white">{step.completionRate}%</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-white/50">Temps moyen complétion</p>
                                                    <p className="text-lg font-semibold text-white">{step.avgTime}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <Button 
                                            variant="ghost" 
                                            size="icon"
                                            className="text-white/30 hover:text-white"
                                            onClick={() => setSelectedStep(step)}
                                        >
                                            <Users className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {selectedStep && (
                <BlockedUsersModal
                    isOpen={!!selectedStep}
                    onClose={() => setSelectedStep(null)}
                    step={selectedStep}
                />
            )}
        </div>
    );
} 