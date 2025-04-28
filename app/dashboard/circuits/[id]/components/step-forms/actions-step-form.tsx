import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Wand2, Sparkles } from "lucide-react";
import { StepPreviewChart } from "@/components/circuit/chart/step-preview-chart";
import { StepGenerator, generatePreviewSteps, GeneratorFormData } from "./step-generator";

const stepSchema = z.object({
    completionThreshold: z.number().min(1, "Le seuil doit être supérieur à 0"),
});

const manualStepsSchema = z.object({
    steps: z.array(stepSchema).min(1, "Ajoutez au moins une étape"),
});

type ManualStepsFormData = z.infer<typeof manualStepsSchema>;

interface Step {
    id: string;
    name: string;
    description: string;
    completionRate: number;
    completionThreshold: number;
    usersCompleted: number;
    eventName: string;
}

interface ActionsStepFormProps {
    circuitName: string;
    onStepsChange: (steps: Step[]) => void;
    initialSteps?: Step[];
}

export function ActionsStepForm({ circuitName, onStepsChange, initialSteps }: ActionsStepFormProps) {
    const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);

    const {
        register: registerManual,
        control,
        formState: { errors: manualErrors },
        watch: watchManual,
    } = useForm<ManualStepsFormData>({
        resolver: zodResolver(manualStepsSchema),
        defaultValues: {
            steps: initialSteps?.map(step => ({
                completionThreshold: step.completionThreshold,
            })) || [{ completionThreshold: 1 }],
        },
    });

    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: "steps",
    });

    const manualSteps = watchManual("steps");

    const previewSteps = fields.map((field, index) => ({
        id: `${index}`,
        name: `${circuitName} niveau ${index + 1}`,
        description: `Effectuer ${manualSteps[index]?.completionThreshold || 0} actions`,
        completionRate: 0,
        completionThreshold: manualSteps[index]?.completionThreshold || 0,
        usersCompleted: 0,
        eventName: `${circuitName.toLowerCase().replace(/[^a-z0-9]/g, "_")}_level_${index + 1}`,
    }));

    const handleStepsChange = () => {
        onStepsChange(previewSteps);
    };

    const handleGenerateSteps = (values: GeneratorFormData) => {
        const generatedSteps = generatePreviewSteps(values, circuitName, "actions");
        replace(generatedSteps.map(step => ({
            completionThreshold: step.completionThreshold
        })));
        handleStepsChange();
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Configuration des paliers</h3>
                <Button
                    variant="outline"
                    onClick={() => setIsGeneratorOpen(true)}
                    className="relative group  dark:!border-primary/40 dark:hover:!border-primary/60"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-md" />
                    <Wand2 className="w-4 h-4 mr-2 transition-transform duration-500 group-hover:scale-110" />
                    <span className="relative">
                        Générer des paliers
                    </span>
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                        <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
                    </div>
                </Button>
            </div>

            <div className="space-y-3 bg-card/50 rounded-lg p-4">
                {fields.map((field, index) => (
                    <div 
                        key={field.id} 
                        className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border hover:border-border/80 transition-colors duration-200"
                    >
                        <div className="w-16 shrink-0 text-sm text-muted-foreground">
                            Palier {index + 1}
                        </div>
                        
                        <div className="flex-1">
                            <Input
                                type="number"
                                min={1}
                                {...registerManual(`steps.${index}.completionThreshold`, { 
                                    valueAsNumber: true,
                                    onChange: handleStepsChange
                                })}
                                placeholder="Actions requises"
                                className="h-9 text-sm"
                            />
                            {manualErrors.steps?.[index]?.completionThreshold && (
                                <p className="text-xs text-destructive mt-1">
                                    {manualErrors.steps[index]?.completionThreshold?.message}
                                </p>
                            )}
                        </div>

                        {index > 0 && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    remove(index);
                                    handleStepsChange();
                                }}
                                className="text-destructive/70 hover:text-destructive hover:bg-destructive/10 h-9 w-9"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                ))}

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        append({ completionThreshold: Math.max(1, fields[fields.length - 1]?.completionThreshold || 0) + 10 });
                        handleStepsChange();
                    }}
                    className="w-full h-9 text-sm mt-2 border-border hover:border-border/80 dark:!border-primary/40 dark:hover:!border-primary/60"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un palier
                </Button>
            </div>

            {previewSteps.length > 1 && (
                <div className="space-y-4">
                    <div className="space-y-1">
                        <h3 className="font-medium">Aperçu de la progression</h3>
                        <p className="text-sm text-muted-foreground">
                            Visualisez la courbe de progression des actions à effectuer
                        </p>
                    </div>
                    <div className="bg-card/50 rounded-lg p-4">
                        <StepPreviewChart steps={previewSteps} />
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                            {previewSteps.map((step, index) => (
                                <div key={index} className="text-sm bg-card p-2 rounded-md border border-border/60">
                                    <span className="text-muted-foreground">Palier {index + 1}:</span>
                                    <br />
                                    <span className="text-secondary font-medium">
                                        {step.completionThreshold} actions
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <StepGenerator
                isOpen={isGeneratorOpen}
                onClose={() => setIsGeneratorOpen(false)}
                onGenerate={handleGenerateSteps}
                type="actions"
                circuitName={circuitName}
            />
        </div>
    );
} 