import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Copy, Terminal, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Circuit } from "@/lib/types/circuit.types";
import { useProjectStore } from "@/lib/stores/project-store";
import { useProjectApiKeys } from "@/lib/hooks/use-project-api-keys.hook";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";

export function ApiDocTab({ circuit }: { circuit: Circuit }) {
    const t = useTranslations('dashboard.circuits.apiDoc');
    const { selectedProject } = useProjectStore();
    const { apiKeys } = useProjectApiKeys(selectedProject?.id || '');
    const firstApiKey = apiKeys[0];
    const hasApiKey = !!firstApiKey;
    const isObjectiveCircuit = circuit.type === "objective";
    const firstStep = circuit.steps[0];
    const [selectedStepId, setSelectedStepId] = useState<string>(firstStep.id);
    const selectedStep = circuit.steps.find(s => s.id === selectedStepId) || firstStep;

    // Test API key for demonstration
    const testApiKey = "lud_test_1234567890abcdef";

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">{t('title')}</h2>
                <p className="text-foreground/70">
                    {t('subtitle')}
                </p>
            </div>

            {/* API Key Warning */}
            {!hasApiKey && (
                <Card className="p-6 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                        <div className="space-y-2">
                            <h3 className="font-semibold text-orange-800 dark:text-orange-200">
                                {t('api_key_warning.title')}
                            </h3>
                            <p className="text-sm text-orange-700 dark:text-orange-300">
                                {t('api_key_warning.description')}
                            </p>
                            <p className="text-sm text-orange-700 dark:text-orange-300">
                                {t('api_key_warning.create_key')}{' '}
                                <Link 
                                    href="/dashboard/settings" 
                                    className="font-medium underline hover:no-underline"
                                >
                                    {t('api_key_warning.settings')}
                                </Link>
                                &nbsp;{t('api_key_warning.tab')}
                            </p>
                        </div>
                    </div>
                </Card>
            )}

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">{t('installation.title')}</h3>
                <Card className="p-6 border-secondary/20 bg-surface-2">
                    <div className="flex items-center gap-2 text-sm text-foreground/70 mb-4">
                        <Terminal className="h-4 w-4" />
                        <span>{t('installation.npm_install')}</span>
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
                <h3 className="text-xl font-semibold text-foreground">{t('initialization.title')}</h3>
                <Card className="p-6 border-secondary/20 bg-surface-2">
                    <div className="flex items-center gap-2 text-sm text-foreground/70 mb-4">
                        <Code className="h-4 w-4" />
                        <span>{t('initialization.sdk_config')}</span>
                    </div>
                    <div className="relative">
                        <pre className="p-4 rounded-lg bg-black/90 text-white/90 font-mono text-sm overflow-x-auto">
                            <code>{`import { Ludiks } from '@ludiks/sdk';

// ${t('code.comments.sdk_init')}
await Ludiks.initUser({
    apiKey: '${hasApiKey ? firstApiKey?.value : testApiKey}', // ${t('code.comments.api_key')}
    user: {
        id: 'USER_ID', // ${t('code.comments.user_id')}
        full_name: 'John Doe', // ${t('code.comments.full_name')}
        email: 'john@example.com', // ${t('code.comments.email')}
        picture: 'https://...', // ${t('code.comments.picture')}
        metadata: { // ${t('code.comments.metadata')}
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
                <h3 className="text-xl font-semibold text-foreground">{t('tracking_events.title')}</h3>
                <Card className="p-6 border-secondary/20 bg-surface-2">
                    <div className="flex items-center gap-2 text-sm text-foreground/70 mb-4">
                        <Code className="h-4 w-4" />
                        <span>{t('tracking_events.send_event')}</span>
                    </div>
                    <div className="space-y-6">
                        {isObjectiveCircuit ? (
                            <>
                                <p className="text-foreground/70 mb-4">
                                    {t('tracking_events.objective_description')}
                                </p>
                                <div className="mb-4">
                                    <label htmlFor="step-select" className="text-sm text-foreground/70 mr-2">{t('tracking_events.step_label')}</label>
                                    <select
                                        id="step-select"
                                        className="border border-secondary/20 rounded px-2 py-1 text-sm bg-background"
                                        value={selectedStepId}
                                        onChange={e => setSelectedStepId(e.target.value)}
                                    >
                                        {circuit.steps.map((step, idx) => (
                                            <option key={step.id} value={step.id}>{t('tracking_events.step_option', { index: idx + 1, name: step.name })}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="relative mb-8">
                                    <pre className="p-4 rounded-lg bg-black/90 text-white/90 font-mono text-sm overflow-x-auto">
                                        <code>{`// ${t('code.comments.send_step_event')}
const response = await Ludiks.trackEvent({
    apiKey: '${hasApiKey ? firstApiKey?.value : testApiKey}',
    userId: 'USER_ID',
    eventName: '${selectedStep.eventName}',
    timestamp: new Date() // ${t('code.comments.timestamp_optional')}
});

console.log(response);
// {
//   "success": true,
//   "updated": true,
//   "stepCompleted": true,
//   "circuitCompleted": false,
//   "alreadyCompleted": false,
//   "points": 1,
//   "rewards": [
//     { "name": "${t('code.examples.beginner_badge')}" }
//   ]
// }`}</code>
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
                                    <div className="text-sm font-medium text-foreground mb-2">{t('tracking_events.available_events')}</div>
                                    <table className="w-full text-sm border-collapse">
                                        <thead>
                                            <tr className="bg-surface-2">
                                                <th className="text-left p-2 font-semibold text-foreground/80">{t('tracking_events.step_column')}</th>
                                                <th className="text-left p-2 font-semibold text-foreground/80">{t('tracking_events.event_name_column')}</th>
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
                                    {t('tracking_events.progressive_description')}
                                </p>
                                <div className="relative mb-8">
                                    <pre className="p-4 rounded-lg bg-black/90 text-white/90 font-mono text-sm overflow-x-auto">
                                        <code>{`// ${t('code.comments.send_value_event')}
const response = await Ludiks.trackEvent({
    apiKey: '${hasApiKey ? firstApiKey?.value : testApiKey}',
    userId: 'USER_ID',
    eventName: '${firstStep.eventName}',
    value: 1, // ${t('code.comments.increment_value')}
    timestamp: new Date() // ${t('code.comments.timestamp_optional')}
});

console.log(response);
// {
//   "success": true,
//   "updated": true,
//   "stepCompleted": true,
//   "circuitCompleted": false,
//   "alreadyCompleted": false,
//   "points": 5,
//   "rewards": [
//     { "name": "${t('code.examples.beginner_badge')}" }
//   ]
// }`}</code>
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

            {/* Response Format */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">{t('response_format.title')}</h3>
                <Card className="p-6 border-secondary/20 bg-surface-2">
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-medium text-foreground mb-2">{t('response_format.structure')}</h4>
                            <pre className="p-4 rounded-lg bg-black/90 text-white/90 font-mono text-xs overflow-x-auto">
{`interface TrackEventResponse {
    success: boolean;           // ${t('code.comments.operation_status')}
    updated: boolean;           // ${t('code.comments.progression_updated')}
    message?: string;           // ${t('code.comments.error_message')}
    stepCompleted: boolean;     // ${t('code.comments.step_completed')}
    circuitCompleted: boolean;  // ${t('code.comments.circuit_completed')}
    alreadyCompleted: boolean;  // ${t('code.comments.already_completed')}
    points?: number;            // ${t('code.comments.total_points')}
    rewards?: {                 // ${t('code.comments.unlocked_rewards')}
        name: string;
    }[];
}`}
                            </pre>
                        </div>

                        <div>
                            <h4 className="text-lg font-medium text-foreground mb-2">{t('response_format.examples')}</h4>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm font-medium text-foreground/80 mb-2">{t('response_format.success_step')}</div>
                                    <pre className="p-3 rounded-lg bg-black/90 text-white/90 font-mono text-xs overflow-x-auto">
{`{
    "success": true,
    "updated": true,
    "stepCompleted": true,
    "circuitCompleted": false,
    "alreadyCompleted": false,
    "points": 1,
    "rewards": [
        { "name": "${t('code.examples.beginner_badge')}" }
    ]
}`}
                                    </pre>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-foreground/80 mb-2">{t('response_format.circuit_completed')}</div>
                                    <pre className="p-3 rounded-lg bg-black/90 text-white/90 font-mono text-xs overflow-x-auto">
{`{
    "success": true,
    "updated": true,
    "stepCompleted": true,
    "circuitCompleted": true,
    "alreadyCompleted": false,
    "points": 10,
    "rewards": [
        { "name": "${t('code.examples.beginner_badge')}" },
        { "name": "${t('code.examples.completion_certificate')}" }
    ]
}`}
                                    </pre>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-foreground/80 mb-2">{t('response_format.already_completed')}</div>
                                    <pre className="p-3 rounded-lg bg-black/90 text-white/90 font-mono text-xs overflow-x-auto">
{`{
    "success": true,
    "updated": false,
    "stepCompleted": false,
    "circuitCompleted": false,
    "alreadyCompleted": true,
    "message": "Step already completed",
    "points": 5
}`}
                                    </pre>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-foreground/80 mb-2">{t('response_format.error')}</div>
                                    <pre className="p-3 rounded-lg bg-black/90 text-white/90 font-mono text-xs overflow-x-auto">
{`{
    "success": false,
    "updated": false,
    "stepCompleted": false,
    "circuitCompleted": false,
    "alreadyCompleted": false,
    "message": "Step not found for this event"
}`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* API Reference */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">{t('api_reference.title')}</h3>
                <Card className="p-6 border-secondary/20 bg-surface-2">
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-medium text-foreground mb-2">{t('api_reference.types')}</h4>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm font-medium text-foreground/80 mb-2">InitUserOptions</div>
                                    <pre className="p-4 rounded-lg bg-black/90 text-white/90 font-mono text-xs overflow-x-auto">
{`interface InitUserOptions {
    apiKey: string;
    user: {
        id: string;
        full_name: string;
        email?: string;
        picture?: string;
        metadata?: Record<string, any>;
    };
    baseUrl?: string;
}`}
                                    </pre>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-foreground/80 mb-2">TrackEventOptions</div>
                                    <pre className="p-4 rounded-lg bg-black/90 text-white/90 font-mono text-xs overflow-x-auto">
{`interface TrackEventOptions {
    apiKey: string;
    userId: string;
    eventName: string;
    value?: number;
    timestamp?: Date;
    baseUrl?: string;
}`}
                                    </pre>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-foreground/80 mb-2">TrackEventResponse</div>
                                    <pre className="p-4 rounded-lg bg-black/90 text-white/90 font-mono text-xs overflow-x-auto">
{`interface TrackEventResponse {
    success: boolean;
    updated: boolean;
    message?: string;
    stepCompleted: boolean;
    circuitCompleted: boolean;
    alreadyCompleted: boolean;
    points?: number;
    rewards?: {
        name: string;
    }[];
}`}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-medium text-foreground mb-2">{t('api_reference.methods')}</h4>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm font-medium text-foreground/80 mb-2">initUser(options: InitUserOptions): Promise&lt;void&gt;</div>
                                    <p className="text-sm text-foreground/70 mb-2">
                                        {t('api_reference.init_user_description')}
                                    </p>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-foreground/80 mb-2">trackEvent(options: TrackEventOptions): Promise&lt;TrackEventResponse&gt;</div>
                                    <p className="text-sm text-foreground/70 mb-2">
                                        {t('api_reference.track_event_description')}
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