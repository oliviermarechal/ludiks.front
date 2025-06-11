'use client';

import { use, useState } from 'react';
import { CircuitHeader } from './components/circuit-header';
import { CircuitTabs } from './components/circuit-tabs';
import { SettingsTab } from './components/settings-tab';
import { AnalyticsTab } from './components/analytics-tab';
import * as Tabs from "@radix-ui/react-tabs";
import { Circuit } from "@/lib/stores/circuit-store";
import { ApiDocTab } from './components/api-doc-tab';
import { RewardsTab } from "./components/rewards-tab";
import { useCircuits } from '@/lib/hooks/use-circuits.hook';

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

export interface ExtendedCircuit extends Circuit {
    activeUsers: number;
    completionRate: number;
    avgCompletionTime: string;
    createdAt: string;
}

interface PageProps { params: Promise<{ id: string }> }

export default function CircuitPage({ params }: PageProps) {
    const [activeTab, setActiveTab] = useState('settings');
    const {id} = use(params);
    const { circuits, activateCircuit } = useCircuits();
    const circuit = circuits.find(c => c.id === id) as Circuit | undefined;

    if (!circuit) {
        return (
            <div className="container mx-auto py-12">
                <div className="text-center text-foreground/70">
                    Parcours non trouvé
                </div>
            </div>
        );
    }

    if (!circuit.active && activeTab === 'analytics') {
        setActiveTab('settings');
    }

    const circuitIsActivable = circuit.steps?.length > 0 && !circuit.active

    return (
        <div className="container mx-auto py-12">
            <div className="max-w-6xl mx-auto space-y-8">
                <CircuitHeader 
                    name={circuit.name}
                    type={circuit.type}
                    active={circuit.active}
                    onActivate={() => activateCircuit({ circuitId: circuit.id })}
                    activable={circuitIsActivable}
                />

                <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
                    <CircuitTabs className="w-full" disabledTabs={!circuit.active ? ['analytics'] : []} />

                    <Tabs.Content value="settings" className="mt-6">
                        <SettingsTab circuit={circuit} />
                    </Tabs.Content>

                    <Tabs.Content value="rewards" className="mt-6">
                        <RewardsTab circuit={circuit} />
                    </Tabs.Content>

                    {circuit.active && (
                        <Tabs.Content value="analytics" className="mt-6">
                            <AnalyticsTab circuit={circuit as ExtendedCircuit} />
                        </Tabs.Content>
                    )}

                    <Tabs.Content value="api" className="mt-6">
                        <ApiDocTab circuit={circuit} />
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </div>
    );
}

