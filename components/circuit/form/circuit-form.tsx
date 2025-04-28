'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, RotateCw, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const stepSchema = z.object({
    name: z.string(),
    points: z.number().optional(),
    actions: z.array(z.string()).optional(),
    objective: z.string().optional(),
});

export const circuitSchema = z.object({
    name: z.string().min(3, "Le nom du circuit doit contenir au moins 3 caractères"),
    type: z.enum(["points", "actions", "objective"]),
    description: z.string().max(500, "La description ne peut pas dépasser 500 caractères").optional(),
    steps: z.array(stepSchema),
});

export type CircuitFormData = z.infer<typeof circuitSchema>;

const circuitTypes = [
    {
        value: "points",
        label: "Système de points",
        description: "Créez un système de points personnalisé pour récompenser les actions de vos utilisateurs et stimuler leur engagement à long terme.",
        icon: Star,
    },
    {
        value: "actions",
        label: "Suivi d'actions",
        description: "Définissez des actions clés à suivre et encouragez leur répétition pour créer des habitudes d'utilisation durables.",
        icon: RotateCw,
    },
    {
        value: "objective",
        label: "Parcours d'objectifs",
        description: "Construisez un parcours progressif avec des objectifs à atteindre et des récompenses à débloquer à chaque étape.",
        icon: Target,
    },
];

export function CircuitForm({
    defaultValues,
    onSubmit,
}: {
    defaultValues?: Partial<CircuitFormData>;
    onSubmit: (data: CircuitFormData) => Promise<void>;
}) {
    const form = useForm<CircuitFormData>({
        resolver: zodResolver(circuitSchema),
        defaultValues: {
            name: defaultValues?.name ?? "",
            type: defaultValues?.type ?? "points",
            description: defaultValues?.description ?? "",
            steps: defaultValues?.steps ?? [],
        },
    });

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = form;

    const selectedType = watch("type");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-12">
            <div className="space-y-8">
                <div className="space-y-2 max-w-2xl">
                    <h2 className="text-2xl font-bold text-foreground">Informations du circuit</h2>
                    <p className="text-lg text-muted-foreground">
                        Donnez un nom et une description à votre circuit pour le retrouver facilement
                    </p>
                </div>

                <div className="grid gap-8 max-w-2xl">
                    <div className="space-y-3">
                        <label htmlFor="name" className="block text-sm font-medium text-foreground">
                            Nom du circuit
                        </label>
                        <Input
                            id="name"
                            placeholder="Ex: Onboarding utilisateur, Programme fidélité..."
                            className="bg-card border-primary/20 focus:border-primary/40 placeholder:text-foreground/50"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-3">
                        <label htmlFor="description" className="block text-sm font-medium text-foreground">
                            Description
                        </label>
                        <Textarea
                            id="description"
                            placeholder="Décrivez le but de ce circuit et comment il va engager vos utilisateurs..."
                            className="min-h-[120px] bg-card border-primary/20 focus:border-primary/40 placeholder:text-foreground/50"
                            {...register("description")}
                        />
                        {errors.description && (
                            <p className="text-sm text-destructive">{errors.description.message}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">Type de circuit</h2>
                    <p className="text-lg text-muted-foreground">
                        Choisissez le type qui correspond le mieux à votre stratégie d&apos;engagement
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {circuitTypes.map((type) => (
                        <button
                            key={type.value}
                            type="button"
                            onClick={() => setValue("type", type.value as "points" | "actions" | "objective")}
                            className={cn(
                                "flex flex-col items-center text-center p-6 rounded-xl border transition-all duration-200",
                                "hover:border-primary/40 hover:bg-card",
                                selectedType === type.value
                                    ? "border-secondary bg-card"
                                    : "border-primary/20 bg-card"
                            )}
                        >
                            <div className={cn(
                                "p-4 rounded-full mb-4",
                                selectedType === type.value
                                    ? "bg-secondary/20"
                                    : "bg-primary/10"
                            )}>
                                <type.icon className={cn(
                                    "w-8 h-8",
                                    selectedType === type.value
                                        ? "text-secondary"
                                        : "text-primary/60"
                                )} />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{type.label}</h3>
                            <p className="text-sm text-foreground/70">{type.description}</p>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={!selectedType || isSubmitting}
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium px-8"
                >
                    Créer le circuit
                </Button>
            </div>
        </form>
    );
} 