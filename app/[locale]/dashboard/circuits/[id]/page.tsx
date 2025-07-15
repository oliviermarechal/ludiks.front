'use client';

import { use, useState, useEffect } from 'react';
import { CircuitHeader } from './components/circuit-header';
import { CircuitTabs } from './components/circuit-tabs';
import { SettingsTab } from './components/settings-tab';
import { OverviewTab } from './components/overview-tab';
import { AnalyticsTab } from './components/analytics-tab';
import * as Tabs from "@radix-ui/react-tabs";
import { Circuit } from "@/lib/types/circuit.types";
import { ApiDocTab } from './components/api-doc-tab';
import { RewardsTab } from "./components/rewards-tab";
import { useCircuits } from '@/lib/hooks/use-circuits.hook';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import { useLudiks } from '@/lib/hooks/use-ludiks.hook';
import { useProjectStore } from '@/lib/stores/project-store';

interface PageProps { params: Promise<{ id: string }> }

export default function CircuitPage({ params }: PageProps) {
    const {id} = use(params);
    const { circuits, activateCircuit, deleteCircuit, isLoading, error } = useCircuits();
    const circuit = circuits.find(c => c.id === id) as Circuit | undefined;
    const t = useTranslations('dashboard.circuits.common');
    const { trackEvent } = useLudiks({
        apiKey: process.env.NEXT_PUBLIC_LUDIKS_API_KEY || '',
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
    })
    const { selectedOrganization } = useProjectStore();

    const [activeTab, setActiveTab] = useState('settings');

    useEffect(() => {
        if (circuit) {
            setActiveTab(circuit.active ? 'analytics' : 'settings');
        }
    }, [circuit]);

    if (isLoading) {
        return (
            <div className="container mx-auto py-12">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="flex items-center gap-3">
                        <Loader2 className="h-6 w-6 animate-spin text-secondary" />
                        <span className="text-foreground/70">{t('loading')}</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto py-12">
                <div className="text-center text-foreground/70">
                    {t('errors.loadFailed')}
                </div>
            </div>
        );
    }

    if (!circuit) {
        return (
            <div className="container mx-auto py-12">
                <div className="text-center text-foreground/70">
                    {t('errors.notFound')}
                </div>
            </div>
        );
    }

    const circuitIsActivable = circuit.steps?.length > 0 && !circuit.active

    const handleDeleteCircuit = async () => {
        await deleteCircuit({ circuitId: circuit.id });
    };

    const handleActivateCircuit = async () => {
        activateCircuit({ circuitId: circuit.id });
        if (selectedOrganization) {
            trackEvent(selectedOrganization.id, 'activate_circuit') // conversion circuit
        }
    }

    return (
        <div className="container mx-auto py-12">
            <div className="max-w-6xl mx-auto space-y-8">
                <CircuitHeader 
                    name={circuit.name}
                    type={circuit.type}
                    active={circuit.active}
                    onActivate={handleActivateCircuit}
                    activable={circuitIsActivable}
                    onDelete={handleDeleteCircuit}
                />

                <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
                    <CircuitTabs 
                        className="w-full" 
                        disabledTabs={!circuit.active ? ['analytics'] : []} 
                        isActive={circuit.active}
                    />

                    {!circuit.active && (
                        <>
                            <Tabs.Content value="settings" className="mt-6">
                                <SettingsTab circuit={circuit} />
                            </Tabs.Content>
                        </>
                    )}

                    {circuit.active && (
                        <>
                            <Tabs.Content value="overview" className="mt-6">
                                <OverviewTab circuit={circuit} />
                            </Tabs.Content>
                            <Tabs.Content value="analytics" className="mt-6">
                                <AnalyticsTab circuitId={circuit.id} />
                            </Tabs.Content>
                        </>
                    )}

                    <Tabs.Content value="rewards" className="mt-6">
                        <RewardsTab circuit={circuit} />
                    </Tabs.Content>

                    <Tabs.Content value="api" className="mt-6">
                        <ApiDocTab circuit={circuit} />
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </div>
    );
}

