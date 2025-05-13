import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Gift, Trophy, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CreateRewardForm } from "./rewards-tab/create-reward-form";

interface Reward {
    id: string;
    name: string;
    description: string;
    image_url: string;
    step_id: string | null;
    is_completion_reward: boolean;
}

interface Step {
    id: string;
    name: string;
    description: string;
    completionThreshold: number;
}

interface Circuit {
    id: string;
    name: string;
    type: "points" | "actions" | "objective";
    steps: Step[];
}

interface RewardsTabProps {
    circuit: Circuit;
}

export function RewardsTab({ circuit }: RewardsTabProps) {
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

    const handleCreateReward = (rewardData: { name: string; description: string; image_url: string; step_id: string | null; is_completion_reward: boolean }) => {
        const newReward: Reward = {
            id: crypto.randomUUID(),
            ...rewardData,
        };
        setRewards(prev => [...prev, newReward]);
    };

    const getStepDisplay = (stepId: string) => {
        const step = circuit.steps.find(step => step.id === stepId);
        if (!step) return "Étape inconnue";

        if (circuit.type === "objective") {
            return step.name;
        }

        // Pour les types "points" et "actions", on affiche le numéro du palier
        const stepIndex = circuit.steps.findIndex(s => s.id === stepId);
        return `Palier ${stepIndex + 1}`;
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">Gestion des récompenses</h2>
                    <p className="text-foreground/70">
                        Associez des récompenses aux étapes de votre parcours pour motiver vos utilisateurs
                    </p>
                </div>

                <div className="grid gap-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Récompenses disponibles</h3>
                        <Button
                            variant="outline"
                            className="border-secondary/20 hover:border-secondary/40"
                            onClick={() => setIsCreateFormOpen(true)}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Créer une récompense
                        </Button>
                    </div>

                    <AnimatePresence mode="popLayout">
                        {rewards.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-border bg-muted/50 text-center"
                            >
                                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                                    <Gift className="h-6 w-6 text-secondary" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    Aucune récompense créée
                                </h3>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Commencez par créer une récompense à associer à vos étapes
                                </p>
                                <Button
                                    variant="outline"
                                    className="border-secondary/20 hover:border-secondary/40"
                                    onClick={() => setIsCreateFormOpen(true)}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Créer une récompense
                                </Button>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {rewards.map((reward) => (
                                    <motion.div
                                        key={reward.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="p-3 rounded-lg border border-border bg-card hover:border-border/80 transition-colors duration-200 flex items-center gap-4 min-h-[72px]"
                                    >
                                        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                                            {reward.is_completion_reward ? (
                                                <Trophy className="h-6 w-6 text-primary" />
                                            ) : (
                                                <Target className="h-6 w-6 text-primary" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-semibold truncate text-foreground">{reward.name}</h4>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${reward.is_completion_reward ? 'bg-secondary/10 text-secondary' : 'bg-muted text-foreground/70'}`}>
                                                    {reward.is_completion_reward ? 'Fin du parcours' : circuit.type === "objective" ? 'Étape' : 'Palier'}
                                                </span>
                                            </div>
                                            {reward.description && (
                                                <p className="text-xs text-muted-foreground mb-1 truncate">{reward.description}</p>
                                            )}
                                            <p className="text-xs text-foreground/70">
                                                {reward.is_completion_reward
                                                    ? "Débloquée à la fin du parcours"
                                                    : `Débloquée à ${circuit.type === "objective" ? "l'étape" : "le palier"} : ${getStepDisplay(reward.step_id!)}`}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <CreateRewardForm
                isOpen={isCreateFormOpen}
                onClose={() => setIsCreateFormOpen(false)}
                onCreate={handleCreateReward}
                steps={circuit.steps}
                circuitType={circuit.type}
            />
        </div>
    );
} 