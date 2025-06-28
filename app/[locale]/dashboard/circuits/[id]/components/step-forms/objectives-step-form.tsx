import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Check, X, ArrowRight, Target, Pencil } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Step } from "@/lib/types/circuit.types";
import { useTranslations } from "next-intl";

const stepSchema = z.object({
    name: z.string().min(3, "Le nom de l'objectif doit contenir au moins 3 caractères"),
    description: z.string().optional(),
    eventName: z.string().min(3, "Le nom de l'événement doit contenir au moins 3 caractères"),
    completionThreshold: z.number().min(1, "Le seuil doit être supérieur à 0"),
});

type StepFormData = z.infer<typeof stepSchema>;

interface ObjectivesStepFormProps {
    onStepUpdate: (step: Step) => Promise<void>;
    onStepDelete: (stepId: string) => Promise<void>;
    onStepAdd: (step: Step) => Promise<Step | null>;
    onStepsOrderUpdate: (steps: Step[]) => Promise<void>;
    initialSteps?: Step[];
}

interface StepItemProps {
    step: Step;
    onUpdate: (updatedStep: Step) => void;
    onDelete: () => void;
}

const slugify = (text: string): string => {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
};

const MinimalGrip = () => {
    const t = useTranslations('dashboard.circuits.steps.forms.objectives.actions');
    return (
        <div className="flex items-center justify-center w-6 h-6 cursor-grab text-secondary/60 hover:text-secondary transition-colors duration-150" title={t('move')}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="4" r="1.5" fill="currentColor"/>
                <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
                <circle cx="10" cy="16" r="1.5" fill="currentColor"/>
            </svg>
        </div>
    );
};

const StepItem = ({ step, onUpdate, onDelete }: StepItemProps) => {
    const t = useTranslations('dashboard.circuits.steps.forms.objectives');
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<StepFormData>({
        resolver: zodResolver(stepSchema),
        defaultValues: {
            name: step.name,
            description: step.description,
            eventName: step.eventName,
            completionThreshold: step.completionThreshold,
        },
    });

    const stepName = watch("name");
    const eventName = watch("eventName");

    useEffect(() => {
        if (isEditing && stepName) {
            setValue("eventName", slugify(stepName));
        }
    }, [stepName, isEditing, setValue]);

    useEffect(() => {
        if (isEditing && eventName) {
            setValue("eventName", slugify(eventName));
        }
    }, [eventName, isEditing, setValue]);

    const handleSave = (data: StepFormData) => {
        onUpdate({ 
            ...step, 
            ...data,
            description: data.description || ""
        });
        setIsEditing(false);
    };

    return (
        <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
                {isEditing ? (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex-1 space-y-4"
                    >
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    {...register("name")}
                                    placeholder={t('placeholder.name')}
                                    className="h-9 text-sm bg-background/50 backdrop-blur-sm border-secondary/20 focus:border-secondary/40 focus:ring-1 focus:ring-secondary/30 transition-all duration-300"
                                />
                                {errors.name && (
                                    <motion.p 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-xs text-red-500"
                                    >
                                        {errors.name.message}
                                    </motion.p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Textarea
                                    {...register("description")}
                                    placeholder={t('placeholder.description')}
                                    className="text-sm min-h-[60px] bg-background/50 backdrop-blur-sm border-secondary/20 focus:border-secondary/40 focus:ring-1 focus:ring-secondary/30 resize-none transition-all duration-300"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="relative">
                                        <Input
                                            {...register("eventName")}
                                            placeholder={t('placeholder.eventName')}
                                            className="h-9 text-sm pl-8 bg-background/50 backdrop-blur-sm border-secondary/20 focus:border-secondary/40 focus:ring-1 focus:ring-secondary/30 transition-all duration-300"
                                        />
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-2.5">
                                            <span className="text-xs text-secondary/70">#</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-foreground/50">{t('help.eventName')}</p>
                                    {errors.eventName && (
                                        <motion.p 
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="text-xs text-red-500"
                                        >
                                            {errors.eventName.message}
                                        </motion.p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Input
                                        type="number"
                                        {...register("completionThreshold", { valueAsNumber: true })}
                                        placeholder={t('placeholder.threshold')}
                                        className="h-9 text-sm bg-background/50 backdrop-blur-sm border-secondary/20 focus:border-secondary/40 focus:ring-1 focus:ring-secondary/30 transition-all duration-300"
                                    />
                                    {errors.completionThreshold && (
                                        <motion.p 
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="text-xs text-red-500"
                                        >
                                            {errors.completionThreshold.message}
                                        </motion.p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsEditing(false)}
                                className="h-8 hover:bg-red-500/10 hover:text-red-500 transition-colors duration-300"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                            <Button
                                onClick={handleSubmit(handleSave)}
                                variant="ghost"
                                size="sm"
                                className="h-8 text-green-500 hover:text-green-600 hover:bg-green-500/10 transition-colors duration-300"
                            >
                                <Check className="h-4 w-4" />
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full border border-secondary/40 bg-secondary/10 text-sm font-semibold text-secondary mr-1">
                            {step.stepNumber ?? ''}
                        </span>
                        <h4 className="font-medium text-base leading-tight flex-1">{step.name}</h4>
                        <div className="flex items-center gap-1 ml-auto">
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="h-8 w-8 flex items-center justify-center rounded hover:bg-secondary/10 hover:text-secondary transition-all duration-200"
                                title={t('actions.edit')}
                            >
                                <Pencil className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                onClick={onDelete}
                                className="h-8 w-8 flex items-center justify-center rounded hover:bg-red-100 hover:text-red-500 transition-all duration-200"
                                title={t('actions.delete')}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

interface ChatStepProps {
    onComplete: (step: Partial<Step>) => void;
    onCancel: () => void;
}

const ChatStep = ({ onComplete, onCancel }: ChatStepProps) => {
    const t = useTranslations('dashboard.circuits.steps.forms.objectives.chat');
    const [currentStep, setCurrentStep] = useState(0);
    const [stepData, setStepData] = useState<Partial<Step>>({});
    const [currentValue, setCurrentValue] = useState("");

    const questions = [
        {
            question: t('name.question'),
            placeholder: t('name.placeholder'),
            field: "name" as const,
            validation: (value: string) => value.length >= 3,
            errorMessage: t('name.error'),
            onChange: (value: string) => {
                if (currentStep === 0) {
                    setStepData(prev => ({
                        ...prev,
                        eventName: slugify(value)
                    }));
                }
            }
        },
        {
            question: t('description.question'),
            placeholder: t('description.placeholder'),
            field: "description" as const,
            validation: () => true,
            optional: true,
        },
        {
            question: t('threshold.question'),
            placeholder: t('threshold.placeholder'),
            field: "completionThreshold" as const,
            type: "number",
            validation: (value: string) => parseInt(value) >= 1,
            errorMessage: t('threshold.error'),
        },
    ];

    const currentQuestion = questions[currentStep];

    useEffect(() => {
        setCurrentValue("");
    }, [currentStep]);

    const handleNext = () => {
        if (!currentQuestion.validation(currentValue)) return;

        const value = currentQuestion.type === "number" ? parseInt(currentValue) : currentValue;
        const updatedData = { ...stepData, [currentQuestion.field]: value || "" };
        setStepData(updatedData);

        if (currentStep === questions.length - 1) {
            onComplete(updatedData);
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleValueChange = (value: string) => {
        setCurrentValue(value);
        currentQuestion.onChange?.(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleNext();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-surface-2/50 to-background border border-secondary/20 shadow-[0_4px_20px_-8px_rgba(var(--secondary-rgb),0.2)]"
        >
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
            >
                <Label className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary/70">
                    {currentQuestion.question}
                </Label>
                <div className="flex gap-2">
                    <div className="flex-1 space-y-2">
                        <Input
                            type={currentQuestion.type || "text"}
                            value={currentValue}
                            onChange={(e) => handleValueChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={currentQuestion.placeholder}
                            className="h-10 text-sm bg-background/50 backdrop-blur-sm border-secondary/20 focus:border-secondary/40 focus:ring-1 focus:ring-secondary/30 transition-all duration-300"
                            min={currentQuestion.type === "number" ? 1 : undefined}
                        />
                    </div>
                    <Button
                        type="button"
                        onClick={handleNext}
                        disabled={!currentQuestion.validation(currentValue)}
                        size="sm"
                        className={`
                            h-10 px-3 bg-secondary hover:bg-secondary/90 
                            disabled:opacity-50 disabled:cursor-not-allowed
                            transition-all duration-300
                            ${currentQuestion.validation(currentValue) ? 'shadow-[0_0_0_4px_rgba(var(--secondary-rgb),0.1)]' : ''}
                        `}
                    >
                        {currentStep === questions.length - 1 ? (
                            <Check className="h-4 w-4" />
                        ) : (
                            <ArrowRight className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </motion.div>

            <div className="flex justify-between items-center">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onCancel}
                    className="h-8 text-sm hover:bg-red-500/10 hover:text-red-500 transition-colors duration-300"
                >
                    {t('actions.cancel')}
                </Button>
                {currentQuestion.optional && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            const updatedData = { ...stepData, [currentQuestion.field]: "" };
                            setStepData(updatedData);
                            setCurrentStep(prev => prev + 1);
                        }}
                        className="h-8 text-sm hover:bg-secondary/10 hover:text-secondary transition-colors duration-300"
                    >
                        {t('actions.skip')}
                    </Button>
                )}
            </div>
        </motion.div>
    );
};

export function ObjectivesStepForm({ 
    onStepUpdate, 
    onStepDelete, 
    onStepAdd,
    onStepsOrderUpdate,
    initialSteps = [] 
}: ObjectivesStepFormProps) {
    const t = useTranslations('dashboard.circuits.steps.forms.objectives');
    const [steps, setSteps] = useState<Step[]>(initialSteps);
    const [isAddingStep, setIsAddingStep] = useState(false);

    useEffect(() => {
        setSteps(initialSteps);
    }, [initialSteps]);

    const handleDragEnd = async (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(steps);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const updatedSteps = items.map((step, index) => ({
            ...step,
            stepNumber: index + 1
        }));

        setSteps(updatedSteps);

        try {
            await onStepsOrderUpdate(updatedSteps);
        } catch (error) {
            console.error('Error updating steps ordering:', error);
            // Revert to original order on error
            setSteps(initialSteps);
        }
    };

    const handleAddStep = async (newStepData: Partial<Step>) => {
        const newStep: Step = {
            id: `temp_${Date.now()}_${Math.random()}`, // Temporary ID for drag & drop
            name: newStepData.name || "",
            description: newStepData.description || "",
            eventName: newStepData.eventName || "",
            completionThreshold: newStepData.completionThreshold || 1,
            stepNumber: steps.length + 1,
        };

        const addedStep = await onStepAdd(newStep);
        if (addedStep) {
            setSteps(prevSteps => [...prevSteps, addedStep]);
        }
        setIsAddingStep(false);
    };

    const handleUpdateStep = async (stepId: string, updatedStep: Step) => {
        await onStepUpdate(updatedStep);
        setSteps(prevSteps => 
            prevSteps.map(step => 
                step.id === stepId ? updatedStep : step
            )
        );
    };

    const handleDeleteStep = async (stepId: string) => {
        await onStepDelete(stepId);
        setSteps(prevSteps => 
            prevSteps.filter(step => step.id !== stepId)
        );
    };

    return (
        <div className="space-y-8">
            <AnimatePresence mode="popLayout">
                {steps.length === 0 && !isAddingStep && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-border bg-muted/50 text-center"
                    >
                        <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                            <Target className="h-6 w-6 text-secondary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{t('empty.title')}</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            {t('empty.description')}
                        </p>
                        <Button
                            type="button"
                            onClick={() => setIsAddingStep(true)}
                            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            {t('add')}
                        </Button>
                    </motion.div>
                )}

                {steps.length > 0 && (
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="steps">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="space-y-4"
                                >
                                    {steps.map((step, index) => (
                                        <Draggable
                                            key={step.id}
                                            draggableId={step.id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className={`
                                                        group relative flex items-center gap-4 p-4 rounded-xl 
                                                        border border-border border-l-4 border-secondary 
                                                        transition-all duration-200 shadow-sm hover:shadow-md
                                                        ${snapshot.isDragging ? 'shadow-lg rotate-2 scale-105 bg-secondary/5' : 'bg-white'}
                                                    `}
                                                    style={{ 
                                                        minHeight: 64,
                                                        ...provided.draggableProps.style
                                                    }}
                                                >
                                                    <div 
                                                        {...provided.dragHandleProps} 
                                                        className="flex items-center justify-center w-8 h-full"
                                                    >
                                                        <MinimalGrip />
                                                    </div>
                                                    <StepItem
                                                        step={{ ...step, stepNumber: index + 1 }}
                                                        onUpdate={(updatedStep) => handleUpdateStep(step.id, updatedStep)}
                                                        onDelete={() => handleDeleteStep(step.id)}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}

                {isAddingStep && (
                    <ChatStep
                        onComplete={handleAddStep}
                        onCancel={() => setIsAddingStep(false)}
                    />
                )}
            </AnimatePresence>

            {!isAddingStep && steps.length > 0 && (
                <motion.div layout className="space-y-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsAddingStep(true)}
                        className="
                            w-full h-10 text-sm
                            border-secondary/20 hover:border-secondary/40 
                            hover:bg-gradient-to-r hover:from-secondary/5 hover:to-transparent
                            transition-all duration-300
                        "
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        {t('add')}
                    </Button>
                </motion.div>
            )}
        </div>
    );
} 