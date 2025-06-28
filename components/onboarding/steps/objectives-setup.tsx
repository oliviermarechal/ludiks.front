import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Plus, Trash2, Target, Check, X, Settings } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { Step } from "@/lib/types/circuit.types"

type ObjectivesFormData = {
  objectives: Step[]
}

interface ObjectivesSetupProps {
  onNext: (data: ObjectivesFormData) => void
  onBack: () => void
}

interface ObjectiveItemProps {
  objective: Step
  index: number
  onUpdate: (updatedObjective: Step) => void
  onRemove: () => void
}

function createObjectiveSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(3, t('objectivesSetup.form.name.error')),
    description: z.string().optional(),
    eventName: z.string(),
    completionThreshold: z.number().min(1, t('objectivesSetup.form.threshold.error')),
  })
}

const ObjectiveItem = ({ objective, index, onUpdate, onRemove }: ObjectiveItemProps) => {
  const t = useTranslations('onboarding.project');
  const objectiveSchema = createObjectiveSchema(t);
  const [isEditing, setIsEditing] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof objectiveSchema>>({
    resolver: zodResolver(objectiveSchema),
    defaultValues: {
      name: objective.name,
      description: objective.description,
      eventName: objective.eventName,
      completionThreshold: objective.completionThreshold,
    },
  })

  const handleSave = (data: z.infer<typeof objectiveSchema>) => {
    const updatedData = {
      ...data,
      eventName: data.name.toLowerCase().replace(/[^a-z0-9]/g, "_")
    }
    onUpdate(updatedData as Step)
    setIsEditing(false)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative"
    >
      <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-2/50 transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(var(--secondary-rgb),0.2),0_2px_4px_rgba(var(--secondary-rgb),0.1)]">
        <div className="shrink-0 mt-1">
          <div className="relative">
            <motion.div
              initial={false}
              animate={{
                scale: isEditing ? 1.1 : 1,
                rotate: isEditing ? -10 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Badge 
                variant="outline" 
                className={`
                  h-8 w-8 flex items-center justify-center p-0 text-sm font-medium 
                  bg-gradient-to-br from-background to-surface-2
                  border-2 border-secondary/20 shadow-sm
                  group-hover:border-secondary/30 group-hover:shadow-md
                  transition-all duration-300
                  ${isEditing ? 'border-secondary shadow-[0_0_0_4px_rgba(var(--secondary-rgb),0.1)]' : ''}
                `}
              >
                {index + 1}
              </Badge>
            </motion.div>
            {index < 3 && (
              <motion.div 
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0.5 h-4"
                style={{
                  background: "linear-gradient(to bottom, rgba(var(--secondary-rgb), 0.3), transparent)"
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.2 }}
              />
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex-1 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('objectivesSetup.form.name.label')}</Label>
                  <Input
                    {...register("name")}
                    placeholder={t('objectivesSetup.form.name.placeholder')}
                    className="border-primary/20 focus:border-primary/40"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">{t('objectivesSetup.form.description.label')}</Label>
                  <Input
                    {...register("description")}
                    placeholder={t('objectivesSetup.form.description.placeholder')}
                    className="border-primary/20 focus:border-primary/40"
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="completionThreshold">{t('objectivesSetup.form.threshold.label')}</Label>
                  <Input
                    type="number"
                    min={1}
                    {...register("completionThreshold", { valueAsNumber: true })}
                    placeholder={t('objectivesSetup.form.threshold.placeholder')}
                    className="border-primary/20 focus:border-primary/40"
                  />
                  {errors.completionThreshold && (
                    <p className="text-sm text-red-500">{errors.completionThreshold.message}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  className="h-8 hover:bg-red-500/10 hover:text-red-500 transition-colors duration-300"
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleSubmit(handleSave)}
                  variant="ghost"
                  size="sm"
                  className="h-8 text-green-500 hover:text-green-600 hover:bg-green-500/10 transition-colors duration-300"
                >
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{objective.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {objective.completionThreshold} fois
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{objective.description}</p>
                  <p className="text-xs text-muted-foreground">Événement: {objective.eventName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onRemove}
                    className="h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

interface ChatObjectiveProps {
  onComplete: (objective: Step) => void
  onCancel: () => void
}

const ChatObjective = ({ onComplete, onCancel }: ChatObjectiveProps) => {
  const t = useTranslations('onboarding.project');
  const [currentStep, setCurrentStep] = useState(0)
  const [objectiveData, setObjectiveData] = useState<Partial<Step>>({})
  const [currentValue, setCurrentValue] = useState("")

  const questions = [
    {
      question: t('objectivesSetup.chat.name.question'),
      placeholder: t('objectivesSetup.chat.name.placeholder'),
      field: "name" as const,
      type: "text" as const,
      validation: (value: string) => value.length >= 3,
      errorMessage: t('objectivesSetup.chat.name.error'),
    },
    {
      question: t('objectivesSetup.chat.description.question'),
      placeholder: t('objectivesSetup.chat.description.placeholder'),
      field: "description" as const,
      type: "text" as const,
      validation: () => true,
      errorMessage: t('objectivesSetup.chat.description.error'),
    },
    {
      question: t('objectivesSetup.chat.threshold.question'),
      placeholder: t('objectivesSetup.chat.threshold.placeholder'),
      field: "completionThreshold" as const,
      type: "number" as const,
      validation: (value: string) => {
        const num = parseInt(value)
        return !isNaN(num) && num > 0
      },
      errorMessage: t('objectivesSetup.chat.threshold.error'),
    },
  ]

  const currentQuestion = questions[currentStep]

  const handleNext = () => {
    if (!currentQuestion.validation(currentValue)) return

    const updatedData = {
      ...objectiveData,
      [currentQuestion.field]: currentQuestion.type === "number" ? parseInt(currentValue) : currentValue,
    }
    setObjectiveData(updatedData)

    if (currentStep === questions.length - 1) {
      const finalObjective = {
        ...updatedData,
        eventName: (updatedData.name || '').toLowerCase().replace(/[^a-z0-9]/g, "_")
      } as Step
      onComplete(finalObjective)
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleValueChange = (value: string) => {
    setCurrentValue(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleNext()
    }
  }

  useEffect(() => {
    setCurrentValue("")
  }, [currentStep])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-surface-2/50 to-background border border-secondary/20 shadow-[0_4px_20px_-8px_rgba(var(--secondary-rgb),0.2)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <Label className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary/70">
          {currentQuestion.question}
        </Label>
        <div className="flex gap-2">
          <div className="flex-1 space-y-2">
            <Input
              type={currentQuestion.type || "text"}
              value={currentValue}
              onChange={(e) => handleValueChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={currentQuestion.placeholder}
              className="h-10 text-sm bg-background/50 backdrop-blur-sm border-secondary/20 focus:border-secondary/40 focus:ring-1 focus:ring-secondary/30 transition-all duration-300"
              min={currentQuestion.type === "number" ? 1 : undefined}
            />
          </div>
          <Button
            type="button"
            onClick={handleNext}
            disabled={!currentQuestion.validation(currentValue)}
            size="sm"
            className={`
              h-10 px-3 bg-secondary hover:bg-secondary/90 
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300
              ${currentQuestion.validation(currentValue) ? 'shadow-[0_0_0_4px_rgba(var(--secondary-rgb),0.1)]' : ''}
            `}
          >
            {currentStep === questions.length - 1 ? (
              <Check className="h-4 w-4" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </motion.div>

      <div className="flex justify-between items-center">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="h-8 text-sm hover:bg-red-500/10 hover:text-red-500 transition-colors duration-300"
        >
          {t('objectivesSetup.chat.actions.cancel')}
        </Button>
      </div>
    </motion.div>
  )
}

export function ObjectivesSetup({ onNext, onBack }: ObjectivesSetupProps) {
  const t = useTranslations('onboarding.project');
  const [objectives, setObjectives] = useState<Step[]>([])
  const [isAddingObjective, setIsAddingObjective] = useState(false)

  const handleAddObjective = (newObjective: Step) => {
    setObjectives(prev => [...prev, newObjective])
    setIsAddingObjective(false)
  }

  const handleUpdateObjective = (index: number, updatedObjective: Step) => {
    const updatedObjectives = [...objectives]
    updatedObjectives[index] = updatedObjective
    setObjectives(updatedObjectives)
  }

  const handleRemoveObjective = (index: number) => {
    const updatedObjectives = [...objectives]
    updatedObjectives.splice(index, 1)
    setObjectives(updatedObjectives)
  }

  const handleSubmit = () => {
    onNext({ objectives })
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">{t('objectivesSetup.title')}</h2>
        <p className="text-foreground/70">
          {t('objectivesSetup.description')}
        </p>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {objectives.length === 0 && !isAddingObjective && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-border bg-muted/50 text-center"
            >
              <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{t('objectivesSetup.empty.title')}</h3>
              <p className="text-sm text-muted-foreground mb-6">
                {t('objectivesSetup.empty.description')}
              </p>
              <Button
                type="button"
                onClick={() => setIsAddingObjective(true)}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                <Plus className="h-4 w-4 mr-2" />
                {t('objectivesSetup.add')}
              </Button>
            </motion.div>
          )}

          {objectives.map((objective, index) => (
            <ObjectiveItem
              key={index}
              objective={objective}
              index={index}
              onUpdate={(updatedObjective) => handleUpdateObjective(index, updatedObjective)}
              onRemove={() => handleRemoveObjective(index)}
            />
          ))}

          {isAddingObjective && (
            <ChatObjective
              onComplete={handleAddObjective}
              onCancel={() => setIsAddingObjective(false)}
            />
          )}
        </AnimatePresence>

        {objectives.length > 0 && (
          <div className="space-y-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddingObjective(true)}
              className={cn(
                "w-full",
                "bg-transparent hover:bg-primary/5",
                "border border-primary/20 hover:border-primary/40",
                "transition-colors"
              )}
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('objectivesSetup.add')}
            </Button>
          </div>
        )}

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
          >
            {t('objectivesSetup.actions.back')}
          </Button>
          <Button 
            type="button"
            onClick={handleSubmit}
            disabled={objectives.length === 0}
            className="flex-1 bg-secondary hover:bg-secondary/90 text-black font-medium"
          >
            {t('objectivesSetup.actions.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 