import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Star, RotateCw, Target } from "lucide-react"
import { CircuitType } from "@/lib/types/circuit.types";
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useTranslations } from "next-intl"

type CircuitFormData = z.infer<ReturnType<typeof createCircuitSchema>>

interface CircuitCreationProps {
  onNext: (data: CircuitFormData) => void
  projectId: string
  initialData?: {
    name: string
    type: CircuitType
    projectId: string
    description?: string
  } | null
}

export function CircuitCreation({ onNext, projectId, initialData }: CircuitCreationProps) {
  const t = useTranslations('onboarding.project');
  
  const circuitSchema = z.object({
    name: z.string().min(3, t('circuitCreation.name.error')),
    type: z.enum([CircuitType.POINTS, CircuitType.ACTIONS, CircuitType.OBJECTIVE]),
    projectId: z.string(),
  })

  const circuitTypes = [
    {
      value: "points",
      label: t('circuitCreation.type.points.label'),
      description: t('circuitCreation.type.points.description'),
      icon: Star,
    },
    {
      value: "actions",
      label: t('circuitCreation.type.actions.label'),
      description: t('circuitCreation.type.actions.description'),
      icon: RotateCw,
    },
    {
      value: "objective",
      label: t('circuitCreation.type.objective.label'),
      description: t('circuitCreation.type.objective.description'),
      icon: Target,
    },
  ]

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CircuitFormData>({
    resolver: zodResolver(circuitSchema),
    defaultValues: {
      projectId,
      name: initialData?.name || "",
      type: initialData?.type,
    }
  })

  const selectedType = watch("type")

  const onSubmit = (data: CircuitFormData) => {
    onNext({
      ...data,
      projectId,
    })
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">{t('circuitCreation.title')}</h2>
        <p className="text-foreground/70">
          {t('circuitCreation.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="max-w-md mx-auto space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground/90">{t('circuitCreation.name.label')}</Label>
            <Input
              id="name"
              placeholder={t('circuitCreation.name.placeholder')}
              className="border-primary/20 focus:border-primary/40 placeholder:text-foreground/50"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-foreground">{t('circuitCreation.type.title')}</h3>
            <p className="text-foreground/70">
              {t('circuitCreation.type.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {circuitTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setValue("type", type.value as CircuitType)}
                className={cn(
                  "flex flex-col items-center text-center p-6 rounded-xl border transition-all duration-200",
                  "hover:border-secondary hover:bg-secondary/5",
                  selectedType === type.value
                    ? "border-secondary bg-secondary/5"
                    : "border-primary/20 bg-white/50"
                )}
              >
                <div className={cn(
                  "p-4 rounded-full mb-4 transition-colors duration-200",
                  selectedType === type.value
                    ? "bg-secondary/20"
                    : "bg-primary/10 group-hover:bg-secondary/10"
                )}>
                  <type.icon className={cn(
                    "w-8 h-8 transition-colors duration-200",
                    selectedType === type.value
                      ? "text-secondary"
                      : "text-primary/60 group-hover:text-secondary/80"
                  )} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{type.label}</h3>
                <p className="text-sm text-foreground/70">{type.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 max-w-md mx-auto">
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
            {t('circuitCreation.actions.skip')}
          </Link>
          <Button 
            type="submit"
            disabled={!selectedType}
            className="flex-1 bg-secondary hover:bg-secondary/90 text-black font-medium"
          >
            {t('circuitCreation.actions.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}

function createCircuitSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(3, t('circuitCreation.name.error')),
    type: z.enum([CircuitType.POINTS, CircuitType.ACTIONS, CircuitType.OBJECTIVE]),
    projectId: z.string(),
  })
} 