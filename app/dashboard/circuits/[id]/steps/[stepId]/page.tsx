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
import { useState } from "react";
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
    circuitCompletionRate: Math.floor(Math.random() * 70), // Taux de complétion aléatoire entre 0 et 70%
    createdAt: new Date(2024, 0, Math.floor(Math.random() * 90) + 1) // Date aléatoire entre 1er janvier et 31 mars 2024
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
    const totalPages = Math.ceil(usersData.length / itemsPerPage);
    
    const paginatedUsers = usersData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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
                <Card className="p-6 border-primary/20 bg-black/40 backdrop-blur-sm">
                    <div className="flex items-start gap-6">
                        <div className={cn(
                            "h-12 w-12 rounded-lg flex items-center justify-center shrink-0",
                            getCompletionColor(stepData.completionRate)
                        )}>
                            <stepData.icon className="h-6 w-6" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-lg font-semibold text-white">
                                    {stepData.name}
                                </h2>
                                {stepData.alert && (
                                    <div className="flex items-center gap-1.5 text-red-500 bg-red-500/10 px-2 py-1 rounded-full text-sm">
                                        <AlertTriangle className="h-4 w-4" />
                                        Point de friction
                                    </div>
                                )}
                            </div>
                            <p className="text-sm text-white/70 mb-4">
                                {stepData.description}
                            </p>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="bg-black/20 rounded-lg p-4">
                                    <p className="text-sm text-white/60 mb-1">Taux de complétion</p>
                                    <p className="text-2xl font-bold text-white">{stepData.completionRate}%</p>
                                </div>
                                <div className="bg-black/20 rounded-lg p-4">
                                    <p className="text-sm text-white/60 mb-1">Utilisateurs bloqués</p>
                                    <p className="text-2xl font-bold text-white">
                                        {stepData.totalUsers - stepData.usersCompleted}
                                    </p>
                                </div>
                                <div className="bg-black/20 rounded-lg p-4">
                                    <p className="text-sm text-white/60 mb-1">{getObjectiveLabel(stepData.circuitType)}</p>
                                    <p className="text-2xl font-bold text-white">
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
                        <h2 className="text-xl font-bold text-white">
                            Utilisateurs bloqués
                        </h2>
                        <Button variant="outline" className="border-primary/20">
                            <Download className="h-4 w-4 mr-2" />
                            Exporter en CSV
                        </Button>
                    </div>

                    <Card className="border-primary/20 bg-black/40 backdrop-blur-sm divide-y divide-primary/10">
                        {paginatedUsers.map((user) => (
                            <div key={user.id} className="flex items-center gap-4 p-4">
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
                    </Card>

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
            </div>
        </div>
    );
}

