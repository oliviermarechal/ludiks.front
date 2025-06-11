import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"

const projectSchema = z.object({
  name: z.string().min(3, "Le nom du projet doit contenir au moins 3 caractères"),
})

type ProjectFormData = z.infer<typeof projectSchema>

interface ProjectCreationProps {
  onNext: (data: ProjectFormData) => void
}

export function ProjectCreation({ onNext }: ProjectCreationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  })

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Créez votre projet</h2>
        <p className="text-foreground/70">
          Donnez un nom à votre projet pour commencer l&apos;aventure
        </p>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="space-y-6 max-w-md mx-auto">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground/90">Nom du projet</Label>
          <Input
            id="name"
            placeholder="Mon super projet"
            className="border-primary/20 focus:border-primary/40 placeholder:text-foreground/50"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full bg-secondary hover:bg-secondary/90 text-black font-medium"
        >
          Continuer
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  )
} 