import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { PointsStepForm } from "./step-forms/points-step-form";
import { ActionsStepForm } from "./step-forms/actions-step-form";
import { ObjectivesStepForm } from "./step-forms/objectives-step-form";

interface Step {
    id: string;
    name: string;
    description: string;
    completionRate: number;
    completionThreshold: number;
    usersCompleted: number;
    eventName: string;
}

interface Circuit {
    id: string;
    name: string;
    description: string;
    type: 'objective' | 'points' | 'actions';
    steps: Step[];
}

interface SettingsTabProps {
    circuit: Circuit;
}

const circuitSchema = z.object({
    name: z.string().min(3, "Le nom du parcours doit contenir au moins 3 caractères"),
    description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
});

type CircuitFormData = z.infer<typeof circuitSchema>;

export function SettingsTab({ circuit }: SettingsTabProps) {
    const [steps, setSteps] = useState<Step[]>(circuit.steps);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CircuitFormData>({
        resolver: zodResolver(circuitSchema),
        defaultValues: {
            name: circuit.name,
            description: circuit.description,
        },
    });

    const handleFormSubmit = (data: CircuitFormData) => {
        // TODO: Implémenter la sauvegarde
        console.log("Form submitted:", { ...data, steps });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">Configuration du parcours</h2>
                    <p className="text-foreground/70">
                        {circuit.type === "points"
                            ? "Définissez les paliers de points à atteindre"
                            : circuit.type === "actions"
                                ? "Définissez le nombre de répétitions à accomplir"
                                : "Définissez les objectifs que vos utilisateurs devront accomplir"}
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
                    <div className="grid gap-6 p-6 rounded-xl border border-primary/20 bg-surface-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nom du parcours</Label>
                            <Input
                                id="name"
                                {...register("name")}
                                className="border-primary/20 focus:border-primary/40"
                                placeholder="Ex: Onboarding Utilisateur"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                {...register("description")}
                                className="border-primary/20 focus:border-primary/40"
                                placeholder="Décrivez le but de ce parcours de gamification"
                                rows={3}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-6 p-6 rounded-xl border border-primary/20 bg-surface-2">
                        {circuit.type === "points" && (
                            <PointsStepForm
                                circuitName={circuit.name}
                                onStepsChange={setSteps}
                                initialSteps={circuit.steps}
                            />
                        )}
                        {circuit.type === "actions" && (
                            <ActionsStepForm
                                circuitName={circuit.name}
                                onStepsChange={setSteps}
                                initialSteps={circuit.steps}
                            />
                        )}
                        {circuit.type === "objective" && (
                            <ObjectivesStepForm
                                circuitName={circuit.name}
                                onStepsChange={setSteps}
                                initialSteps={circuit.steps}
                            />
                        )}
                    </div>

                    <div className="flex gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                        >
                            Annuler
                        </Button>
                        <Button 
                            type="submit"
                            className="flex-1 bg-secondary hover:bg-secondary/90 text-black font-medium"
                        >
                            Sauvegarder les modifications
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
} 