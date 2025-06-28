'use client'

import { CircuitForm, CircuitFormData } from "@/components/circuit/form/circuit-form"
import { CircuitType } from "@/lib/types/circuit.types"
import { useProjectStore } from "@/lib/stores/project-store"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCircuits } from "@/lib/hooks/use-circuits.hook"
import { useTranslations } from "next-intl"

export default function NewCircuitPage() {
  const router = useRouter()
  const { selectedProject } = useProjectStore()
  const projectId = selectedProject?.id
  const { createCircuit } = useCircuits()
  const t = useTranslations('dashboard.circuits.common')

  const handleSubmit = async (data: CircuitFormData) => {
    if (!data.name || !data.type) return
    
    try {
      const circuit = await createCircuit({
        name: data.name,
        type: data.type as CircuitType,
      })
      router.push(`/dashboard/circuits/${circuit.id}`)
    } catch (error) {
      console.error('Error creating circuit:', error)
    }
  }

  if (!projectId) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center max-w-md mx-auto p-6">
          <h2 className="text-xl font-semibold text-white mb-3">
            {t('errors.projectRequired.title')}
          </h2>
          <p className="text-white/70">
            {t('errors.projectRequired.description')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center gap-3 mb-8">
          <div className={cn(
            "relative flex items-center justify-center w-10 h-10 rounded-xl",
            "bg-gradient-to-br from-secondary/20 to-secondary/10",
            "shadow-[0_0_0_1px_rgba(var(--secondary-rgb),0.3),0_2px_4px_rgba(var(--secondary-rgb),0.1)]"
          )}>
            <Settings className="w-5 h-5 text-secondary" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              {t('form.info.title')}
            </span>
            <span className="text-xs text-muted-foreground">
              {t('form.info.subtitle')}
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <CircuitForm onSubmit={handleSubmit} />
        </motion.div>
      </div>
    </div>
  )
}