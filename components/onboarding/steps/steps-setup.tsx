import { useState, useMemo } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowRight, Plus, Trash2, Wand2 } from "lucide-react"
import { CircuitStep, CircuitType } from "@/lib/types/circuit"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import * as Tabs from '@radix-ui/react-tabs'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { cn } from "@/lib/utils"

const stepSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  completionThreshold: z.number().min(1, "Le seuil doit être supérieur à 0"),
})

const manualStepsSchema = z.object({
  steps: z.array(stepSchema).min(1, "Ajoutez au moins une étape"),
})

const generatorSchema = z.object({
  numberOfSteps: z.number().min(2, "Il faut au moins 2 étapes").max(100, "Maximum 100 étapes"),
  curve: z.enum(["linear", "power", "logarithmic"]),
  maxValue: z.number().min(1, "La valeur maximale doit être supérieure à 0"),
  exponent: z.number().min(1.5).max(2.5).optional(),
})

type ManualStepsFormData = z.infer<typeof manualStepsSchema>
type GeneratorFormData = z.infer<typeof generatorSchema>

interface StepsSetupProps {
  onNext: (data: CircuitStep[]) => void
  onBack: () => void
  circuitName: string
  circuitType: CircuitType
}

function generateSteps(data: GeneratorFormData): CircuitStep[] {
  const { numberOfSteps, curve, maxValue, exponent } = data
  const steps: CircuitStep[] = []

  for (let i = 0; i < numberOfSteps; i++) {
    let threshold: number

    switch (curve) {
      case "linear":
        threshold = Math.round((maxValue / (numberOfSteps - 1)) * i)
        break
      case "power":
        threshold = Math.round(maxValue * Math.pow(i / (numberOfSteps - 1), exponent || 2))
        break
      case "logarithmic":
        threshold = Math.round(maxValue * Math.log(1 + (9 * i) / (numberOfSteps - 1)) / Math.log(10))
        break
    }

    steps.push({
      name: `Niveau ${i + 1}`,
      description: ``,
      eventName: "",
      completionThreshold: Math.max(1, threshold),
    })
  }

  return steps
}

function StepPreviewChart({ steps }: { steps: CircuitStep[] }) {
  const data = steps.map((step, index) => ({
    name: `Étape ${index + 1}`,
    value: step.completionThreshold
  }))

  return (
    <ChartContainer
      className="h-48 w-full [&>div]:!w-full"
      config={{
        value: {
          theme: {
            light: "var(--secondary)",
            dark: "var(--secondary)"
          }
        }
      }}
    >
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border/10" />
        <XAxis
          dataKey="name"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
          className="text-foreground/50"
        />
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
          className="text-foreground/50"
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--secondary)"
          fillOpacity={1}
          fill="url(#colorValue)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  )
}

export function StepsSetup({ onNext, circuitName, circuitType }: StepsSetupProps) {
  const [mode, setMode] = useState<"manual" | "generator">("manual")
  const eventName = circuitName.toLowerCase().replace(/[^a-z0-9]/g, "_")

  const {
    register: registerManual,
    control,
    handleSubmit: handleManualSubmit,
    formState: { errors: manualErrors },
    reset: resetManual,
    watch: watchManual,
  } = useForm<ManualStepsFormData>({
    resolver: zodResolver(manualStepsSchema),
    defaultValues: {
      steps: [{ completionThreshold: 1 }],
    },
  })

  const {
    register: registerGenerator,
    watch: watchGenerator,
    handleSubmit: handleGeneratorFormSubmit,
    formState: { errors: generatorErrors },
    setValue: setGeneratorValue,
    reset: resetGenerator,
  } = useForm<GeneratorFormData>({
    resolver: zodResolver(generatorSchema),
    defaultValues: {
      numberOfSteps: 5,
      curve: "power",
      maxValue: 100,
      exponent: 2,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  })

  const handleModeChange = (value: string) => {
    if (value === "manual") {
      resetManual({ steps: [{ completionThreshold: 1 }] })
    } else {
      resetGenerator({
        numberOfSteps: 5,
        curve: "power",
        maxValue: 100,
        exponent: 2,
      })
    }
    setMode(value as "manual" | "generator")
  }

  const handleManualStepsSubmit = (data: ManualStepsFormData) => {
    const steps = data.steps.map((step, index) => ({
      name: step.name || `Niveau ${index + 1}`,
      description: step.description || ``,
      eventName,
      completionThreshold: step.completionThreshold,
    }))
    onNext(steps)
  }

  const handleGeneratorSubmit = (data: GeneratorFormData) => {
    const steps = generateSteps(data).map(step => ({
      ...step,
      eventName,
    }))
    onNext(steps)
  }

  // Preview des étapes générées
  const generatorValues = watchGenerator()
  const manualSteps = watchManual("steps")
  
  const previewSteps = useMemo(() => {
    if (mode === "generator") {
      return generateSteps(generatorValues)
    }
    // En mode manuel, on ne montre la preview que s'il y a plus d'une étape
    return fields.length > 1 ? fields.map((field, index) => ({
      name: `Niveau ${index + 1}`,
      description: "",
      eventName,
      completionThreshold: manualSteps[index]?.completionThreshold || 0,
    })) : []
  }, [mode, generatorValues, fields, eventName, manualSteps])

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Configurez les étapes de progression
        </h2>
        <p className="text-foreground/70">
          {circuitType === "points"
            ? "Définissez les paliers de points à atteindre"
            : "Définissez le nombre d'actions à répéter"}
        </p>
      </div>

      <Tabs.Root value={mode} onValueChange={handleModeChange}>
        <Tabs.List className="flex rounded-lg overflow-hidden mb-8">
          <Tabs.Trigger 
            value="manual" 
            className={cn(
              "flex-1 py-2 px-4 text-sm font-medium border transition-all duration-200",
              "hover:border-primary/40 hover:bg-black/40",
              mode === "manual"
                ? "border-secondary bg-black/40"
                : "border-primary/20 bg-black/20"
            )}
          >
            Configuration manuelle
          </Tabs.Trigger>
          <Tabs.Trigger 
            value="generator" 
            className={cn(
              "flex-1 py-2 px-4 text-sm font-medium border transition-all duration-200",
              "hover:border-primary/40 hover:bg-black/40",
              mode === "generator"
                ? "border-secondary bg-black/40"
                : "border-primary/20 bg-black/20",
              "flex items-center justify-center gap-1.5"
            )}
          >
            <Wand2 className="w-3.5 h-3.5" />
            Générateur d&apos;étapes
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="manual">
          <form onSubmit={handleManualSubmit(handleManualStepsSubmit)} className="space-y-6">
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-4 p-4 rounded-lg border border-primary/20 bg-black/20 hover:border-primary/40 hover:bg-black/40 transition-all duration-200">
                  <div className="w-16 shrink-0 font-medium text-foreground/70">
                    Étape {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <Input
                      type="number"
                      min={1}
                      {...registerManual(`steps.${index}.completionThreshold`, { valueAsNumber: true })}
                      placeholder={`${circuitType === "points" ? "Points" : "Actions"} requis`}
                      className="bg-black/40 border-primary/20 focus:border-primary/40 placeholder:text-foreground/50"
                    />
                    {manualErrors.steps?.[index]?.completionThreshold && (
                      <p className="text-sm text-red-500 mt-1">
                        {manualErrors.steps[index]?.completionThreshold?.message}
                      </p>
                    )}
                  </div>

                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-500/10 shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() => append({ completionThreshold: Math.max(1, fields[fields.length - 1]?.completionThreshold || 0) + 10 })}
                className={cn(
                  "w-full",
                  "bg-transparent hover:bg-primary/5",
                  "border border-primary/20 hover:border-primary/40",
                  "transition-colors"
                )}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une étape
              </Button>
            </div>
            {fields.length > 1 && (
              <div className="space-y-2">
                <Label>Aperçu de la progression</Label>
                <StepPreviewChart steps={previewSteps} />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {previewSteps.map((step, index) => (
                    <div key={index} className="text-sm text-secondary/70">
                      Étape {index + 1}: {step.completionThreshold} {circuitType === "points" ? "points" : "actions"}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className={cn(
                  "flex-1 flex items-center justify-center",
                  "bg-transparent hover:bg-primary/5",
                  "border border-primary/20 hover:border-primary/40",
                  "text-sm font-medium rounded-md py-2 px-4",
                  "transition-colors"
                )}
              >
                Passer l&apos;onboarding
              </Link>
              <Button 
                type="submit"
                className="flex-1 bg-secondary hover:bg-secondary/90 text-black font-medium"
              >
                Continuer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Tabs.Content>

        <Tabs.Content value="generator">
          <form onSubmit={handleGeneratorFormSubmit(handleGeneratorSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Nombre d&apos;étapes</Label>
                <Input
                  type="number"
                  min={2}
                  max={100}
                  {...registerGenerator("numberOfSteps", { valueAsNumber: true })}
                  className="bg-black/40 border-primary/20 focus:border-primary/40 placeholder:text-foreground/50"
                />
                {generatorErrors.numberOfSteps && (
                  <p className="text-sm text-red-500">{generatorErrors.numberOfSteps.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Valeur maximale</Label>
                <Input
                  type="number"
                  min={1}
                  {...registerGenerator("maxValue", { valueAsNumber: true })}
                  className="bg-black/40 border-primary/20 focus:border-primary/40 placeholder:text-foreground/50"
                />
                {generatorErrors.maxValue && (
                  <p className="text-sm text-red-500">{generatorErrors.maxValue.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Type de progression</Label>
                <Select 
                  defaultValue={generatorValues.curve}
                  onValueChange={(value) => setGeneratorValue("curve", value as "linear" | "power" | "logarithmic")}
                >
                  <SelectTrigger className="bg-black/40 border-primary/20 focus:border-primary/40">
                    <SelectValue placeholder="Choisissez un type de progression" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linéaire</SelectItem>
                    <SelectItem value="power">Exponentielle</SelectItem>
                    <SelectItem value="logarithmic">Logarithmique</SelectItem>
                  </SelectContent>
                </Select>
                {generatorErrors.curve && (
                  <p className="text-sm text-red-500">{generatorErrors.curve.message}</p>
                )}
              </div>

              {generatorValues.curve === "power" && (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Exposant</Label>
                    <span className="text-secondary">
                      {generatorValues.exponent?.toFixed(2)}
                    </span>
                  </div>
                  <Slider
                    min={1.5}
                    max={2.5}
                    step={0.1}
                    value={[generatorValues.exponent || 2]}
                    onValueChange={([value]) => setGeneratorValue("exponent", value)}
                    className="py-4"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Aperçu de la progression</Label>
              <StepPreviewChart steps={previewSteps} />
              <div className="grid grid-cols-2 gap-4 mt-4">
                {previewSteps.map((step, index) => (
                  <div key={index} className="text-sm text-secondary/70">
                    Étape {index + 1}: {step.completionThreshold} {circuitType === "points" ? "points" : "actions"}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className={cn(
                  "flex-1 flex items-center justify-center",
                  "bg-transparent hover:bg-primary/5",
                  "border border-primary/20 hover:border-primary/40",
                  "text-sm font-medium rounded-md py-2 px-4",
                  "transition-colors"
                )}
              >
                Passer l&apos;onboarding
              </Link>
              <Button 
                type="submit"
                className="flex-1 bg-secondary hover:bg-secondary/90 text-black font-medium"
              >
                Générer les étapes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
} 