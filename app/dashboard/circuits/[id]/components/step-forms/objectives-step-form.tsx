import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Check, X, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";

const stepSchema = z.object({
    name: z.string().min(3, "Le nom de l'objectif doit contenir au moins 3 caractères"),
    description: z.string().optional(),
    eventName: z.string().min(3, "Le nom de l'événement doit contenir au moins 3 caractères"),
    completionThreshold: z.number().min(1, "Le seuil doit être supérieur à 0"),
});

type StepFormData = z.infer<typeof stepSchema>;

interface Step {
    id: string;
    name: string;
    description: string;
    completionRate: number;
    completionThreshold: number;
    usersCompleted: number;
    eventName: string;
}

interface ObjectivesStepFormProps {
    circuitName: string;
    onStepsChange: (steps: Step[]) => void;
    initialSteps?: Step[];
}

interface StepItemProps {
    step: Step;
    index: number;
    onUpdate: (updatedStep: Step) => void;
}

const slugify = (text: string): string => {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
};

const StepItem = ({ step, index, onUpdate }: StepItemProps) => {
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
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="group relative"
        >
            <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-2/50 transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(var(--secondary-rgb),0.2),0_2px_4px_rgba(var(--secondary-rgb),0.1)]">
                <div className="shrink-0 mt-1">
                    <div className="relative">
                        <motion.div
                            initial={false}
                            animate={{
                                scale: isEditing ? 1.1 : 1,
                                rotate: isEditing ? -10 : 0,
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Badge 
                                variant="outline" 
                                className={`
                                    h-8 w-8 flex items-center justify-center p-0 text-sm font-medium 
                                    bg-gradient-to-br from-background to-surface-2
                                    border-2 border-secondary/20 shadow-sm
                                    group-hover:border-secondary/30 group-hover:shadow-md
                                    transition-all duration-300
                                    ${isEditing ? 'border-secondary shadow-[0_0_0_4px_rgba(var(--secondary-rgb),0.1)]' : ''}
                                `}
                            >
                                {index + 1}
                            </Badge>
                        </motion.div>
                        {index < 3 && (
                            <motion.div 
                                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0.5 h-4"
                                style={{
                                    background: "linear-gradient(to bottom, rgba(var(--secondary-rgb), 0.3), transparent)"
                                }}
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ delay: 0.2 }}
                            />
                        )}
                    </div>
                </div>

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
                                        placeholder="Nom de l'objectif"
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
                                        placeholder="Description (optionnelle)"
                                        className="text-sm min-h-[60px] bg-background/50 backdrop-blur-sm border-secondary/20 focus:border-secondary/40 focus:ring-1 focus:ring-secondary/30 resize-none transition-all duration-300"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <Input
                                                {...register("eventName")}
                                                placeholder="nom_de_levenement"
                                                className="h-9 text-sm pl-8 bg-background/50 backdrop-blur-sm border-secondary/20 focus:border-secondary/40 focus:ring-1 focus:ring-secondary/30 transition-all duration-300"
                                            />
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-2.5">
                                                <span className="text-xs text-secondary/70">#</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-foreground/50">Identifiant technique pour le tracking (ex: completer_profil)</p>
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
                                            placeholder="Répétitions"
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
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 min-h-[2.5rem] flex items-center"
                        >
                            <div className="flex-1">
                                <div className="flex items-baseline gap-3">
                                    <h4 className="font-medium text-sm">{step.name}</h4>
                                    {step.description && (
                                        <p className="text-sm text-foreground/70">{step.description}</p>
                                    )}
                                </div>
                                <div className="mt-0.5 space-x-2 text-xs flex">
                                    <p className="text-foreground/70">{step.completionThreshold}x pour valider</p>
                                    <p className="text-secondary/70">#{step.eventName}</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsEditing(true)}
                                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-secondary/10 hover:text-secondary"
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

interface ChatStepProps {
    onComplete: (step: Partial<Step>) => void;
    onCancel: () => void;
}

const ChatStep = ({ onComplete, onCancel }: ChatStepProps) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [stepData, setStepData] = useState<Partial<Step>>({});
    const [currentValue, setCurrentValue] = useState("");

    const questions = [
        {
            question: "Comment s'appelle cet objectif ?",
            placeholder: "Ex: Compléter son profil",
            field: "name" as const,
            validation: (value: string) => value.length >= 3,
            errorMessage: "Le nom doit contenir au moins 3 caractères",
            onChange: (value: string) => {
                if (currentStep === 0) { // Si on est sur la première question (nom)
                    setStepData(prev => ({
                        ...prev,
                        eventName: slugify(value)
                    }));
                }
            }
        },
        {
            question: "En une phrase, décris ce que l'utilisateur doit faire (optionnel)",
            placeholder: "Ex: Remplir tous les champs de son profil",
            field: "description" as const,
            validation: () => true,
            optional: true,
        },
        {
            question: "Quel est l'identifiant technique pour tracker la progression ?",
            placeholder: "Ex: completer_profil",
            field: "eventName" as const,
            validation: (value: string) => value.length >= 3,
            errorMessage: "Le nom de l'événement doit contenir au moins 3 caractères",
            defaultValue: (data: Partial<Step>) => data.eventName || "",
            onChange: (value: string) => {
                setCurrentValue(slugify(value));
            },
            hint: "Cet identifiant sera utilisé pour suivre la progression de l'utilisateur"
        },
        {
            question: "Combien de fois l'utilisateur doit-il réussir pour valider ?",
            placeholder: "Ex: 1",
            field: "completionThreshold" as const,
            type: "number",
            validation: (value: string) => parseInt(value) >= 1,
            errorMessage: "Le nombre doit être supérieur à 0",
        },
    ];

    const currentQuestion = questions[currentStep];

    useEffect(() => {
        if (currentQuestion.defaultValue) {
            setCurrentValue(currentQuestion.defaultValue(stepData));
        } else {
            setCurrentValue("");
        }
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
                        {currentQuestion.hint && (
                            <p className="text-xs text-foreground/50">{currentQuestion.hint}</p>
                        )}
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
                    Annuler
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
                        Passer
                    </Button>
                )}
            </div>
        </motion.div>
    );
};

export function ObjectivesStepForm({ onStepsChange, initialSteps = [] }: ObjectivesStepFormProps) {
    const [steps, setSteps] = useState<Step[]>(initialSteps);
    const [isAddingStep, setIsAddingStep] = useState(false);

    const handleAddStep = (newStepData: Partial<Step>) => {
        const newStep: Step = {
            id: Math.random().toString(36).substr(2, 9),
            name: newStepData.name || "",
            description: newStepData.description || "",
            eventName: newStepData.eventName || "",
            completionThreshold: newStepData.completionThreshold || 1,
            completionRate: 0,
            usersCompleted: 0,
        };

        const updatedSteps = [...steps, newStep];
        setSteps(updatedSteps);
        onStepsChange(updatedSteps);
        setIsAddingStep(false);
    };

    const handleUpdateStep = (index: number, updatedStep: Step) => {
        const updatedSteps = [...steps];
        updatedSteps[index] = updatedStep;
        setSteps(updatedSteps);
        onStepsChange(updatedSteps);
    };

    return (
        <div className="space-y-4">
            <AnimatePresence mode="popLayout">
                {steps.map((step, index) => (
                    <StepItem
                        key={step.id}
                        step={step}
                        index={index}
                        onUpdate={(updatedStep) => handleUpdateStep(index, updatedStep)}
                    />
                ))}

                {isAddingStep && (
                    <ChatStep
                        onComplete={handleAddStep}
                        onCancel={() => setIsAddingStep(false)}
                    />
                )}
            </AnimatePresence>

            {!isAddingStep && (
                <motion.div layout>
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
                        Ajouter un objectif
                    </Button>
                </motion.div>
            )}
        </div>
    );
} 