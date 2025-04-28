'use client';

import { use, useState } from 'react';
import { CircuitHeader } from './components/circuit-header';
import { CircuitTabs } from './components/circuit-tabs';
import { SettingsTab } from './components/settings-tab';
import { AnalyticsTab } from './components/analytics-tab';
import * as Tabs from "@radix-ui/react-tabs";
import { CircuitType } from "@/lib/stores/circuit-store";
import { ApiDocTab } from './components/api-doc-tab';

export interface ExtendedStep {
    id: string;
    name: string;
    description: string;
    completionThreshold: number;
    circuitId: string;
    stepNumber: number;
    eventName: string;
    createdAt: Date;
    completionRate: number;
    usersCompleted: number;
    avgTime: string;
    alert: boolean;
}

export interface ExtendedCircuit {
    id: string;
    name: string;
    description: string;
    type: CircuitType;
    steps: ExtendedStep[];
    activeUsers: number;
    completionRate: number;
    avgCompletionTime: string;
    createdAt: string;
}

// Mock data - à remplacer par les vraies données de l'API
const mockCircuits: ExtendedCircuit[] = [
    {
        id: "1",
        name: "Onboarding",
        description: "Parcours d'intégration des nouveaux utilisateurs",
        type: CircuitType.OBJECTIVE,
        activeUsers: 450,
        completionRate: 35,
        avgCompletionTime: "3j",
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
                alert: false
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
                completionRate: 88,
                usersCompleted: 396,
                avgTime: "12min",
                alert: false
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
                completionRate: 45,
                usersCompleted: 202,
                avgTime: "45min",
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
                completionRate: 40,
                usersCompleted: 180,
                avgTime: "1h",
                alert: false
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
                completionRate: 35,
                usersCompleted: 157,
                avgTime: "30min",
                alert: false
            }
        ]
    },
    {
        id: "2",
        name: "Découverte Features",
        description: "Système de points pour la découverte des fonctionnalités",
        type: CircuitType.ACTIONS,
        activeUsers: 890,
        completionRate: 35,
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
                completionRate: 85,
                usersCompleted: 756,
                avgTime: "2j",
                alert: false
            },
            {
                id: "p2",
                name: "Analyste",
                description: "Utilisation des outils d'analyse",
                completionThreshold: 163,
                circuitId: "2",
                stepNumber: 2,
                eventName: "analytics_used",
                createdAt: new Date("2024-03-15"),
                completionRate: 60,
                usersCompleted: 534,
                avgTime: "5j",
                alert: false
            },
            {
                id: "p3",
                name: "Expert",
                description: "Maîtrise des fonctionnalités avancées",
                completionThreshold: 250,
                circuitId: "2",
                stepNumber: 3,
                eventName: "advanced_features",
                createdAt: new Date("2024-03-15"),
                completionRate: 35,
                usersCompleted: 311,
                avgTime: "8j",
                alert: true
            }
        ]
    },
    {
        id: "3",
        name: "Programme fidélité",
        description: "Programme de fidélisation par points",
        type: CircuitType.POINTS,
        activeUsers: 1200,
        completionRate: 15,
        avgCompletionTime: "45j",
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
                completionRate: 65,
                usersCompleted: 780,
                avgTime: "10j",
                alert: false
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
                completionRate: 30,
                usersCompleted: 360,
                avgTime: "25j",
                alert: false
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
                completionRate: 15,
                usersCompleted: 180,
                avgTime: "45j",
                alert: true
            }
        ]
    }
];

interface PageProps { params: Promise<{ id: string }> }

export default function CircuitPage({ params }: PageProps) {
    const [activeTab, setActiveTab] = useState('settings');
    const {id} = use(params);
    const circuitData = mockCircuits.find(circuit => circuit.id === id);

    if (!circuitData) {
        return (
            <div className="container mx-auto py-12">
                <div className="text-center text-foreground/70">
                    Parcours non trouvé
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12">
            <div className="max-w-6xl mx-auto space-y-8">
                <CircuitHeader 
                    name={circuitData.name}
                    description={circuitData.description || ""}
                    type={circuitData.type}
                />

                <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
                    <CircuitTabs className="w-full" />

                    <Tabs.Content value="settings" className="mt-6">
                        <SettingsTab circuit={circuitData} />
                    </Tabs.Content>

                    <Tabs.Content value="analytics" className="mt-6">
                        <AnalyticsTab circuit={circuitData} />
                    </Tabs.Content>

                    <Tabs.Content value="api" className="mt-6">
                        <ApiDocTab circuit={circuitData} />
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </div>
    );
}

