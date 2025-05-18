'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    ArrowLeft,
    Download,
    ChevronLeft,
    ChevronRight,
    Upload,
    AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import { CircuitType } from "@/lib/types/circuit";

const stepData = {
    id: "3",
    name: "Upload photo de profil",
    description: "Ajout d'une photo de profil",
    completionRate: 28,
    icon: Upload,
    completionThreshold: 1,
    usersCompleted: 350,
    alert: true,
    totalUsers: 1250,
    circuitId: "1",
    circuitName: "Onboarding Utilisateur",
    circuitType: CircuitType.OBJECTIVE
};

const usersData = Array.from({ length: 50 }, (_, i) => ({
    id: `user-${i + 1}`,
    fullName: `Utilisateur ${i + 1}`,
    email: `user${i + 1}@example.com`,
    avatar: i % 3 === 0 ? `https://i.pravatar.cc/150?u=${i}` : null,
    createdAt: new Date(2024, 0, Math.floor(Math.random() * 90) + 1),
    stuckSince: new Date(2024, 2, Math.floor(Math.random() * 15) + 1), // Date aléatoire dans les 15 derniers jours
    metadata: {
        isPremium: Math.random() > 0.7, // 30% de chance d'être premium
        role: Math.random() > 0.9 ? 'admin' : Math.random() > 0.7 ? 'moderator' : 'user',
        userType: ['new', 'returning', 'power', 'inactive'][Math.floor(Math.random() * 4)],
        lastActivity: new Date(2024, 2, Math.floor(Math.random() * 15) + 1)
    }
}));

function getCompletionColor(rate: number) {
    if (rate >= 80) return "bg-emerald-500/20 text-emerald-500";
    if (rate >= 60) return "bg-blue-500/20 text-blue-500";
    if (rate >= 40) return "bg-yellow-500/20 text-yellow-500";
    return "bg-red-500/20 text-red-500";
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

function formatDuration(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        return `${hours}h`;
    }
    return `${days}j`;
}

function getObjectiveLabel(type: CircuitType): string {
    switch (type) {
        case CircuitType.ACTIONS:
            return 'Répétition requise';
        case CircuitType.POINTS:
            return 'Points requis';
        case CircuitType.OBJECTIVE:
            return 'Nombre de répétitions requises';
        default:
            return 'Objectif';
    }
}

function getObjectiveSuffix(type: CircuitType): string {
    return type === CircuitType.POINTS ? ' pts' : 'x';
}

export default function StepDetailPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    // Filtres
    const [premiumFilter, setPremiumFilter] = useState<string>("all");
    const [roleFilter, setRoleFilter] = useState<string>("all");
    const [typeFilter, setTypeFilter] = useState<string>("all");

    // Générer dynamiquement les options de filtre
    const roleOptions = useMemo(() => Array.from(new Set(usersData.map(u => u.metadata.role))), []);
    const typeOptions = useMemo(() => Array.from(new Set(usersData.map(u => u.metadata.userType))), []);

    // Filtrage des utilisateurs
    const filteredUsers = useMemo(() => {
        return usersData.filter(user => {
            if (premiumFilter !== "all" && (premiumFilter === "premium" ? !user.metadata.isPremium : user.metadata.isPremium)) {
                return false;
            }
            if (roleFilter !== "all" && user.metadata.role !== roleFilter) {
                return false;
            }
            if (typeFilter !== "all" && user.metadata.userType !== typeFilter) {
                return false;
            }
            return true;
        });
    }, [premiumFilter, roleFilter, typeFilter]);

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const filteredTotalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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
                        <p className="text-sm text-white/60">
                            {stepData.circuitName}
                        </p>
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
                                        Point de friction
                                    </div>
                                )}
                            </div>
                            <p className="text-sm text-foreground/70 mb-4">
                                {stepData.description}
                            </p>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="bg-surface-3 rounded-lg p-4">
                                    <p className="text-sm text-foreground/60 mb-1">Taux de complétion</p>
                                    <p className="text-2xl font-bold text-foreground">{stepData.completionRate}%</p>
                                </div>
                                <div className="bg-surface-3 rounded-lg p-4">
                                    <p className="text-sm text-foreground/60 mb-1">Utilisateurs bloqués</p>
                                    <p className="text-2xl font-bold text-foreground">
                                        {stepData.totalUsers - stepData.usersCompleted}
                                    </p>
                                </div>
                                <div className="bg-surface-3 rounded-lg p-4">
                                    <p className="text-sm text-foreground/60 mb-1">{getObjectiveLabel(stepData.circuitType)}</p>
                                    <p className="text-2xl font-bold text-foreground">
                                        {stepData.completionThreshold}{getObjectiveSuffix(stepData.circuitType)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Liste des utilisateurs */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-foreground">
                            Utilisateurs sur cette étape
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <select
                                    className="border border-secondary/20 rounded px-2 py-1 text-sm bg-background"
                                    value={premiumFilter}
                                    onChange={e => {
                                        setPremiumFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                >
                                    <option value="all">Premium (tous)</option>
                                    <option value="premium">Oui</option>
                                    <option value="non-premium">Non</option>
                                </select>
                                <select
                                    className="border border-secondary/20 rounded px-2 py-1 text-sm bg-background"
                                    value={roleFilter}
                                    onChange={e => {
                                        setRoleFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                >
                                    <option value="all">Rôle (tous)</option>
                                    {roleOptions.map(role => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                                <select
                                    className="border border-secondary/20 rounded px-2 py-1 text-sm bg-background"
                                    value={typeFilter}
                                    onChange={e => {
                                        setTypeFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                >
                                    <option value="all">Type (tous)</option>
                                    {typeOptions.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <Button variant="outline" className="border-secondary/20">
                                <Download className="h-4 w-4 mr-2" />
                                Exporter en CSV
                            </Button>
                        </div>
                    </div>

                    <Card className="border-secondary/20 bg-surface-2 backdrop-blur-sm divide-y divide-secondary/10">
                        {paginatedUsers.map((user) => (
                            <div key={user.id} className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 p-4">
                                {/* Bloc gauche : Avatar, nom, email */}
                                <div className="flex items-center gap-4 min-w-0 w-full md:w-1/3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={user.avatar || ''} />
                                        <AvatarFallback className="bg-secondary/10 text-secondary">
                                            {getInitials(user.fullName)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate">
                                            {user.fullName}
                                        </p>
                                        <p className="text-sm text-foreground/60 truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                                {/* Bloc centre : Métadonnées */}
                                <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4 w-full md:w-1/3 bg-secondary/10 rounded-lg py-2 px-3">
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs text-foreground/60">Premium:</span>
                                        <span className="text-xs font-semibold text-secondary">{user.metadata.isPremium ? 'Oui' : 'Non'}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs text-foreground/60">Rôle:</span>
                                        <span className="text-xs font-semibold text-secondary">{user.metadata.role}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs text-foreground/60">Type:</span>
                                        <span className="text-xs font-semibold text-secondary">{user.metadata.userType}</span>
                                    </div>
                                </div>
                                {/* Bloc droite : Dates */}
                                <div className="flex flex-col items-end w-full md:w-1/3">
                                    <div>
                                        <span className="text-xs text-foreground/60">Inscrit le</span>
                                        <span className="text-sm font-semibold text-secondary ml-1">{formatDate(user.createdAt)}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-foreground/60">Sur l&apos;étape depuis</span>
                                        <span className="text-sm font-semibold text-secondary ml-1">{formatDuration(user.stuckSince)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Card>

                    {/* Pagination */}
                    <div className="flex justify-between items-center pt-4">
                        <p className="text-sm text-foreground/60">
                            Page {currentPage} sur {filteredTotalPages}
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="border-secondary/20"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="border-secondary/20"
                                onClick={() => setCurrentPage(p => Math.min(filteredTotalPages, p + 1))}
                                disabled={currentPage === filteredTotalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

