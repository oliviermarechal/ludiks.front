import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Plus, Trash2 } from "lucide-react"

const objectiveSchema = z.object({
  name: z.string().min(3, "Le nom de l'objectif doit contenir au moins 3 caractères"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  eventName: z.string().min(3, "Le nom de l'événement doit contenir au moins 3 caractères"),
  completionThreshold: z.number().min(1, "Le seuil doit être supérieur à 0"),
})

const objectivesSchema = z.object({
  objectives: z.array(objectiveSchema).min(1, "Ajoutez au moins un objectif"),
})

type ObjectivesFormData = z.infer<typeof objectivesSchema>

interface ObjectivesSetupProps {
  onNext: (data: ObjectivesFormData) => void
  onBack: () => void
}

export function ObjectivesSetup({ onNext, onBack }: ObjectivesSetupProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ObjectivesFormData>({
    resolver: zodResolver(objectivesSchema),
    defaultValues: {
      objectives: [{ name: "", description: "", eventName: "", completionThreshold: 1 }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "objectives",
  })

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Configurez vos objectifs</h2>
        <p className="text-foreground/70">
          Définissez les objectifs que vos utilisateurs devront accomplir
        </p>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="space-y-6">
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="p-6 bg-black/20 rounded-xl border border-primary/20 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Objectif {index + 1}</h3>
                {index > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`objectives.${index}.name`}>Nom de l'objectif</Label>
                  <Input
                    {...register(`objectives.${index}.name`)}
                    placeholder="Ex: Première connexion"
                    className="bg-black/40 border-primary/20 focus:border-primary/40"
                  />
                  {errors.objectives?.[index]?.name && (
                    <p className="text-sm text-red-500">{errors.objectives[index]?.name?.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`objectives.${index}.eventName`}>Nom de l'événement</Label>
                  <Input
                    {...register(`objectives.${index}.eventName`)}
                    placeholder="Ex: user.login"
                    className="bg-black/40 border-primary/20 focus:border-primary/40"
                  />
                  {errors.objectives?.[index]?.eventName && (
                    <p className="text-sm text-red-500">{errors.objectives[index]?.eventName?.message}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`objectives.${index}.description`}>Description</Label>
                  <Input
                    {...register(`objectives.${index}.description`)}
                    placeholder="Ex: Se connecter pour la première fois à l'application"
                    className="bg-black/40 border-primary/20 focus:border-primary/40"
                  />
                  {errors.objectives?.[index]?.description && (
                    <p className="text-sm text-red-500">{errors.objectives[index]?.description?.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`objectives.${index}.completionThreshold`}>Seuil de complétion</Label>
                  <Input
                    type="number"
                    min={1}
                    {...register(`objectives.${index}.completionThreshold`, { valueAsNumber: true })}
                    placeholder="1"
                    className="bg-black/40 border-primary/20 focus:border-primary/40"
                  />
                  {errors.objectives?.[index]?.completionThreshold && (
                    <p className="text-sm text-red-500">{errors.objectives[index]?.completionThreshold?.message}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => append({ name: "", description: "", eventName: "", completionThreshold: 1 })}
            className="w-full border-primary/20 hover:border-primary/40 hover:bg-primary/5"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un objectif
          </Button>
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
            onClick={onBack}
          >
            Retour
          </Button>
          <Button 
            type="submit"
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