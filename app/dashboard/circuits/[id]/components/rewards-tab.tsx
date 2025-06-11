import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Gift, Trophy, Target, Pencil, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CreateRewardForm } from "./rewards-tab/create-reward-form";
import { Circuit } from "@/lib/stores/circuit-store";
import { useRewards, Reward } from "@/lib/hooks/use-rewards.hook";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface RewardsTabProps {
    circuit: Circuit;
}

export function RewardsTab({ circuit }: RewardsTabProps) {
    const { rewards, addReward, updateReward, deleteReward } = useRewards(circuit.id);
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
    const [editingReward, setEditingReward] = useState<Reward | null>(null);
    const [deletingReward, setDeletingReward] = useState<Reward | null>(null);

    const handleCreateReward = (rewardData: { name: string; description: string; stepId: string | null; unlockOnCircuitCompletion: boolean }) => {
        const newReward: Reward = {
            id: crypto.randomUUID(),
            ...rewardData,
        };
        addReward({ circuitId: circuit.id, reward: newReward });
    };

    const handleUpdateReward = (rewardData: { name: string; description: string; stepId: string | null; unlockOnCircuitCompletion: boolean }) => {
        if (!editingReward) return;
        
        updateReward({
            circuitId: circuit.id,
            rewardId: editingReward.id,
            reward: {
                ...editingReward,
                ...rewardData,
            },
        });
        setEditingReward(null);
    };

    const handleDeleteReward = () => {
        if (!deletingReward) return;
        
        deleteReward({
            circuitId: circuit.id,
            rewardId: deletingReward.id,
        });
        setDeletingReward(null);
    };

    const getStepDisplay = (stepId: string) => {
        const step = circuit.steps.find(step => step.id === stepId);
        if (!step) return "Étape inconnue";

        if (circuit.type === "objective") {
            return step.name;
        }

        const stepIndex = circuit.steps.findIndex(s => s.id === stepId);
        return `Palier ${stepIndex + 1}`;
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-4 p-4 rounded-lg border border-yellow-200 bg-yellow-50 text-yellow-900 text-sm">
                <strong>Note :</strong> Les informations de cette section sont purement indicatives. Elles permettent à Ludiks de vous signaler, via son API, lorsqu&apos;un utilisateur a débloqué une récompense. C&apos;est à votre système de gérer l&apos;attribution réelle de la récompense à l&apos;utilisateur.<br />
                La manière dont ces informations sont transmises à votre système est détaillée dans la documentation.
            </div>
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
                                    <div key={reward.id} className="relative flex flex-col justify-between p-6 rounded-xl border border-primary/40 bg-card w-full max-w-lg min-h-[160px] shadow-sm">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                                                {reward.unlockOnCircuitCompletion ? (
                                                    <Trophy className="h-7 w-7 text-primary" />
                                                ) : (
                                                    <Target className="h-7 w-7 text-primary" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h4 className="font-semibold text-lg break-words line-clamp-2 max-w-[260px]">{reward.name}</h4>
                                                </div>
                                                {reward.description && (
                                                    <p className="text-sm text-muted-foreground mb-2 break-words line-clamp-2">{reward.description}</p>
                                                )}
                                                <p className="text-sm text-foreground/70">
                                                    {reward.unlockOnCircuitCompletion
                                                        ? "Débloquée à la fin du parcours"
                                                        : `Débloquée à ${circuit.type === "objective" ? "l'étape" : "le palier"} : ${getStepDisplay(reward.stepId!)}`}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 justify-end items-center mt-6 absolute bottom-4 right-6">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-9 w-9 hover:bg-secondary/10 hover:text-secondary"
                                                onClick={() => setEditingReward(reward)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-9 w-9 text-destructive/80 hover:text-destructive hover:bg-destructive/10"
                                                onClick={() => setDeletingReward(reward)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
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

            <CreateRewardForm
                isOpen={!!editingReward}
                onClose={() => setEditingReward(null)}
                onCreate={handleUpdateReward}
                steps={circuit.steps}
                circuitType={circuit.type}
                initialData={editingReward}
            />

            <AlertDialog open={!!deletingReward} onOpenChange={() => setDeletingReward(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer la récompense</AlertDialogTitle>
                        <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer la récompense &quot;{deletingReward?.name}&quot; ? Cette action est irréversible.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteReward}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
} 