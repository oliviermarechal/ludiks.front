import { useMutation, useQuery } from '@tanstack/react-query'
import { Circuit, Step, useCircuitStore } from '../stores/circuit-store'
import api from '../api'

export function useCircuits(projectId?: string) {
  const { circuits, setCircuits, projectId: storeProjectId } = useCircuitStore()
  const currentProjectId = projectId || storeProjectId

  const query = useQuery({
    queryKey: ['circuits', currentProjectId],
    queryFn: async () => {
      try {
        if (!currentProjectId) {
          return []
        }

        const res = await api.get<Circuit[]>(`/api/circuits?projectId=${currentProjectId}`)

        if (res.status === 200) {
          setCircuits(res.data)
          return res.data
        }

        throw new Error('Failed to fetch circuits')
      } catch (error) {
        throw error
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!currentProjectId, // Ne lance la requête que si on a un projectId
  })

  const addStepMutation = useMutation({
    mutationFn: async ({ circuitId, step }: { circuitId: string; step: Omit<Step, 'id'> }) => {
      const res = await api.post(`/api/circuits/${circuitId}/steps`, step)
      return res.data
    },
    onSuccess: (newStep, { circuitId }) => {
      const updatedCircuits = circuits.map(circuit => {
        if (circuit.id === circuitId) {
          return {
            ...circuit,
            steps: [...(circuit.steps || []), newStep].sort((a, b) => a.order - b.order)
          }
        }
        return circuit
      })
      setCircuits(updatedCircuits)
    }
  })

  const updateStepsMutation = useMutation({
    mutationFn: async ({ circuitId, steps }: { circuitId: string; steps: Step[] }) => {
      const res = await api.put(`/api/circuits/${circuitId}/steps`, { steps })
      return res.data
    },
    onSuccess: (updatedSteps, { circuitId }) => {
      const updatedCircuits = circuits.map(circuit => {
        if (circuit.id === circuitId) {
          return {
            ...circuit,
            steps: updatedSteps
          }
        }
        return circuit
      })
      setCircuits(updatedCircuits)
    }
  })

  return {
    ...query,
    circuits: query.data || circuits,
    isLoading: query.isLoading,
    error: query.error,
    addStep: addStepMutation.mutate,
    updateSteps: updateStepsMutation.mutate,
    isAddingStep: addStepMutation.isPending,
    isUpdatingSteps: updateStepsMutation.isPending,
  }
} 