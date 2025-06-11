import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Star, RotateCw, Target } from "lucide-react"
import { CircuitType } from "@/lib/stores/circuit-store";
import { cn } from "@/lib/utils"
import Link from "next/link"

const circuitSchema = z.object({
  name: z.string().min(3, "Le nom du parcours doit contenir au moins 3 caractères"),
  type: z.enum([CircuitType.POINTS, CircuitType.ACTIONS, CircuitType.OBJECTIVE]),
  projectId: z.string(),
  description: z.string().max(500, "La description ne peut pas dépasser 500 caractères").optional(),
})

type CircuitFormData = z.infer<typeof circuitSchema>

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

const circuitTypes = [
  {
    value: "points",
    label: "Points",
    description: "Attribuez des points pour chaque action complétée. Définissez des niveaux pour récompenser vos utilisateurs au fil de leur progression.",
    icon: Star,
  },
  {
    value: "actions",
    label: "Actions",
    description: "Encouragez les utilisateurs à répéter des actions spécifiques. Récompensez-les lorsqu'ils atteignent des jalons.",
    icon: RotateCw,
  },
  {
    value: "objective",
    label: "Liste d'objectifs",
    description: "Définissez une série d'objectifs que les utilisateurs doivent compléter pour débloquer des récompenses.",
    icon: Target,
  },
]

export function CircuitCreation({ onNext, projectId, initialData }: CircuitCreationProps) {
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
      description: initialData?.description || "",
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
        <h2 className="text-2xl font-bold text-foreground">Créez votre parcours</h2>
        <p className="text-foreground/70">
          Commencez par définir les informations de base de votre parcours
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="max-w-md mx-auto space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground/90">Nom du parcours</Label>
            <Input
              id="name"
              placeholder="Parcours principal"
              className="border-primary/20 focus:border-primary/40 placeholder:text-foreground/50"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground/90">Description (optionnelle)</Label>
            <textarea
              id="description"
              placeholder="Décrivez le but de votre parcours..."
              className="w-full min-h-[100px] rounded-md border border-primary/20 focus:border-primary/40 placeholder:text-foreground/50 p-3 text-sm"
              maxLength={500}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-foreground">Type de parcours</h3>
            <p className="text-foreground/70">
              Sélectionnez le type de parcours qui correspond le mieux à vos besoins
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
            Passer l&apos;onboarding
          </Link>
          <Button 
            type="submit"
            disabled={!selectedType}
            className="flex-1 bg-secondary hover:bg-secondary/90 text-black font-medium"
          >
            Continuer
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
} 