import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Copy, Terminal } from "lucide-react";
import { ExtendedCircuit } from "../page";
import { useState } from "react";

export function ApiDocTab({ circuit }: { circuit: ExtendedCircuit }) {
    const isObjectiveCircuit = circuit.type === "objective";
    const firstStep = circuit.steps[0];
    const [selectedStepId, setSelectedStepId] = useState<string>(firstStep.id);
    const selectedStep = circuit.steps.find(s => s.id === selectedStepId) || firstStep;

    return (
        <div className="space-y-8">
            {/* Introduction */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Documentation API</h2>
                <p className="text-foreground/70">
                    Intégrez facilement le suivi des utilisateurs dans votre application avec notre SDK JavaScript.
                </p>
            </div>

            {/* Installation */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Installation</h3>
                <Card className="p-6 border-secondary/20 bg-surface-2">
                    <div className="flex items-center gap-2 text-sm text-foreground/70 mb-4">
                        <Terminal className="h-4 w-4" />
                        <span>Installation via npm</span>
                    </div>
                    <div className="relative">
                        <pre className="p-4 rounded-lg bg-black/90 text-white/90 font-mono text-sm overflow-x-auto">
                            <code>npm install @ludiks/tracking</code>
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
                            <code>{`import { LudiksTracking } from '@ludiks/tracking';

const tracking = new LudiksTracking({
    apiKey: 'YOUR_API_KEY',
    userId: 'CURRENT_USER_ID'
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
                                        <code>{`await tracking.trackEvent({
    eventName: '${selectedStep.eventName}',
    date: new Date().toISOString()
});`}</code>
                                    </pre>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="absolute top-2 right-2 text-white/50 hover:text-white"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                    {/* Exemple de réponse */}
                                    <div className="mt-2">
                                        <div className="text-xs text-foreground/60 mb-1">Exemple de réponse&nbsp;:</div>
                                        <pre className="p-4 rounded-lg bg-black/90 text-white/90 font-mono text-xs overflow-x-auto">
{`{
  "success": true, // L'appel a réussi
  "updated": true, // Progression mise à jour
  "stepCompleted": true, // L'étape vient d'être complétée
  "circuitCompleted": false, // Le parcours complet n'est pas encore terminé
  "alreadyCompleted": false, // L'étape n'était pas déjà terminée
  "points": 3, // Points cumulés sur le parcours
  "rewards": [ // Récompenses obtenues lors de cet event (peut être vide)
    {
      "name": "Badge Expert", // Nom de la récompense
      "description": "Avoir complété l'étape 2", // Description
      "step_id": "${selectedStep.id}", // ID de l'étape associée (null si récompense de parcours)
    }
  ]
}`}
                                        </pre>
                                    </div>
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
                                        <code>{`await tracking.trackEvent({
    eventName: '${firstStep.eventName}',
    value: 1, // Nombre de points/actions à incrémenter
    date: new Date().toISOString()
});`}</code>
                                    </pre>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="absolute top-2 right-2 text-white/50 hover:text-white"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                    {/* Exemple de réponse */}
                                    <div className="mt-2">
                                        <div className="text-xs text-foreground/60 mb-1">Exemple de réponse&nbsp;:</div>
                                        <pre className="p-4 rounded-lg bg-black/90 text-white/90 font-mono text-xs overflow-x-auto">
{`{
  "success": true, // L'appel a réussi
  "updated": true, // Progression mise à jour
  "stepCompleted": false, // Cette action n'a pas complété d'étape
  "circuitCompleted": false, // Le parcours complet n'est pas encore terminé
  "alreadyCompleted": false, // Le parcours n'était pas déjà terminé
  "points": 5, // Points cumulés sur le parcours
  "rewards": [] // Récompenses obtenues lors de cet event (peut être vide)
}`}
                                        </pre>
                                    </div>
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
                            <h4 className="text-lg font-medium text-foreground mb-2">Endpoint</h4>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-1 rounded text-sm font-mono bg-emerald-500/10 text-emerald-500">POST</span>
                                <span className="text-foreground/70 font-mono">api.ludiks.io/api/tracking</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-medium text-foreground mb-2">Body</h4>
                            <div className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <span className="text-foreground/70 font-mono">user_id</span>
                                    <span className="text-foreground/50 text-sm">string</span>
                                    <span className="text-foreground/50 text-sm">ID de l&apos;utilisateur</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-foreground/70 font-mono">event_name</span>
                                    <span className="text-foreground/50 text-sm">string</span>
                                    <span className="text-foreground/50 text-sm">Nom de l&apos;événement</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-foreground/70 font-mono">value</span>
                                    <span className="text-foreground/50 text-sm">number (optionnel)</span>
                                    <span className="text-foreground/50 text-sm">Valeur à incrémenter (défaut: 1)</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-foreground/70 font-mono">date</span>
                                    <span className="text-foreground/50 text-sm">string</span>
                                    <span className="text-foreground/50 text-sm">Date au format ISO</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-medium text-foreground mb-2">Exemple de requête</h4>
                            <div className="relative">
                                <pre className="p-4 rounded-lg bg-black/90 text-white/90 font-mono text-sm overflow-x-auto">
                                    <code>{`{
    "user_id": "user_123",
    "event_name": "${isObjectiveCircuit ? circuit.steps[0].eventName : firstStep.eventName}",
    ${!isObjectiveCircuit ? '"value": 1,' : ''}
    "date": "2024-03-20T10:00:00.000Z"
}`}</code>
                                </pre>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="absolute top-2 right-2 text-white/50 hover:text-white"
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
} 