'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    PlusCircle,
    Users,
    Activity,
    Trophy,
    ArrowUpRight,
    Sparkles,
    Loader2,
    Target,
    Repeat,
    Star,
    Settings,
    UserCircle2,
    Upload,
    MousePointerClick,
    LucideIcon
} from "lucide-react";
// import { useCircuits } from "@/lib/hooks/use-circuits.hook";
import { CircuitType } from "@/lib/types/circuit";
import { useCircuitStore } from "@/lib/stores/circuit-store";
import Link from "next/link";

// Mock data - à remplacer par les vraies données de l'API
const mockCircuits = [
    {
        id: "1",
        name: "Onboarding",
        description: "Parcours d'intégration des nouveaux utilisateurs",
        type: "objective" as CircuitType,
        activeUsers: 450,
        completionRate: 72,
        avgCompletionTime: "2j",
        createdAt: "2024-03-15",
        steps: [
            {
                id: "o1",
                name: "Inscription",
                description: "Création du compte utilisateur",
                completionThreshold: 1,
                circuitId: "1",
                stepNumber: 1,
                eventName: "user_registered",
                createdAt: new Date("2024-03-15"),
                completionRate: 95,
                usersCompleted: 427,
                avgTime: "5min",
                icon: UserCircle2
            },
            {
                id: "o2",
                name: "Complétion du profil",
                description: "Remplir les informations du profil",
                completionThreshold: 1,
                circuitId: "1",
                stepNumber: 2,
                eventName: "profile_completed",
                createdAt: new Date("2024-03-15"),
                completionRate: 85,
                usersCompleted: 382,
                avgTime: "15min",
                icon: UserCircle2
            },
            {
                id: "o3",
                name: "Configuration API",
                description: "Configuration des clés API",
                completionThreshold: 1,
                circuitId: "1",
                stepNumber: 3,
                eventName: "api_configured",
                createdAt: new Date("2024-03-15"),
                completionRate: 35,
                usersCompleted: 157,
                avgTime: "25min",
                icon: Settings,
                alert: true
            },
            {
                id: "o4",
                name: "Premier appel API",
                description: "Réalisation du premier appel API",
                completionThreshold: 1,
                circuitId: "1",
                stepNumber: 4,
                eventName: "first_api_call",
                createdAt: new Date("2024-03-15"),
                completionRate: 30,
                usersCompleted: 135,
                avgTime: "10min",
                icon: MousePointerClick
            },
            {
                id: "o5",
                name: "Documentation",
                description: "Lecture de la documentation",
                completionThreshold: 1,
                circuitId: "1",
                stepNumber: 5,
                eventName: "docs_read",
                createdAt: new Date("2024-03-15"),
                completionRate: 25,
                usersCompleted: 112,
                avgTime: "30min",
                icon: Upload
            }
        ]
    },
    {
        id: "2",
        name: "Découverte Features",
        description: "Système de points pour la découverte des fonctionnalités",
        type: "actions" as CircuitType,
        activeUsers: 890,
        completionRate: 45,
        avgCompletionTime: "15j",
        createdAt: "2024-03-15",
        steps: [
            {
                id: "p1",
                name: "Explorateur",
                description: "Découverte des fonctionnalités de base",
                completionThreshold: 100,
                circuitId: "2",
                stepNumber: 1,
                eventName: "basic_features",
                createdAt: new Date("2024-03-15"),
                completionRate: 75,
                usersCompleted: 667,
                avgTime: "3j",
                icon: Settings
            },
            {
                id: "p2",
                name: "Analyste",
                description: "Utilisation des outils d'analyse",
                completionThreshold: 250,
                circuitId: "2",
                stepNumber: 2,
                eventName: "analytics_used",
                createdAt: new Date("2024-03-15"),
                completionRate: 45,
                usersCompleted: 400,
                avgTime: "7j",
                icon: Settings
            },
            {
                id: "p3",
                name: "Expert",
                description: "Maîtrise des fonctionnalités avancées",
                completionThreshold: 500,
                circuitId: "2",
                stepNumber: 3,
                eventName: "advanced_features",
                createdAt: new Date("2024-03-15"),
                completionRate: 20,
                usersCompleted: 178,
                avgTime: "12j",
                icon: Settings
            }
        ]
    },
    {
        id: "3",
        name: "Programme fidélité",
        description: "Programme de fidélisation par points",
        type: "points" as CircuitType,
        activeUsers: 0,
        completionRate: 0,
        avgCompletionTime: "N/A",
        createdAt: "2024-03-15",
        steps: [
            {
                id: "f1",
                name: "Bronze",
                description: "Premier niveau de fidélité",
                completionThreshold: 1000,
                circuitId: "3",
                stepNumber: 1,
                eventName: "bronze_level",
                createdAt: new Date("2024-03-15"),
                completionRate: 0,
                usersCompleted: 0,
                avgTime: "N/A",
                icon: Star
            },
            {
                id: "f2",
                name: "Argent",
                description: "Niveau intermédiaire",
                completionThreshold: 5000,
                circuitId: "3",
                stepNumber: 2,
                eventName: "silver_level",
                createdAt: new Date("2024-03-15"),
                completionRate: 0,
                usersCompleted: 0,
                avgTime: "N/A",
                icon: Star
            },
            {
                id: "f3",
                name: "Or",
                description: "Niveau premium",
                completionThreshold: 10000,
                circuitId: "3",
                stepNumber: 3,
                eventName: "gold_level",
                createdAt: new Date("2024-03-15"),
                completionRate: 0,
                usersCompleted: 0,
                avgTime: "N/A",
                icon: Star
            }
        ]
    }
];

const circuitTypeIcons: Record<CircuitType, LucideIcon> = {
    points: Star,
    actions: Repeat,
    objective: Target
};

const circuitTypeLabels: Record<CircuitType, string> = {
    points: 'Points',
    actions: 'Actions',
    objective: 'Objectifs'
};

export default function CircuitsPage() {
    const { projectId } = useCircuitStore();
    // Temporarily use mock data instead of the hook
    const circuits = mockCircuits;
    const isLoading = false;
    const error = null;

    if (!projectId) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-foreground/60">Veuillez sélectionner un projet</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-secondary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">Une erreur est survenue lors du chargement des circuits</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Parcours
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Créez et gérez vos parcours utilisateurs
                        </p>
                    </div>
                    <Link href="/dashboard/circuits/new">
                        <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Nouveau parcours
                        </Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <Link href="/dashboard/circuits/new" className="block">
                        <Card className="p-6 border border-dashed border-border hover:border-primary transition-colors bg-background flex flex-col items-center justify-center text-center cursor-pointer group h-full">
                            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                                <Sparkles className="h-6 w-6 text-secondary" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Créer un nouveau parcours</h3>
                            <p className="text-sm text-muted-foreground">
                                Définissez un nouveau parcours utilisateur à analyser
                            </p>
                        </Card>
                    </Link>

                    {circuits?.map((circuit) => {
                        const TypeIcon = circuitTypeIcons[circuit.type as CircuitType];
                        return (
                            <Link 
                                key={circuit.id} 
                                href={`/dashboard/circuits/${circuit.id}`}
                                className="block"
                            >
                                <Card
                                    className="p-6 border border-border hover:border-primary transition-colors bg-background group cursor-pointer"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <TypeIcon className="h-5 w-5 text-secondary" />
                                                <h3 className="text-lg font-semibold text-foreground group-hover:text-secondary transition-colors">
                                                    {circuit.name}
                                                </h3>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {circuit.description}
                                            </p>
                                            <span className="inline-block px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded mt-2">
                                                {circuitTypeLabels[circuit.type]}
                                            </span>
                                        </div>
                                        <ArrowUpRight className="h-5 w-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                                        {circuit.steps?.sort((a, b) => a.stepNumber - b.stepNumber).map((step) => (
                                            <div
                                                key={step.id}
                                                className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full min-w-fit"
                                            >
                                                <Activity className="h-4 w-4 text-secondary" />
                                                <span className="text-xs text-foreground">{step.name}</span>
                                                {step.completionThreshold > 1 && (
                                                    <span className="text-xs text-secondary">×{step.completionThreshold}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mt-6">
                                        <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                                            <Users className="h-5 w-5 text-secondary mb-2" />
                                            <span className="text-sm font-semibold text-foreground">{circuit.activeUsers}</span>
                                            <span className="text-xs text-muted-foreground">Utilisateurs</span>
                                        </div>
                                        <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                                            <Activity className="h-5 w-5 text-secondary mb-2" />
                                            <span className="text-sm font-semibold text-foreground">{circuit.completionRate}%</span>
                                            <span className="text-xs text-muted-foreground">Complétion</span>
                                        </div>
                                        <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                                            <Trophy className="h-5 w-5 text-secondary mb-2" />
                                            <span className="text-sm font-semibold text-foreground">{circuit.steps?.length || 0}</span>
                                            <span className="text-xs text-muted-foreground">Étapes</span>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
