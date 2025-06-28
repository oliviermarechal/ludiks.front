import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Target } from "lucide-react";
import { Step } from "@/lib/types/circuit.types";
import { Reward } from "@/lib/hooks/use-rewards.hook";
import { useTranslations } from "next-intl";

interface CreateRewardFormProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (reward: { name: string; description: string; stepId: string | null; unlockOnCircuitCompletion: boolean }) => void;
    steps: Step[];
    circuitType: "points" | "actions" | "objective";
    initialData?: Reward | null;
}

export function CreateRewardForm({ isOpen, onClose, onCreate, steps, circuitType, initialData }: CreateRewardFormProps) {
    const t = useTranslations('dashboard.circuits.rewards');
    const [name, setName] = useState(initialData?.name || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [stepId, setStepId] = useState<string | null>(initialData?.stepId || null);
    const [unlockOnCircuitCompletion, setUnlockOnCircuitCompletion] = useState(initialData?.unlockOnCircuitCompletion || false);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setDescription(initialData.description);
            setStepId(initialData.stepId);
            setUnlockOnCircuitCompletion(initialData.unlockOnCircuitCompletion);
        } else {
            setName("");
            setDescription("");
            setStepId(null);
            setUnlockOnCircuitCompletion(false);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate({ 
            name, 
            description, 
            stepId: unlockOnCircuitCompletion ? null : stepId,
            unlockOnCircuitCompletion
        });
        if (!initialData) {
            setName("");
            setDescription("");
            setStepId(null);
            setUnlockOnCircuitCompletion(false);
        }
        onClose();
    };

    const getStepDisplay = (step: Step, index: number) => {
        if (circuitType === "objective") {
            return step.name;
        }
        return t('fields.associated_level') + ` ${index + 1}`;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? t('edit') : t('create')}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">{t('fields.name')}</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={t('fields.name_placeholder')}
                                required
                                className="border-border/50 focus:border-border/80"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">{t('fields.description')}</Label>
                            <Input
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder={t('fields.description_placeholder')}
                                className="border-border/50 focus:border-border/80"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>{t('fields.unlock_condition')}</Label>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setUnlockOnCircuitCompletion(true);
                                        setStepId(null);
                                    }}
                                    className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors ${
                                        unlockOnCircuitCompletion
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border/50 hover:border-primary/50'
                                    }`}
                                >
                                    <Trophy className="h-6 w-6" />
                                    <span className="font-medium">{t('fields.completion')}</span>
                                    <span className="text-sm text-muted-foreground text-center">
                                        {t('fields.completion_hint')}
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setUnlockOnCircuitCompletion(false);
                                    }}
                                    className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors ${
                                        !unlockOnCircuitCompletion
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border/50 hover:border-primary/50'
                                    }`}
                                >
                                    <Target className="h-6 w-6" />
                                    <span className="font-medium">{t('fields.step')}</span>
                                    <span className="text-sm text-muted-foreground text-center">
                                        {t('fields.step_hint')}
                                    </span>
                                </button>
                            </div>
                        </div>
                        {!unlockOnCircuitCompletion && (
                            <div className="space-y-2">
                                <Label>{circuitType === "objective" ? t('fields.associated_step') : t('fields.associated_level')}</Label>
                                <Select value={stepId || ""} onValueChange={setStepId} required={!unlockOnCircuitCompletion}>
                                    <SelectTrigger className="border-border/50 focus:border-border/80">
                                        <SelectValue placeholder={circuitType === "objective" ? t('fields.select_step') : t('fields.select_level')} />
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
                        <Button type="button" variant="outline" onClick={onClose}>
                            {t('form.cancel')}
                        </Button>
                        <Button type="submit" disabled={!name || (!unlockOnCircuitCompletion && !stepId)}>
                            {initialData ? t('form.update') : t('form.create')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
} 