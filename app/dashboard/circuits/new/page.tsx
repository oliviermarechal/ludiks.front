'use client'

import { useState } from 'react'
import { CircuitForm, CircuitFormData } from "@/components/circuit/form/circuit-form"
import { useCircuitStore } from "@/lib/stores/circuit-store"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Settings, Target } from "lucide-react"
import { cn } from "@/lib/utils"
import { PointsStepForm } from "../[id]/components/step-forms/points-step-form"
import { ActionsStepForm } from "../[id]/components/step-forms/actions-step-form"
import { ObjectivesStepForm } from "../[id]/components/step-forms/objectives-step-form"

interface Step {
  id: string;
  name: string;
  description: string;
  completionRate: number;
  completionThreshold: number;
  usersCompleted: number;
  eventName: string;
}

interface CircuitCreationData extends CircuitFormData {
  steps: Step[];
}

const formSteps = [
    {
        id: 1,
        title: "Informations",
        subtitle: "Configuration du parcours",
        icon: Settings,
    },
    {
        id: 2,
        title: "Étapes",
        subtitle: "Définition des niveaux",
        icon: Target,
    }
];

export default function NewCircuitPage() {
  const router = useRouter()
  const { projectId } = useCircuitStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<CircuitCreationData>>({})

  const handleCircuitInfoSubmit = async (data: CircuitFormData) => {
    // @ts-expect-error - Types à aligner correctement dans l'implémentation finale
    setFormData(prev => ({ ...prev, ...data }))
    setCurrentStep(2)
  }

  const handleStepsChange = (steps: Step[]) => {
    setFormData(prev => ({ ...prev, steps }))
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.type || !formData.steps) return
    
    console.log('Circuit creation data:', formData)
    router.push('/dashboard/circuits')
  }

  if (!projectId) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center max-w-md mx-auto p-6">
          <h2 className="text-xl font-semibold text-white mb-3">
            Sélection du projet requise
          </h2>
          <p className="text-white/70">
            Veuillez d&apos;abord sélectionner un projet dans le menu pour créer un nouveau parcours.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            {formSteps.map((formStep, index) => (
              <div key={formStep.id} className="flex items-center gap-3">
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300",
                      currentStep === formStep.id 
                        ? "bg-gradient-to-br from-secondary/20 to-secondary/10 shadow-[0_0_0_1px_rgba(var(--secondary-rgb),0.3),0_2px_4px_rgba(var(--secondary-rgb),0.1)]"
                        : currentStep > formStep.id
                          ? "bg-gradient-to-br from-secondary to-secondary/90 shadow-[0_0_0_1px_rgba(var(--secondary-rgb),0.3)]"
                          : "bg-muted shadow-[0_0_0_1px_rgba(var(--border),1)]"
                    )}>
                      {currentStep > formStep.id ? (
                        <Check className={cn(
                          "w-5 h-5 text-secondary-foreground"
                        )} />
                      ) : (
                        <span className={cn(
                          "text-sm font-medium",
                          currentStep === formStep.id
                            ? "text-secondary"
                            : "text-muted-foreground"
                        )}>
                          {formStep.id}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className={cn(
                        "text-sm font-medium",
                        currentStep === formStep.id
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}>
                        {formStep.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formStep.subtitle}
                      </span>
                    </div>
                  </div>
                </div>
                {index < formSteps.length - 1 && (
                  <div className={cn(
                    "h-[2px] w-12",
                    currentStep > formStep.id
                      ? "bg-secondary"
                      : "bg-border"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          {currentStep === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <CircuitForm onSubmit={handleCircuitInfoSubmit} defaultValues={formData} />
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Configuration des étapes</h2>
                <p className="text-lg text-muted-foreground">
                  {formData.type === "points" 
                    ? "Définissez les niveaux et les points requis pour progresser"
                    : formData.type === "actions"
                    ? "Définissez les paliers et le nombre d'actions requises"
                    : "Définissez les objectifs à atteindre"}
                </p>
              </div>

              {formData.type === "points" && (
                <PointsStepForm
                  circuitName={formData.name || ""}
                  onStepsChange={handleStepsChange}
                  initialSteps={formData.steps}
                />
              )}

              {formData.type === "actions" && (
                <ActionsStepForm
                  circuitName={formData.name || ""}
                  onStepsChange={handleStepsChange}
                  initialSteps={formData.steps}
                />
              )}

              {formData.type === "objective" && (
                <ObjectivesStepForm
                  circuitName={formData.name || ""}
                  onStepsChange={handleStepsChange}
                  initialSteps={formData.steps}
                />
              )}

              <div className="flex justify-between pt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="px-8 "
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour
                </Button>

                <Button
                  onClick={handleSubmit}
                  disabled={!formData.steps?.length}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium px-8"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Créer le parcours
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}