'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, RotateCw, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function CircuitForm({
    defaultValues,
    onSubmit,
}: {
    defaultValues?: Partial<CircuitFormData>;
    onSubmit: (data: CircuitFormData) => Promise<void>;
}) {
    const t = useTranslations('dashboard.circuits.common');

    const circuitSchema = z.object({
        name: z.string().min(3, t('form.validation.name.minLength')),
        type: z.enum(["points", "actions", "objective"]),
        steps: z.array(z.object({
            name: z.string(),
            points: z.number().optional(),
            actions: z.array(z.string()).optional(),
            objective: z.string().optional(),
        })),
    });

    const form = useForm<CircuitFormData>({
        resolver: zodResolver(circuitSchema),
        defaultValues: {
            name: defaultValues?.name ?? "",
            type: defaultValues?.type ?? "points",
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

    const circuitTypes = [
        {
            value: "points",
            icon: Star,
        },
        {
            value: "actions",
            icon: RotateCw,
        },
        {
            value: "objective",
            icon: Target,
        },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-12">
            <div className="space-y-8">
                <div className="space-y-2 max-w-2xl">
                    <h2 className="text-2xl font-bold text-foreground">{t('form.info.title')}</h2>
                    <p className="text-lg text-muted-foreground">
                        {t('form.info.subtitle')}
                    </p>
                </div>

                <div className="grid gap-8 max-w-2xl">
                    <div className="space-y-3">
                        <label htmlFor="name" className="block text-sm font-medium text-foreground">
                            {t('form.info.name.label')}
                        </label>
                        <Input
                            id="name"
                            placeholder={t('form.info.name.placeholder')}
                            className="bg-card border-primary/20 focus:border-primary/40 placeholder:text-foreground/50"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">{t('form.type.title')}</h2>
                    <p className="text-lg text-muted-foreground">
                        {t('form.type.subtitle')}
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
                            <h3 className="text-lg font-semibold mb-2">{t(`form.type.${type.value}.label`)}</h3>
                            <p className="text-sm text-foreground/70">{t(`form.type.${type.value}.description`)}</p>
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
                    {t('form.submit')}
                </Button>
            </div>
        </form>
    );
}

export type CircuitFormData = {
    name: string;
    type: "points" | "actions" | "objective";
    steps: Array<{
        name: string;
        points?: number;
        actions?: string[];
        objective?: string;
    }>;
}; 