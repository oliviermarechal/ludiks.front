import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Image, AlertCircle, Trophy, Target } from "lucide-react";

interface Step {
    id: string;
    name: string;
    description: string;
    completionThreshold: number;
}

interface CreateRewardFormProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (reward: { name: string; description: string; image_url: string; step_id: string | null; is_completion_reward: boolean }) => void;
    steps: Step[];
    circuitType: "points" | "actions" | "objective";
}

export function CreateRewardForm({ isOpen, onClose, onCreate, steps, circuitType }: CreateRewardFormProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [stepId, setStepId] = useState<string | null>(null);
    const [isCompletionReward, setIsCompletionReward] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate({ 
            name, 
            description, 
            image_url: "", // plus d'image
            step_id: isCompletionReward ? null : stepId,
            is_completion_reward: isCompletionReward
        });
        setName("");
        setDescription("");
        setStepId(null);
        setIsCompletionReward(false);
        onClose();
    };

    const getStepDisplay = (step: Step, index: number) => {
        if (circuitType === "objective") {
            return step.name;
        }
        return `Palier ${index + 1}`;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Créer une récompense</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nom de la récompense</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ex: Badge Expert"
                                required
                                className="border-border/50 focus:border-border/80"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description (optionnel)</Label>
                            <Input
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Décrivez la récompense..."
                                className="border-border/50 focus:border-border/80"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Condition de déblocage</Label>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsCompletionReward(true);
                                        setStepId(null);
                                    }}
                                    className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors ${
                                        isCompletionReward
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border/50 hover:border-primary/50'
                                    }`}
                                >
                                    <Trophy className="h-6 w-6" />
                                    <span className="font-medium">À la complétion</span>
                                    <span className="text-sm text-muted-foreground text-center">
                                        La récompense sera débloquée à la fin du parcours
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsCompletionReward(false);
                                    }}
                                    className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors ${
                                        !isCompletionReward
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border/50 hover:border-primary/50'
                                    }`}
                                >
                                    <Target className="h-6 w-6" />
                                    <span className="font-medium">À une étape</span>
                                    <span className="text-sm text-muted-foreground text-center">
                                        La récompense sera débloquée à une étape spécifique
                                    </span>
                                </button>
                            </div>
                        </div>
                        {!isCompletionReward && (
                            <div className="space-y-2">
                                <Label>{circuitType === "objective" ? "Étape associée" : "Palier associé"}</Label>
                                <Select value={stepId || ""} onValueChange={setStepId} required={!isCompletionReward}>
                                    <SelectTrigger className="border-border/50 focus:border-border/80">
                                        <SelectValue placeholder={`Sélectionnez ${circuitType === "objective" ? "une étape" : "un palier"}`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {steps.map((step, index) => (
                                            <SelectItem key={step.id} value={step.id}>
                                                {getStepDisplay(step, index)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={!name || (!isCompletionReward && !stepId)}>
                            Créer
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
} 