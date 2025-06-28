import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Plus, Trash2, Wand2, ArrowLeft } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import * as Tabs from '@radix-ui/react-tabs'
import { Step, CircuitType } from "@/lib/types/circuit.types"
import { useTranslations } from "next-intl"

type CurveType = "linear" | "power" | "logarithmic"

interface GeneratorFormData {
  numberOfSteps: number
  maxValue: number
  startValue: number
  curve: CurveType
  exponent?: number
}

interface GeneratorStep {
  id: string
  question: string
  placeholder: string
  field: keyof GeneratorFormData
  type?: "number" | "select" | "range"
  options?: { value: string; label: string }[]
  validation: (value: number | string | undefined) => boolean
  errorMessage?: string
  hint?: string
}

interface StepsSetupProps {
  onNext: (data: Step[]) => void
  onBack: () => void
  circuitName: string
  circuitType: CircuitType
}

function createGeneratorSteps(t: (key: string, params?: Record<string, string>) => string, circuitType: CircuitType): GeneratorStep[] {
  return [
    {
      id: "numberOfSteps",
      question: t('stepsSetup.generator.steps.count.question', { type: circuitType === "points" ? "points" : "actions" }),
      placeholder: t('stepsSetup.generator.steps.count.placeholder'),
      field: "numberOfSteps",
      type: "number",
      validation: (value) => {
        const num = typeof value === "string" ? parseInt(value) : value
        return typeof num === "number" && !isNaN(num) && num >= 2 && num <= 100
      },
      errorMessage: t('stepsSetup.generator.steps.count.error'),
    },
    {
      id: "range",
      question: t('stepsSetup.generator.steps.range.question', { type: circuitType === "points" ? "points" : "actions" }),
      placeholder: t('stepsSetup.generator.steps.range.placeholder'),
      field: "startValue",
      type: "range",
      validation: () => true,
    },
    {
      id: "curve",
      question: t('stepsSetup.generator.steps.curve.question'),
      placeholder: t('stepsSetup.generator.steps.curve.placeholder'),
      field: "curve",
      type: "select",
      options: [
        { value: "linear", label: t('stepsSetup.generator.steps.curve.options.linear') },
        { value: "power", label: t('stepsSetup.generator.steps.curve.options.power') },
        { value: "logarithmic", label: t('stepsSetup.generator.steps.curve.options.logarithmic') },
      ],
      validation: (value) => ["linear", "power", "logarithmic"].includes(value as string),
    },
  ]
}

function generateSteps(data: GeneratorFormData): Step[] {
  const { numberOfSteps, curve, maxValue, startValue, exponent } = data
  const steps: Step[] = []

  for (let i = 0; i < numberOfSteps; i++) {
    let threshold: number
    const progress = i / (numberOfSteps - 1)

    switch (curve) {
      case "linear":
        threshold = Math.round(startValue + (maxValue - startValue) * progress)
        break
      case "power":
        threshold = Math.round(startValue + (maxValue - startValue) * Math.pow(progress, exponent || 2))
        break
      case "logarithmic":
        threshold = Math.round(startValue + (maxValue - startValue) * Math.log(1 + (9 * progress)) / Math.log(10))
        break
    }

    steps.push({
      id: `step_${i + 1}`,
      name: `Niveau ${i + 1}`,
      description: ``,
      eventName: "",
      completionThreshold: Math.max(1, threshold),
    })
  }

  return steps
}

function StepPreviewChart({ steps }: { steps: Step[] }) {
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

export function StepsSetup({ onNext, onBack, circuitName, circuitType }: StepsSetupProps) {
  const t = useTranslations('onboarding.project');
  const [mode, setMode] = useState<"manual" | "generator">("manual")
  const [steps, setSteps] = useState<Step[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const eventName = circuitName.toLowerCase().replace(/[^a-z0-9]/g, "_")

  const generatorSteps = createGeneratorSteps(t, circuitType);

  const [generatorState, setGeneratorState] = useState<{
    values: GeneratorFormData
    currentInput: string
  }>({
    values: {
      numberOfSteps: 3,
      maxValue: 100,
      startValue: 1,
      curve: "power",
      exponent: 2,
    },
    currentInput: ""
  })

  const currentQuestion = generatorSteps[currentStep]

  const handleAddStep = (value: string) => {
    const numValue = parseInt(value)
    if (numValue >= 1) {
      const newStep: Step = {
        id: `step_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: "",
        description: "",
        eventName,
        completionThreshold: numValue,
      }
      setSteps(prev => [...prev, newStep])
    }
  }

  const handleUpdateStep = (index: number, value: string) => {
    const numValue = parseInt(value)
    if (numValue >= 1) {
      const updatedSteps = [...steps]
      updatedSteps[index] = {
        ...updatedSteps[index],
        completionThreshold: numValue,
      }
      setSteps(updatedSteps)
    }
  }

  const handleRemoveStep = (index: number) => {
    const updatedSteps = [...steps]
    updatedSteps.splice(index, 1)
    setSteps(updatedSteps)
  }

  const handleGeneratorValueChange = (value: string | number, field: keyof GeneratorFormData) => {
    setGeneratorState(prev => ({
      values: {
        ...prev.values,
        [field]: field === "curve" ? value : (typeof value === "string" ? parseInt(value) || 0 : value)
      },
      currentInput: value.toString()
    }))
  }

  const handleGeneratorNext = () => {
    if (currentStep === generatorSteps.length - 1) {
      const generatedSteps = generateSteps(generatorState.values).map(step => ({
        ...step,
        eventName,
      }))
      setSteps(generatedSteps)
      setMode("manual")
      return
    }
    setCurrentStep(prev => prev + 1)
    setGeneratorState(prev => ({ ...prev, currentInput: "" }))
  }

  const handleGeneratorBack = () => {
    if (currentStep === 0) {
      setMode("manual")
      return
    }
    setCurrentStep(prev => prev - 1)
    setGeneratorState(prev => ({ ...prev, currentInput: "" }))
  }

  const isCurrentStepValid = () => {
    const value = generatorState.values[currentQuestion.field]
    return currentQuestion.validation(value?.toString() || "")
  }

  const previewSteps = useMemo(() => steps.map((step, index) => ({
    id: `${index}`,
    name: `${circuitName} ${circuitType === "points" ? t('stepsSetup.generator.preview.level', { index: index + 1 }) : t('stepsSetup.generator.preview.step', { index: index + 1 })}`,
    description: circuitType === "points" 
      ? t('stepsSetup.generator.preview.points', { value: step.completionThreshold })
      : t('stepsSetup.generator.preview.actions', { value: step.completionThreshold }),
    completionRate: 0,
    completionThreshold: step.completionThreshold,
    usersCompleted: 0,
    eventName: `${eventName}_level_${index + 1}`,
  })), [steps, circuitName, circuitType, eventName, t])

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          {t('stepsSetup.title')}
        </h2>
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-foreground/70">
            {circuitType === "points"
              ? t('stepsSetup.subtitle.points')
              : t('stepsSetup.subtitle.actions')}
          </p>
          <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
            <h3 className="font-medium mb-2">{t('stepsSetup.what.title')}</h3>
            <p className="text-sm text-foreground/70">
              {circuitType === "points" 
                ? t('stepsSetup.description.points')
                : t('stepsSetup.description.actions')}
            </p>
          </div>
        </div>
      </div>

      <Tabs.Root value={mode} onValueChange={(value) => setMode(value as "manual" | "generator")}>
        <Tabs.List className="flex rounded-lg overflow-hidden mb-8">
          <Tabs.Trigger 
            value="manual" 
            className={cn(
              "flex-1 py-2 px-4 text-sm font-medium border transition-all duration-200",
              "hover:border-primary/40 hover:bg-primary/5",
              mode === "manual"
                ? "border-secondary bg-primary/5"
                : "border-primary/20"
            )}
          >
            {t('stepsSetup.manual.title')}
          </Tabs.Trigger>
          <Tabs.Trigger 
            value="generator" 
            className={cn(
              "flex-1 py-2 px-4 text-sm font-medium border transition-all duration-200",
              "hover:border-primary/40 hover:bg-primary/5",
              mode === "generator"
                ? "border-secondary bg-primary/5"
                : "border-primary/20",
              "flex items-center justify-center gap-1.5"
            )}
          >
            <Wand2 className="w-3.5 h-3.5" />
            {t('stepsSetup.generator.title')}
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="manual">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-6">
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20 mb-6">
                <h3 className="font-medium mb-2">{t('stepsSetup.manual.title')}</h3>
                <p className="text-sm text-foreground/70">
                  {circuitType === "points"
                    ? t('stepsSetup.manual.description.points')
                    : t('stepsSetup.manual.description.actions')}
                </p>
              </div>

              <div className="space-y-3 bg-card/50 rounded-lg p-4">
                {steps.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="mb-2">{t('stepsSetup.empty.title')}</p>
                    <p className="text-sm">
                      {circuitType === "points"
                        ? t('stepsSetup.empty.description.points')
                        : t('stepsSetup.empty.description.actions')}
                    </p>
                  </div>
                )}

                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border hover:border-border/80 transition-colors duration-200"
                  >
                    <div className="w-16 shrink-0 text-sm text-muted-foreground">
                      {circuitType === "points" ? t('stepsSetup.level') : t('stepsSetup.actions.label')} {index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <Input
                        type="number"
                        min={1}
                        value={step.completionThreshold}
                        onChange={(e) => handleUpdateStep(index, e.target.value)}
                        placeholder={circuitType === "points" ? t('stepsSetup.manual.placeholder') : t('stepsSetup.manual.actions_placeholder')}
                        className="h-9 text-sm"
                      />
                    </div>

                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveStep(index)}
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
                  onClick={() => handleAddStep((steps[steps.length - 1]?.completionThreshold || 0) + 10 + "")}
                  className="w-full h-9 text-sm mt-2 border-border hover:border-border/80 dark:!border-primary/40 dark:hover:!border-primary/60"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t('stepsSetup.manual.add')}
                </Button>
              </div>

              {steps.length > 1 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-medium">{t('stepsSetup.generator.preview.title')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('stepsSetup.generator.preview.description', { 
                        type: circuitType === "points" ? "points" : "actions",
                        action: circuitType === "points" ? "atteindre" : "effectuer"
                      })}
                    </p>
                  </div>
                  <div className="bg-card/50 rounded-lg p-4">
                    <StepPreviewChart steps={previewSteps} />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                      {previewSteps.map((step, index) => (
                        <div key={index} className="text-sm bg-card p-2 rounded-md border border-border/60">
                          <span className="text-muted-foreground">
                            {circuitType === "points" ? t('stepsSetup.level') : t('stepsSetup.actions.label')} {index + 1}:
                          </span>
                          <br />
                          <span className="text-secondary font-medium">
                            {step.completionThreshold} {circuitType === "points" ? t('stepsSetup.points') : t('stepsSetup.actions.label')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="flex-1 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                >
                  {t('stepsSetup.actions.back')}
                </Button>
                <Button 
                  type="button"
                  onClick={() => onNext(steps)}
                  disabled={steps.length === 0}
                  className="flex-1 bg-secondary hover:bg-secondary/90 text-black font-medium"
                >
                  {t('stepsSetup.actions.continue')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </Tabs.Content>

        <Tabs.Content value="generator">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-6">
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20 mb-6">
                <h3 className="font-medium mb-2">{t('stepsSetup.generator.title')}</h3>
                <p className="text-sm text-foreground/70">
                  {circuitType === "points"
                    ? t('stepsSetup.generator.description.points')
                    : t('stepsSetup.generator.description.actions')}
                </p>
              </div>

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
                    <div className="space-y-4 w-full">
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-1">
                          <Wand2 className="w-5 h-5 text-primary" />
                          <Label className="text-base font-bold text-primary">{t('stepsSetup.generator.curve.title')}</Label>
                        </div>
                        <div className="rounded-lg shadow border border-primary/30 bg-primary/10 p-4">
                          <Select
                            value={generatorState.values[currentQuestion.field]?.toString()}
                            onValueChange={(value) => handleGeneratorValueChange(value, currentQuestion.field)}
                          >
                            <SelectTrigger className="w-full bg-white border-none text-foreground font-medium focus:ring-2 focus:ring-primary/40 focus:border-primary">
                              <SelectValue placeholder={t('stepsSetup.generator.curve.placeholder')} />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-primary/30">
                              {currentQuestion.options?.map((option) => (
                                <SelectItem key={option.value} value={option.value} className="text-foreground">
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      {generatorState.values.curve === "power" && (
                        <div className="space-y-2 rounded-lg border border-primary/20 bg-primary/5 p-4 mt-2 flex flex-col items-center">
                          <div className="flex items-center justify-between mb-1 w-full">
                            <Label className="font-bold text-primary">{t('stepsSetup.generator.exponent.title')}</Label>
                            <span className="text-sm text-primary font-semibold">{generatorState.values.exponent}</span>
                          </div>
                          <div className="relative w-full flex justify-center">
                            <input
                              type="range"
                              min={1.5}
                              max={2.5}
                              step={0.1}
                              value={generatorState.values.exponent}
                              onChange={(e) => handleGeneratorValueChange(parseFloat(e.target.value), "exponent")}
                              className="max-w-md w-2/3 h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-secondary [&::-moz-range-thumb]:cursor-pointer"
                            />
                          </div>
                          <div className="flex justify-between text-xs text-primary mt-1 w-full max-w-md mx-auto">
                            <span>1.5</span>
                            <span>2.5</span>
                          </div>
                          <p className="text-xs text-primary/80 mt-1 w-full max-w-md mx-auto">
                            {t('stepsSetup.generator.exponent.description')}
                          </p>
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label>{t('stepsSetup.generator.preview.title')}</Label>
                        <div className="p-4 rounded-lg border border-primary/20">
                          <StepPreviewChart steps={generateSteps(generatorState.values).map(step => ({
                            ...step,
                            eventName,
                          }))} />
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            {generateSteps(generatorState.values).map((step, index) => (
                              <div key={index} className="text-sm text-secondary/70">
                                {t('stepsSetup.generator.preview.step', { index: index + 1 })}: {step.completionThreshold} {circuitType === "points" ? t('stepsSetup.points') : t('stepsSetup.actions.label')}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : currentQuestion.type === "range" ? (
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>{t('stepsSetup.generator.range.startValue')}</Label>
                          <Input
                            type="number"
                            min={1}
                            value={generatorState.values.startValue}
                            onChange={(e) => handleGeneratorValueChange(e.target.value, "startValue")}
                            className="w-full"
                          />
                          <p className="text-xs text-muted-foreground">
                            {circuitType === "points"
                              ? t('stepsSetup.generator.range.startValueHint.points')
                              : t('stepsSetup.generator.range.startValueHint.actions')}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label>{t('stepsSetup.generator.range.maxValue')}</Label>
                          <Input
                            type="number"
                            min={generatorState.values.startValue + 1}
                            value={generatorState.values.maxValue}
                            onChange={(e) => handleGeneratorValueChange(e.target.value, "maxValue")}
                            className="w-full"
                          />
                          <p className="text-xs text-muted-foreground">
                            {circuitType === "points"
                              ? t('stepsSetup.generator.range.maxValueHint.points')
                              : t('stepsSetup.generator.range.maxValueHint.actions')}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>{t('stepsSetup.generator.preview.title')}</Label>
                        <div className="p-4 rounded-lg border border-primary/20">
                          <StepPreviewChart steps={generateSteps(generatorState.values).map(step => ({
                            ...step,
                            eventName,
                          }))} />
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            {generateSteps(generatorState.values).map((step, index) => (
                              <div key={index} className="text-sm text-secondary/70">
                                {t('stepsSetup.generator.preview.step', { index: index + 1 })}: {step.completionThreshold} {circuitType === "points" ? t('stepsSetup.points') : t('stepsSetup.actions.label')}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 space-y-2">
                      <Input
                        type={currentQuestion.type || "text"}
                        value={generatorState.currentInput}
                        onChange={(e) => handleGeneratorValueChange(e.target.value, currentQuestion.field)}
                        placeholder={currentQuestion.placeholder}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        {circuitType === "points"
                          ? t('stepsSetup.generator.steps.count.hint.points')
                          : t('stepsSetup.generator.steps.count.hint.actions')}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGeneratorBack}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('stepsSetup.actions.back')}
                </Button>
                <Button
                  type="button"
                  onClick={handleGeneratorNext}
                  disabled={!isCurrentStepValid()}
                  className="flex-1 bg-secondary hover:bg-secondary/90 text-black font-medium"
                >
                  {t('stepsSetup.actions.next')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
} 