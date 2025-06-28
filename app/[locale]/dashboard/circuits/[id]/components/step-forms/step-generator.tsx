import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Wand2, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StepPreviewChart } from "@/components/circuit/chart/step-preview-chart";
import { useTranslations } from "next-intl";

interface GeneratorStep {
    question: string;
    placeholder: string;
    field: keyof GeneratorFormData;
    type?: "number" | "select" | "range";
    options?: { value: string; label: string; }[];
    validation: (value: number | string | undefined) => boolean;
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

export function generatePreviewSteps(
    values: GeneratorFormData, 
    circuitName: string, 
    t: (key: string, values?: Record<string, string | number>) => string
): Step[] {
    const { numberOfSteps, curve, maxValue, startValue, exponent } = values;
    const steps: Step[] = [];
    const baseEventName = circuitName.toLowerCase().replace(/[^a-z0-9]/g, "_");

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
            name: t('step.name', { circuitName, index: i + 1 }),
            description: t('step.description', { threshold: Math.max(1, threshold) }),
            completionRate: 0,
            completionThreshold: Math.max(1, threshold),
            usersCompleted: 0,
            eventName: `${baseEventName}`,
        });
    }

    return steps;
}

export function StepGenerator({ isOpen, onClose, onGenerate, type, circuitName }: StepGeneratorProps) {
    const t = useTranslations('dashboard.circuits.steps.generator');
    
    const formT = useTranslations('dashboard.circuits.steps.forms.' + type);
    const [currentStep, setCurrentStep] = useState(0);
    const [showPreview, setShowPreview] = useState(false);
    const [values, setValues] = useState<GeneratorFormData>({
        numberOfSteps: 3,
        maxValue: 100,
        startValue: 1,
        curve: "power",
        exponent: 2,
    });

    const steps: GeneratorStep[] = [
        {
            question: t('steps.count.question', { type: type === "points" ? "levels" : "levels" }),
            placeholder: t('steps.count.placeholder'),
            field: "numberOfSteps",
            type: "number",
            validation: (value) => typeof value === "number" && value >= 2 && value <= 100,
            errorMessage: t('steps.count.error'),
            hint: t('steps.count.hint')
        },
        {
            question: t('steps.range.question', { type: type === "points" ? "points" : "actions" }),
            placeholder: t('steps.range.placeholder'),
            field: "startValue",
            type: "range",
            validation: (value) => typeof value === "number" && value >= 1 && values.maxValue > values.startValue,
            errorMessage: t('steps.range.error'),
            hint: t('steps.range.hint', { 
                type: type === "points" ? "points" : "actions",
                level: type === "points" ? "level" : "level"
            })
        }
    ];

    const currentQuestion = steps[currentStep];
    const previewSteps = generatePreviewSteps(values, circuitName, formT);

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
            <DialogContent className="sm:max-w-3xl">
                <DialogTitle className="sr-only">
                    {t('title.' + type)}
                </DialogTitle>
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
                                            value={(values[currentQuestion.field]?.toString() || "").toString()}
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
                                    ) : currentQuestion.type === "range" ? (
                                        <div className="flex-1 space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>{t('steps.range.start')}</Label>
                                                    <Input
                                                        type="number"
                                                        value={values.startValue}
                                                        onChange={(e) => handleValueChange(parseInt(e.target.value) || 1, "startValue")}
                                                        placeholder={t('steps.range.placeholder')}
                                                        min={1}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>{t('steps.range.max')}</Label>
                                                    <Input
                                                        type="number"
                                                        value={values.maxValue}
                                                        onChange={(e) => handleValueChange(parseInt(e.target.value) || 100, "maxValue")}
                                                        placeholder={t('steps.range.placeholder')}
                                                        min={values.startValue + 1}
                                                    />
                                                </div>
                                            </div>
                                        </div>
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
                                        disabled={
                                            currentQuestion.type === "range" 
                                                ? !currentQuestion.validation(values.startValue) || values.maxValue <= values.startValue
                                                : !currentQuestion.validation(values[currentQuestion.field] as number | string)
                                        }
                                        size="icon"
                                        className="h-10 w-10 bg-secondary hover:bg-secondary/90"
                                    >
                                        <ArrowRight className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4">
                                <Button
                                    variant="ghost"
                                    onClick={handleBack}
                                    className="text-sm"
                                >
                                    {t('navigation.back')}
                                </Button>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">
                                        {t('navigation.step', { current: currentStep + 1, total: steps.length })}
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
                                    <h3 className="text-lg font-semibold">{t('preview.title')}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {t('preview.description')}
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-base">{t('progression.title')}</Label>
                                            <Select
                                                value={values.curve}
                                                onValueChange={(value) => handleValueChange(value, "curve")}
                                            >
                                                <SelectTrigger className="h-12 bg-secondary/5">
                                                    <SelectValue placeholder={t('progression.placeholder')} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {[
                                                        { value: "linear", label: t('progression.types.linear') },
                                                        { value: "power", label: t('progression.types.power') },
                                                        { value: "logarithmic", label: t('progression.types.logarithmic') }
                                                    ].map(option => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <p className="text-xs text-muted-foreground">
                                                {t('progression.hint')}
                                            </p>
                                        </div>

                                        {values.curve === "power" && (
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <Label className="text-sm">{t('progression.intensity.label')}</Label>
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
                                                    {t('progression.intensity.hint')}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        <StepPreviewChart steps={previewSteps} />
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {previewSteps.map((step, index) => (
                                                <div 
                                                    key={index} 
                                                    className="p-3 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
                                                >
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-sm font-medium text-muted-foreground">
                                                            {t('preview.level', { index: index + 1 })}
                                                        </span>
                                                    </div>
                                                    <div className="text-lg font-semibold text-secondary">
                                                        {type === "points" 
                                                            ? t('preview.points', { value: step.completionThreshold })
                                                            : t('preview.actions', { value: step.completionThreshold })
                                                        }
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button
                                    variant="ghost"
                                    onClick={handleBack}
                                    className="text-sm"
                                >
                                    {t('navigation.modify')}
                                </Button>
                                <Button
                                    onClick={handleGenerate}
                                    className="bg-secondary hover:bg-secondary/90"
                                >
                                    <Check className="h-4 w-4 mr-2" />
                                    {t(`navigation.generate.${type}`)}
                                </Button>
                            </DialogFooter>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
} 