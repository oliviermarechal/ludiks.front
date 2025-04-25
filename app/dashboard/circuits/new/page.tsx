'use client'

import { CircuitForm, CircuitFormData } from "@/components/circuit/form/circuit-form"
import { useCircuitStore } from "@/lib/stores/circuit-store"
import { useRouter } from "next/navigation"

export default function NewCircuitPage() {
  const router = useRouter()
  const { projectId } = useCircuitStore()

  const handleCircuitCreation = async (data: CircuitFormData) => {
    console.log('Circuit creation data:', data)
    router.push(`/dashboard/circuits/toto/steps`)
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
      <CircuitForm onSubmit={handleCircuitCreation} />
    </div>
  )
}