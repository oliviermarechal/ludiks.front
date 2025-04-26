import { useState } from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Wand2, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StepPreviewChart } from "@/components/circuit/chart/step-preview-chart";

interface GeneratorStep {
    question: string;
    placeholder: string;
    field: keyof GeneratorFormData;
    type?: "number" | "select";
    options?: { value: string; label: string; }[];
    validation: (value: number | string) => boolean;
    errorMessage?: string;
    hint?: string;
}

interface Step {
    id: string;
    name: string;
    description: string;
    completionRate: number;
    completionThreshold: number;
    usersCompleted: number;
    eventName: string;
}

interface StepGeneratorProps {
    isOpen: boolean;
    onClose: () => void;
    onGenerate: (values: GeneratorFormData) => void;
    type: "points" | "actions";
    circuitName: string;
}

export interface GeneratorFormData {
    numberOfSteps: number;
    curve: "linear" | "power" | "logarithmic";
    maxValue: number;
    startValue: number;
    exponent?: number;
}

export function generatePreviewSteps(values: GeneratorFormData, circuitName: string, type: "points" | "actions"): Step[] {
    const { numberOfSteps, curve, maxValue, startValue, exponent } = values;
    const steps: Step[] = [];
    const baseEventName = circuitName.toLowerCase().replace(/[^a-z0-9]/g, "_");
    const actionWord = type === "points" ? "points" : "actions";

    for (let i = 0; i < numberOfSteps; i++) {
        let threshold: number;

        if (i === 0) {
            threshold = startValue;
        } else {
            const progress = (i) / (numberOfSteps - 1);
            switch (curve) {
                case "linear":
                    threshold = Math.round(startValue + (maxValue - startValue) * progress);
                    break;
                case "power":
                    threshold = Math.round(startValue + (maxValue - startValue) * Math.pow(progress, exponent || 2));
                    break;
                case "logarithmic":
                    threshold = Math.round(startValue + (maxValue - startValue) * Math.log(1 + 9 * progress) / Math.log(10));
                    break;
            }
        }

        steps.push({
            id: `${i}`,
            name: `${circuitName} niveau ${i + 1}`,
            description: `${type === "points" ? "Atteindre" : "Effectuer"} ${Math.max(1, threshold)} ${actionWord}`,
            completionRate: 0,
            completionThreshold: Math.max(1, threshold),
            usersCompleted: 0,
            eventName: `${baseEventName}_level_${i + 1}`,
        });
    }

    return steps;
}

export function StepGenerator({ isOpen, onClose, onGenerate, type, circuitName }: StepGeneratorProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [showPreview, setShowPreview] = useState(false);
    const [values, setValues] = useState<GeneratorFormData>({
        numberOfSteps: 5,
        maxValue: 100,
        startValue: 1,
        curve: "power",
        exponent: 2,
    });

    const steps: GeneratorStep[] = [
        {
            question: `Combien de ${type === "points" ? "niveaux" : "paliers"} souhaitez-vous créer ?`,
            placeholder: "Ex: 5",
            field: "numberOfSteps",
            type: "number",
            validation: (value) => typeof value === "number" && value >= 2 && value <= 100,
            errorMessage: "Le nombre doit être entre 2 et 100",
            hint: "Un bon parcours contient généralement entre 3 et 7 étapes"
        },
        {
            question: type === "points" 
                ? "Combien de points faut-il pour le premier niveau ?"
                : "Combien d'actions faut-il pour le premier palier ?",
            placeholder: "Ex: 1",
            field: "startValue",
            type: "number",
            validation: (value) => typeof value === "number" && value >= 1,
            errorMessage: "La valeur doit être supérieure à 0",
            hint: "Cette valeur représente l'objectif initial du parcours"
        },
        {
            question: type === "points" 
                ? "Quel est le nombre maximum de points à atteindre ?"
                : "Quel est le nombre maximum de répétitions à effectuer ?",
            placeholder: "Ex: 100",
            field: "maxValue",
            type: "number",
            validation: (value) => typeof value === "number" && value >= values.startValue,
            errorMessage: "La valeur doit être supérieure à la valeur de départ",
            hint: type === "points" 
                ? "Cette valeur représente le nombre total de points pour le dernier niveau"
                : "Cette valeur représente le nombre d'actions à effectuer pour le dernier palier"
        },
        {
            question: "Quel type de progression souhaitez-vous ?",
            placeholder: "Choisissez un type",
            field: "curve",
            type: "select",
            options: [
                { value: "linear", label: "Linéaire (progression régulière)" },
                { value: "power", label: "Exponentielle (progression de plus en plus difficile)" },
                { value: "logarithmic", label: "Logarithmique (progression de plus en plus facile)" }
            ],
            validation: () => true,
            hint: "La courbe de progression détermine la difficulté entre chaque étape"
        }
    ];

    const currentQuestion = steps[currentStep];
    const previewSteps = generatePreviewSteps(values, circuitName, type);

    const handleNext = () => {
        if (currentStep === steps.length - 1) {
            setShowPreview(true);
            return;
        }
        setCurrentStep(prev => prev + 1);
    };

    const handleValueChange = (value: number | string, field: keyof GeneratorFormData) => {
        if (field === "curve") {
            setValues(prev => ({ ...prev, [field]: value as "linear" | "power" | "logarithmic" }));
        } else if (field === "exponent") {
            setValues(prev => ({ ...prev, [field]: typeof value === "string" ? parseFloat(value) || 2 : value }));
        } else {
            setValues(prev => ({ ...prev, [field]: typeof value === "string" ? parseInt(value) || 0 : value }));
        }
    };

    const handleGenerate = () => {
        onGenerate(values);
        onClose();
        setCurrentStep(0);
        setShowPreview(false);
    };

    const handleBack = () => {
        if (showPreview) {
            setShowPreview(false);
            return;
        }
        if (currentStep === 0) {
            onClose();
            return;
        }
        setCurrentStep(prev => prev - 1);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-xl">
                <AnimatePresence mode="wait">
                    {!showPreview ? (
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6 py-4"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                                        <Wand2 className="h-5 w-5 text-secondary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            {currentQuestion.question}
                                        </h3>
                                        {currentQuestion.hint && (
                                            <p className="text-sm text-muted-foreground mt-0.5">
                                                {currentQuestion.hint}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    {currentQuestion.type === "select" ? (
                                        <Select
                                            value={values[currentQuestion.field]?.toString() || ""}
                                            onValueChange={(value) => handleValueChange(value, currentQuestion.field)}
                                        >
                                            <SelectTrigger className="flex-1">
                                                <SelectValue placeholder={currentQuestion.placeholder} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {currentQuestion.options?.map(option => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <Input
                                            type={currentQuestion.type}
                                            value={values[currentQuestion.field]?.toString() || ""}
                                            onChange={(e) => handleValueChange(
                                                currentQuestion.type === "number" ? parseInt(e.target.value) || 0 : e.target.value,
                                                currentQuestion.field
                                            )}
                                            placeholder={currentQuestion.placeholder}
                                            className="flex-1"
                                            min={currentQuestion.type === "number" ? 1 : undefined}
                                        />
                                    )}
                                    <Button 
                                        onClick={handleNext}
                                        disabled={!currentQuestion.validation(values[currentQuestion.field])}
                                        size="icon"
                                        className="h-10 w-10 bg-secondary hover:bg-secondary/90"
                                    >
                                        <ArrowRight className="h-5 w-5" />
                                    </Button>
                                </div>

                                {values.curve === "power" && currentStep === steps.length - 1 && (
                                    <div className="space-y-3 pt-4">
                                        <div className="flex justify-between items-center">
                                            <Label className="text-sm">Intensité de la progression</Label>
                                            <span className="text-sm text-secondary">
                                                {values.exponent?.toFixed(2)}
                                            </span>
                                        </div>
                                        <Slider
                                            min={1.5}
                                            max={2.5}
                                            step={0.1}
                                            value={[values.exponent || 2]}
                                            onValueChange={([value]) => handleValueChange(value, "exponent")}
                                            className="py-2"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Ajustez l&apos;intensité de la progression exponentielle
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center pt-4">
                                <Button
                                    variant="ghost"
                                    onClick={handleBack}
                                    className="text-sm"
                                >
                                    Retour
                                </Button>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">
                                        Étape {currentStep + 1} sur {steps.length}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6 py-4"
                        >
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold">Aperçu de la progression</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Vérifiez la répartition des {type === "points" ? "points" : "actions"} avant de valider
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <StepPreviewChart steps={previewSteps} />
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        {previewSteps.map((step, index) => (
                                            <div key={index} className="text-sm">
                                                <span className="text-muted-foreground">Niveau {index + 1}:</span>
                                                <br />
                                                <span className="text-secondary font-medium">
                                                    {step.completionThreshold} {type === "points" ? "points" : "actions"}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button
                                    variant="ghost"
                                    onClick={handleBack}
                                    className="text-sm"
                                >
                                    Modifier
                                </Button>
                                <Button
                                    onClick={handleGenerate}
                                    className="bg-secondary hover:bg-secondary/90"
                                >
                                    <Check className="h-4 w-4 mr-2" />
                                    Générer les niveaux
                                </Button>
                            </DialogFooter>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
} 