import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface StepperProps {
  currentStep: number
  steps: { title: string; description: string }[]
}

export function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex justify-between relative">
        {/* Ligne de connexion en arrière-plan */}
        <div className="absolute top-5 left-[5rem] right-[5rem] h-0.5">
          <div className="w-full h-full bg-primary/20" />
          <div
            className="absolute top-0 left-0 h-full bg-secondary transition-all duration-200"
            style={{
              width: `${Math.max(0, Math.min(100, (currentStep / (steps.length - 1)) * 100))}%`
            }}
          />
        </div>

        {steps.map((step, index) => (
          <div key={step.title} className="flex flex-col items-center relative w-40">
            <div className="relative z-10">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all duration-200",
                  currentStep > index
                    ? "bg-secondary border-secondary text-secondary-foreground"
                    : currentStep === index
                    ? "bg-background border-primary text-primary"
                    : "bg-background border-primary/20 text-foreground/50"
                )}
              >
                {currentStep > index ? (
                  <Check className="h-5 w-5" />
                ) : (
                  index + 1
                )}
              </div>
            </div>

            <div className="mt-3 text-center">
              <p className={cn(
                "text-sm font-medium transition-colors duration-200",
                currentStep >= index 
                  ? "text-foreground" 
                  : "text-foreground/50"
              )}>
                {step.title}
              </p>
              <p className={cn(
                "text-xs transition-colors duration-200",
                currentStep >= index 
                  ? "text-foreground/70" 
                  : "text-foreground/40"
              )}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 