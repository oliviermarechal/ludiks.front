'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, RotateCw, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const circuitSchema = z.object({
    name: z.string().min(3, "Le nom du circuit doit contenir au moins 3 caractères"),
    type: z.enum(["points", "actions", "objective"]),
    description: z.string().max(500, "La description ne peut pas dépasser 500 caractères").optional(),
});

export type CircuitFormData = z.infer<typeof circuitSchema>;

interface InformationsStepFormProps {
    onSubmit: () => void;
    initialData: CircuitFormData;
    onChange: (data: CircuitFormData) => void;
}

export function InformationsStepForm({ onSubmit, initialData, onChange }: InformationsStepFormProps) {
    const form = useForm<CircuitFormData>({
        resolver: zodResolver(circuitSchema),
        defaultValues: initialData,
    });

    const handleSubmit = (data: CircuitFormData) => {
        onChange(data);
        onSubmit();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">Informations du parcours</h2>
                    <p className="text-lg text-muted-foreground">
                        Configurez les informations de base de votre parcours
                    </p>
                </div>

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom du parcours</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: Parcours d'onboarding" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Décrivez votre parcours en quelques mots..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type de parcours</FormLabel>
                            <div className="grid grid-cols-3 gap-4">
                                <Button
                                    type="button"
                                    variant={field.value === "points" ? "default" : "outline"}
                                    className={cn(
                                        "h-24 flex flex-col items-center justify-center gap-2",
                                        field.value === "points" && "border-2 border-primary"
                                    )}
                                    onClick={() => field.onChange("points")}
                                >
                                    <Star className="h-8 w-8" />
                                    <span>Points</span>
                                </Button>

                                <Button
                                    type="button"
                                    variant={field.value === "actions" ? "default" : "outline"}
                                    className={cn(
                                        "h-24 flex flex-col items-center justify-center gap-2",
                                        field.value === "actions" && "border-2 border-primary"
                                    )}
                                    onClick={() => field.onChange("actions")}
                                >
                                    <RotateCw className="h-8 w-8" />
                                    <span>Actions</span>
                                </Button>

                                <Button
                                    type="button"
                                    variant={field.value === "objective" ? "default" : "outline"}
                                    className={cn(
                                        "h-24 flex flex-col items-center justify-center gap-2",
                                        field.value === "objective" && "border-2 border-primary"
                                    )}
                                    onClick={() => field.onChange("objective")}
                                >
                                    <Target className="h-8 w-8" />
                                    <span>Objectifs</span>
                                </Button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
} 