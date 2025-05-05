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
    const [imageUrl, setImageUrl] = useState("");
    const [imageError, setImageError] = useState(false);
    const [stepId, setStepId] = useState<string | null>(null);
    const [isCompletionReward, setIsCompletionReward] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const isValidUrl = useCallback((url: string) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate({ 
            name, 
            description, 
            image_url: isValidUrl(imageUrl) && !imageError ? imageUrl : "",
            step_id: isCompletionReward ? null : stepId,
            is_completion_reward: isCompletionReward
        });
        setName("");
        setDescription("");
        setImageUrl("");
        setImageError(false);
        setStepId(null);
        setIsCompletionReward(false);
        setCurrentStep(1);
        onClose();
    };

    const getStepDisplay = (step: Step, index: number) => {
        if (circuitType === "objective") {
            return step.name;
        }
        return `Palier ${index + 1}`;
    };

    const nextStep = () => {
        if (currentStep === 1 && !name) return;
        if (currentStep === 2 && !isValidUrl(imageUrl) && imageUrl) return;
        if (currentStep === 3 && !isCompletionReward && !stepId) return;
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <DialogHeader>
                        <DialogTitle>Créer une récompense</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6 py-4">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                    1
                                </div>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                    2
                                </div>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                    3
                                </div>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
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
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="grid grid-cols-2 gap-6"
                                >
                                    <div className="space-y-2">
                                        <Label>Image (optionnel)</Label>
                                        <Input
                                            type="url"
                                            value={imageUrl}
                                            onChange={(e) => {
                                                setImageUrl(e.target.value);
                                                setImageError(false);
                                            }}
                                            placeholder="https://exemple.com/image.png"
                                            className={`border-border/50 focus:border-border/80 ${imageError ? "border-destructive/50 focus:border-destructive/80" : ""}`}
                                        />
                                        {!isValidUrl(imageUrl) && imageUrl && (
                                            <div className="flex items-center gap-2 text-sm text-destructive">
                                                <AlertCircle className="h-4 w-4" />
                                                <span>L&apos;URL n&apos;est pas valide</span>
                                            </div>
                                        )}
                                        {imageError && (
                                            <div className="flex items-center gap-2 text-sm text-destructive">
                                                <AlertCircle className="h-4 w-4" />
                                                <span>Impossible de charger l&apos;image</span>
                                            </div>
                                        )}
                                        <p className="text-xs text-muted-foreground">
                                            Une image par défaut sera utilisée si aucune image n&apos;est fournie
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Aperçu</Label>
                                        {isValidUrl(imageUrl) && !imageError ? (
                                            <div className="aspect-square rounded-lg border border-border/50 overflow-hidden">
                                                <img
                                                    src={imageUrl}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                    onError={() => setImageError(true)}
                                                />
                                            </div>
                                        ) : (
                                            <div className="aspect-square rounded-lg border border-border/50 flex items-center justify-center bg-muted/50">
                                                <Image className="h-8 w-8 text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-2 gap-4">
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
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <DialogFooter>
                            {currentStep > 1 && (
                                <Button type="button" variant="outline" onClick={prevStep}>
                                    Retour
                                </Button>
                            )}
                            {currentStep < 3 ? (
                                <Button type="button" onClick={nextStep}>
                                    Suivant
                                </Button>
                            ) : (
                                <Button type="submit" disabled={!name || (!isCompletionReward && !stepId)}>
                                    Créer
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
} 