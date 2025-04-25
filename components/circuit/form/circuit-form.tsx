'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, RotateCw, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const circuitSchema = z.object({
    name: z.string().min(3, "Le nom du circuit doit contenir au moins 3 caractères"),
    type: z.enum(["points", "actions", "objective"]),
    description: z.string().max(500, "La description ne peut pas dépasser 500 caractères").optional(),
});

export type CircuitFormData = z.infer<typeof circuitSchema>;

interface CircuitFormProps {
    onSubmit: (data: CircuitFormData) => Promise<void>;
}

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

export function CircuitForm({ onSubmit }: CircuitFormProps) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<CircuitFormData>({
        resolver: zodResolver(circuitSchema),
    });

    const selectedType = watch("type");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-12">
            <div className="space-y-8">
                <div className="space-y-2 max-w-2xl">
                    <h2 className="text-2xl font-bold text-white">Informations du circuit</h2>
                    <p className="text-lg text-white/70">
                        Donnez un nom et une description à votre circuit pour le retrouver facilement
                    </p>
                </div>

                <div className="grid gap-8 max-w-2xl">
                    <div className="space-y-3">
                        <label htmlFor="name" className="block text-sm font-medium text-white">
                            Nom du circuit
                        </label>
                        <Input
                            id="name"
                            placeholder="Ex: Onboarding utilisateur, Programme fidélité..."
                            className="bg-black/40 border-primary/20 focus:border-primary/40 placeholder:text-white/30"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-3">
                        <label htmlFor="description" className="block text-sm font-medium text-white">
                            Description
                        </label>
                        <Textarea
                            id="description"
                            placeholder="Décrivez le but de ce circuit et comment il va engager vos utilisateurs..."
                            className="min-h-[120px] bg-black/40 border-primary/20 focus:border-primary/40 placeholder:text-white/30"
                            {...register("description")}
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500">{errors.description.message}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">Type de circuit</h2>
                    <p className="text-lg text-white/70">
                        Choisissez le type qui correspond le mieux à votre stratégie d'engagement
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {circuitTypes.map((type) => (
                        <button
                            key={type.value}
                            type="button"
                            onClick={() => setValue("type", type.value as "points" | "actions" | "objective")}
                            className={cn(
                                "flex flex-col items-start text-left p-6 rounded-xl border transition-all duration-200",
                                "hover:border-primary/40 hover:bg-black/40",
                                selectedType === type.value
                                    ? "border-secondary bg-black/40 ring-2 ring-secondary ring-offset-2 ring-offset-background"
                                    : "border-primary/20 bg-black/20"
                            )}
                        >
                            <div className={cn(
                                "p-3 rounded-lg mb-4",
                                selectedType === type.value
                                    ? "bg-secondary/20"
                                    : "bg-primary/10"
                            )}>
                                <type.icon className={cn(
                                    "w-6 h-6",
                                    selectedType === type.value
                                        ? "text-secondary"
                                        : "text-primary/60"
                                )} />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">{type.label}</h3>
                            <p className="text-sm text-white/70">{type.description}</p>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={!selectedType || isSubmitting}
                    className="bg-secondary hover:bg-secondary/90 text-black font-medium px-8"
                >
                    Créer le circuit
                </Button>
            </div>
        </form>
    );
} 