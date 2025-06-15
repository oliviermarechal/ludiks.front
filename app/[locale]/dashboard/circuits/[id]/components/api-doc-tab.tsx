import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Copy, Terminal } from "lucide-react";
import { useState } from "react";
import { Circuit } from "@/lib/stores/circuit-store";
import { useProjectStore } from "@/lib/stores/project-store";
import { useProjectApiKeys } from "@/lib/hooks/use-project-api-keys.hook";

export function ApiDocTab({ circuit }: { circuit: Circuit }) {
    const { selectedProject } = useProjectStore();
    const { apiKeys } = useProjectApiKeys(selectedProject?.id || '');
    const firstApiKey = apiKeys[0];
    const isObjectiveCircuit = circuit.type === "objective";
    const firstStep = circuit.steps[0];
    const [selectedStepId, setSelectedStepId] = useState<string>(firstStep.id);
    const selectedStep = circuit.steps.find(s => s.id === selectedStepId) || firstStep;

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Intégration</h2>
                <p className="text-foreground/70">
                    Intégrez facilement le suivi des utilisateurs dans votre application avec notre SDK JavaScript.
                </p>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Installation</h3>
                <Card className="p-6 border-secondary/20 bg-surface-2">
                    <div className="flex items-center gap-2 text-sm text-foreground/70 mb-4">
                        <Terminal className="h-4 w-4" />
                        <span>Installation via npm</span>
                    </div>
                    <div className="relative">
                        <pre className="p-4 rounded-lg bg-black/90 text-white/90 font-mono text-sm overflow-x-auto">
                            <code>npm install @ludiks/sdk</code>
                        </pre>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute top-2 right-2 text-white/50 hover:text-white"
                        >
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Initialization */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Initialisation</h3>
                <Card className="p-6 border-secondary/20 bg-surface-2">
                    <div className="flex items-center gap-2 text-sm text-foreground/70 mb-4">
                        <Code className="h-4 w-4" />
                        <span>Configuration du SDK</span>
                    </div>
                    <div className="relative">
                        <pre className="p-4 rounded-lg bg-black/90 text-white/90 font-mono text-sm overflow-x-auto">
                            <code>{`import { Ludiks } from '@ludiks/sdk';

// Initialisation du SDK avec les informations de l'utilisateur
const ludiks = await Ludiks.setup({
    apiKey: '${firstApiKey?.value}', // Clé API de votre projet
    user: {
        id: 'USER_ID', // ID unique de l'utilisateur
        full_name: 'John Doe', // Nom complet de l'utilisateur
        email: 'john@example.com', // Email (optionnel)
        picture: 'https://...', // URL de l'avatar (optionnel)
        metadata: { // Métadonnées personnalisées (optionnel)
            company: 'Acme Inc',
            role: 'Developer'
        }
    }
});`}</code>
                        </pre>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute top-2 right-2 text-white/50 hover:text-white"
                        >
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Tracking Events */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Suivi des événements</h3>
                <Card className="p-6 border-secondary/20 bg-surface-2">
                    <div className="flex items-center gap-2 text-sm text-foreground/70 mb-4">
                        <Code className="h-4 w-4" />
                        <span>Envoi d&apos;un événement</span>
                    </div>
                    <div className="space-y-6">
                        {isObjectiveCircuit ? (
                            <>
                                <p className="text-foreground/70 mb-4">
                                    Pour un circuit d&apos;objectif, vous devez envoyer un événement pour chaque étape complétée. Sélectionnez une étape pour voir l&apos;exemple correspondant&nbsp;:
                                </p>
                                <div className="mb-4">
                                    <label htmlFor="step-select" className="text-sm text-foreground/70 mr-2">Étape :</label>
                                    <select
                                        id="step-select"
                                        className="border border-secondary/20 rounded px-2 py-1 text-sm bg-background"
                                        value={selectedStepId}
                                        onChange={e => setSelectedStepId(e.target.value)}
                                    >
                                        {circuit.steps.map((step, idx) => (
                                            <option key={step.id} value={step.id}>{`Étape ${idx + 1} : ${step.name}`}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="relative mb-8">
                                    <pre className="p-4 rounded-lg bg-black/90 text-white/90 font-mono text-sm overflow-x-auto">
                                        <code>{`// Envoi d'un événement pour une étape
await ludiks.trackEvent({
    eventName: '${selectedStep.eventName}',
    timestamp: new Date() // Optionnel, par défaut: Date.now()
});`}</code>
                                    </pre>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="absolute top-2 right-2 text-white/50 hover:text-white"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                                {/* Tableau des eventName */}
                                <div className="mb-8">
                                    <div className="text-sm font-medium text-foreground mb-2">Liste des events disponibles :</div>
                                    <table className="w-full text-sm border-collapse">
                                        <thead>
                                            <tr className="bg-surface-2">
                                                <th className="text-left p-2 font-semibold text-foreground/80">Étape</th>
                                                <th className="text-left p-2 font-semibold text-foreground/80">eventName</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {circuit.steps.map((step, idx) => (
                                                <tr key={step.id} className={idx % 2 === 0 ? "bg-background" : "bg-surface-2/50"}>
                                                    <td className="p-2">{step.name}</td>
                                                    <td className="p-2 font-mono text-xs">{step.eventName}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-foreground/70">
                                    Pour un circuit à points ou à actions, envoyez un événement avec la valeur à incrémenter :
                                </p>
                                <div className="relative mb-8">
                                    <pre className="p-4 rounded-lg bg-black/90 text-white/90 font-mono text-sm overflow-x-auto">
                                        <code>{`// Envoi d'un événement avec une valeur
await ludiks.trackEvent({
    eventName: '${firstStep.eventName}',
    value: 1, // Nombre de points/actions à incrémenter
    timestamp: new Date() // Optionnel, par défaut: Date.now()
});`}</code>
                                    </pre>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="absolute top-2 right-2 text-white/50 hover:text-white"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </Card>
            </div>

            {/* API Reference */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Référence API</h3>
                <Card className="p-6 border-secondary/20 bg-surface-2">
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-medium text-foreground mb-2">Types</h4>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm font-medium text-foreground/80 mb-2">SetupOptions</div>
                                    <pre className="p-4 rounded-lg bg-black/90 text-white/90 font-mono text-xs overflow-x-auto">
{`interface SetupOptions {
    apiKey: string;
    user: {
        id: string;
        full_name: string;
        email?: string;
        picture?: string;
        metadata?: Record<string, any>;
    };
}`}
                                    </pre>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-foreground/80 mb-2">TrackEventOptions</div>
                                    <pre className="p-4 rounded-lg bg-black/90 text-white/90 font-mono text-xs overflow-x-auto">
{`interface TrackEventOptions {
    eventName: string;
    value?: number;
    timestamp?: Date;
}`}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-medium text-foreground mb-2">Méthodes</h4>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm font-medium text-foreground/80 mb-2">setup(options: SetupOptions): Promise&lt;Ludiks&gt;</div>
                                    <p className="text-sm text-foreground/70 mb-2">
                                        Initialise le SDK avec les informations de l&apos;utilisateur. Cette méthode doit être appelée une seule fois au démarrage de l&apos;application.
                                    </p>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-foreground/80 mb-2">trackEvent(options: TrackEventOptions): Promise&lt;void&gt;</div>
                                    <p className="text-sm text-foreground/70 mb-2">
                                        Envoie un événement au serveur. Pour les circuits d&apos;objectif, utilisez l&apos;eventName correspondant à l&apos;étape. Pour les circuits à points/actions, incluez la valeur à incrémenter.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
} 