import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Wand2, Sparkles, Pencil, Check, X, Star } from "lucide-react";
import { StepPreviewChart } from "@/components/circuit/chart/step-preview-chart";
import { StepGenerator, generatePreviewSteps, GeneratorFormData } from "./step-generator";
import { Step } from "@/lib/types/circuit.types";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const stepSchema = z.object({
    completionThreshold: z.number().min(1, "Le seuil doit être supérieur à 0"),
});

interface PointsStepFormProps {
    circuitName: string;
    onStepUpdate: (step: Step) => Promise<void>;
    onStepDelete: (stepId: string) => Promise<void>;
    onStepAdd: (step: Step) => Promise<Step | null>;
    onStepsReset: (steps: Step[]) => Promise<void>;
    initialSteps?: Step[];
}

interface StepItemProps {
    step: Step;
    index: number;
    totalSteps: number;
    onUpdate: (updatedStep: Step) => void;
    onDelete: () => void;
}

const sortStepsByOrder = (steps: Step[]) => {
    return [...steps].sort((a, b) => {
        const orderA = a.completionThreshold ?? 0
        const orderB = b.completionThreshold ?? 0
        return orderA - orderB
    })
}

const StepItem = ({ step, index, onUpdate, onDelete }: StepItemProps) => {
    const t = useTranslations('dashboard.circuits.steps.forms.points');
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<{ completionThreshold: number }>({
        resolver: zodResolver(stepSchema),
        defaultValues: {
            completionThreshold: step.completionThreshold,
        },
    });

    useEffect(() => {
        reset({ completionThreshold: step.completionThreshold });
    }, [step, reset]);

    const handleSave = (data: { completionThreshold: number }) => {
        onUpdate({ ...step, completionThreshold: data.completionThreshold });
        setIsEditing(false);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative"
        >
            <div className={cn(
                "relative overflow-hidden rounded-xl",
                "transition-all duration-300 ease-in-out",
                "hover:shadow-lg hover:shadow-secondary/10",
                "bg-gradient-to-br from-card to-card/80 backdrop-blur-sm",
                "border border-border/50 hover:border-secondary/30"
            )}>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-4">
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center",
                            "bg-gradient-to-br from-secondary/20 to-secondary/10",
                            "border border-secondary/20",
                            "shadow-md shadow-secondary/5"
                        )}>
                            <Star className="w-4 h-4 text-secondary" />
                        </div>

                        <AnimatePresence mode="wait">
                            {isEditing ? (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="flex-1 flex items-center gap-2"
                                >
                                    <Input
                                        type="number"
                                        min={1}
                                        {...register("completionThreshold", { valueAsNumber: true })}
                                        placeholder={t('placeholder.threshold')}
                                        className="h-8 text-sm bg-background/50 backdrop-blur-sm border-secondary/20 focus:border-secondary/40 focus:ring-1 focus:ring-secondary/30"
                                    />
                                    {errors.completionThreshold && (
                                        <p className="text-xs text-red-500">
                                            {errors.completionThreshold.message}
                                        </p>
                                    )}

                                    <div className="flex gap-1">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setIsEditing(false)}
                                            className="h-8 w-8 text-destructive/70 hover:text-destructive hover:bg-destructive/10"
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={handleSubmit(handleSave)}
                                            className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-500/10"
                                        >
                                            <Check className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex-1 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="text-2xl font-bold text-secondary">
                                            {step.completionThreshold}
                                        </div>
                                        <div className="text-sm text-foreground/60">
                                            {t('label.points')}
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setIsEditing(true)}
                                            className="h-8 w-8 hover:bg-secondary/10 hover:text-secondary"
                                        >
                                            <Pencil className="h-3 w-3" />
                                        </Button>
                                        {index > 0 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={onDelete}
                                                className="h-8 w-8 text-destructive/70 hover:text-destructive hover:bg-destructive/10"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export function PointsStepForm({ 
    circuitName, 
    onStepUpdate, 
    onStepDelete, 
    onStepAdd, 
    onStepsReset,
    initialSteps = [] 
}: PointsStepFormProps) {
    const t = useTranslations('dashboard.circuits.steps.forms.points');
    const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
    const [sortedSteps, setSortedSteps] = useState<Step[]>([]);
    const [isAddingStep, setIsAddingStep] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<{ completionThreshold: number }>({
        resolver: zodResolver(stepSchema),
    });

    useEffect(() => {
        setSortedSteps(sortStepsByOrder(initialSteps));
    }, [initialSteps]);

    const handleStepUpdate = async (stepId: string, updatedStep: Step) => {
        await onStepUpdate(updatedStep);
        setSortedSteps(prevSteps => 
            sortStepsByOrder(prevSteps.map(step => 
                step.id === stepId ? updatedStep : step
            ))
        );
    };

    const handleStepDelete = async (stepId: string) => {
        await onStepDelete(stepId);
        setSortedSteps(prevSteps => 
            sortStepsByOrder(prevSteps.filter(step => step.id !== stepId))
        );
    };

    const handleAddStep = async (data: { completionThreshold: number }) => {
        const newStep: Step = {
            id: "", // L'ID sera défini par l'API
            name: t('step.name', { circuitName, index: sortedSteps.length + 1 }),
            description: t('step.description', { threshold: data.completionThreshold }),
            completionThreshold: data.completionThreshold,
            stepNumber: sortedSteps.length + 1,
            eventName: `${circuitName.toLowerCase().replace(/[^a-z0-9]/g, "_")}_level_${sortedSteps.length + 1}`,
        };

        const addedStep = await onStepAdd(newStep);
        if (addedStep) {
            setSortedSteps(prevSteps => sortStepsByOrder([...prevSteps, addedStep]));
        }
        setIsAddingStep(false);
    };

    const handleGenerateSteps = (values: GeneratorFormData) => {
        const generatedSteps = generatePreviewSteps(values, circuitName, t);
        onStepsReset(generatedSteps);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{t('title')}</h3>
                <Button
                    variant="outline"
                    onClick={() => setIsGeneratorOpen(true)}
                    className="relative group border-primary/20 hover:border-primary/40 bg-card dark:!border-primary/40 dark:hover:!border-primary/60"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-md" />
                    <Wand2 className="w-4 h-4 mr-2 transition-transform duration-500 group-hover:scale-110" />
                    <span className="relative">
                        {t('generate')}
                    </span>
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                        <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
                    </div>
                </Button>
            </div>

            <div className="relative">
                {/* Progress track */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary/30 via-secondary/20 to-secondary/10" />

                {/* Steps */}
                <div className="space-y-3 pl-8">
                    <AnimatePresence mode="popLayout">
                        {sortedSteps.map((step, index) => (
                            <StepItem
                                key={step.id}
                                step={step}
                                index={index}
                                totalSteps={sortedSteps.length}
                                onUpdate={(updatedStep) => handleStepUpdate(step.id, updatedStep)}
                                onDelete={() => handleStepDelete(step.id)}
                            />
                        ))}
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        {isAddingStep ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="relative"
                            >
                                <div className={cn(
                                    "relative overflow-hidden rounded-xl",
                                    "transition-all duration-300 ease-in-out",
                                    "hover:shadow-lg hover:shadow-secondary/10",
                                    "bg-gradient-to-br from-card to-card/80 backdrop-blur-sm",
                                    "border border-border/50 hover:border-secondary/30"
                                )}>
                                    <div className="relative p-4">
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center",
                                                "bg-gradient-to-br from-secondary/20 to-secondary/10",
                                                "border border-secondary/20",
                                                "shadow-md shadow-secondary/5"
                                            )}>
                                                <Star className="w-4 h-4 text-secondary" />
                                            </div>

                                            <form onSubmit={handleSubmit(handleAddStep)} className="flex-1 flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    min={1}
                                                    {...register("completionThreshold", { valueAsNumber: true })}
                                                    placeholder={t('placeholder.threshold')}
                                                    className="h-8 text-sm bg-background/50 backdrop-blur-sm border-secondary/20 focus:border-secondary/40 focus:ring-1 focus:ring-secondary/30"
                                                />
                                                {errors.completionThreshold && (
                                                    <p className="text-xs text-red-500">
                                                        {errors.completionThreshold.message}
                                                    </p>
                                                )}

                                                <div className="flex gap-1">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => setIsAddingStep(false)}
                                                        className="h-8 w-8 text-destructive/70 hover:text-destructive hover:bg-destructive/10"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                    <Button
                                                        type="submit"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-500/10"
                                                    >
                                                        <Check className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsAddingStep(true)}
                                    className="w-full h-9 text-sm border-border hover:border-border/80 dark:!border-primary/40 dark:hover:!border-primary/60"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    {t('add')}
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {sortedSteps.length > 1 && (
                <div className="space-y-4">
                    <div className="space-y-1">
                        <h3 className="font-medium">{t('preview.title')}</h3>
                        <p className="text-sm text-muted-foreground">
                            {t('preview.description')}
                        </p>
                    </div>
                    <div className="bg-card/50 rounded-lg p-4">
                        <StepPreviewChart steps={sortedSteps} />
                    </div>
                </div>
            )}

            <StepGenerator
                isOpen={isGeneratorOpen}
                onClose={() => setIsGeneratorOpen(false)}
                onGenerate={handleGenerateSteps}
                type="points"
                circuitName={circuitName}
            />
        </div>
    );
} 