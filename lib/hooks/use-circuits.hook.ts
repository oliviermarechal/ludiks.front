import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Circuit, CircuitType, Step, useCircuitStore } from '../stores/circuit-store'
import api from '../api'

const sortStepsByOrder = (circuitType: CircuitType, steps: Step[]) => {
  if ([CircuitType.POINTS, CircuitType.ACTIONS].includes(circuitType)) {
    return [...steps].sort((a, b) => {
      const orderA = a.completionThreshold ?? 0
      const orderB = b.completionThreshold ?? 0
      return orderA - orderB
    })
  }

  return [...steps].sort((a, b) => {
    const orderA = a.stepNumber ?? 0
    const orderB = b.stepNumber ?? 0
    return orderA - orderB
  })
}

export function useCircuits(projectId?: string) {
  const { circuits, setCircuits, projectId: storeProjectId } = useCircuitStore()
  const currentProjectId = projectId || storeProjectId
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['circuits', currentProjectId],
    queryFn: async () => {
      try {
        if (!currentProjectId) {
          return []
        }

        const res = await api.get<Circuit[]>(`/api/circuits?projectId=${currentProjectId}`)

        if (res.status === 200) {
          // Sort steps for each circuit
          const sortedCircuits = res.data.map(circuit => ({
            ...circuit,
            steps: sortStepsByOrder(circuit.type, circuit.steps || [])
          }))
          setCircuits(sortedCircuits)
          return sortedCircuits
        }

        throw new Error('Failed to fetch circuits')
      } catch (error) {
        throw error
      }
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!currentProjectId,
  })

  const addStepMutation = useMutation({
    mutationFn: async ({ circuitId, step }: { circuitId: string; step: Omit<Step, 'id'> }) => {
      const res = await api.post(`/api/circuits/${circuitId}/steps`, step)
      return res.data as Step
    },
    onSuccess: (newStep, { circuitId }) => {
      const updatedCircuits = circuits.map(circuit => {
        if (circuit.id === circuitId) {
          return {
            ...circuit,
            steps: sortStepsByOrder(circuit.type, [...(circuit.steps || []), newStep])
          }
        }
        return circuit
      })
      setCircuits(updatedCircuits)
    }
  })

  const addStep = async ({ circuitId, step }: { circuitId: string; step: Omit<Step, 'id'> }) => {
    return addStepMutation.mutateAsync({ circuitId, step })
  }

  const setStepsMutation = useMutation({
    mutationFn: async ({ circuitId, steps }: { circuitId: string; steps: Step[] }) => {
      const res = await api.post(`/api/circuits/${circuitId}/set-steps`, { steps })
      return res.data
    },
    onSuccess: (updatedCircuit, { circuitId }) => {
      const updatedCircuits = circuits.map(circuit => {
        if (circuit.id === circuitId) {
          return {
            ...updatedCircuit,
            steps: sortStepsByOrder(updatedCircuit.type, updatedCircuit.steps || [])
          }
        }
        return circuit
      })
      setCircuits(updatedCircuits)
    }
  })

  const setSteps = async ({ circuitId, steps }: { circuitId: string; steps: Step[] }) => {
    return setStepsMutation.mutateAsync({ circuitId, steps })
  }

  const updateStepMutation = useMutation({
    mutationFn: async ({ circuitId, stepId, step }: { circuitId: string; stepId: string; step: Omit<Step, 'id'> }) => {
      const res = await api.put(`/api/circuits/${circuitId}/steps/${stepId}`, step)
      return res.data
    },
    onSuccess: (updatedStep, { circuitId, stepId }) => {
      const updatedCircuits = circuits.map(circuit => {
        if (circuit.id === circuitId) {
          const updatedSteps = circuit.steps.map(step => step.id === stepId ? updatedStep : step)
          return {
            ...circuit,
            steps: sortStepsByOrder(circuit.type, updatedSteps)
          }
        }
        return circuit
      })
      setCircuits(updatedCircuits)
    }
  })

  const deleteStepMutation = useMutation({
    mutationFn: async ({ circuitId, stepId }: { circuitId: string; stepId: string }) => {
      const res = await api.delete(`/api/circuits/${circuitId}/steps/${stepId}`)
      return res.data
    },
    onSuccess: (_, { circuitId, stepId }) => {
      const updatedCircuits = circuits.map(circuit => {
        if (circuit.id === circuitId) {
          return { ...circuit, steps: circuit.steps.filter(step => step.id !== stepId) }
        }
        return circuit
      })
      setCircuits(updatedCircuits)
    }
  })

  const createCircuitMutation = useMutation({
    mutationFn: async ({ name, type }: { name: string; type: CircuitType; }) => {
      const res = await api.post('/api/circuits', {
        name,
        type,
        projectId: currentProjectId,
      })
      return res.data as Circuit
    },
    onSuccess: (newCircuit) => {
      setCircuits([...circuits, newCircuit])
      queryClient.invalidateQueries({ queryKey: ['circuits', currentProjectId] })
    }
  })

  const createCircuit = async ({ name, type }: { name: string; type: CircuitType; }) => {
    return createCircuitMutation.mutateAsync({ name, type })
  }

  const activateCircuitMutation = useMutation({
    mutationFn: async ({ circuitId }: { circuitId: string }) => {
      const res = await api.post(`/api/circuits/${circuitId}/activate`)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['circuits', currentProjectId] })
    }
  })

  const renameCircuitMutation = useMutation({
    mutationFn: async ({ circuitId, name }: { circuitId: string; name: string }) => {
      const res = await api.post(`/api/circuits/${circuitId}/rename`, { name })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['circuits', currentProjectId] })
    }
  })

  const renameCircuit = async ({ circuitId, name }: { circuitId: string; name: string }) => {
    return renameCircuitMutation.mutateAsync({ circuitId, name })
  }

  const updateStepsOrderMutation = useMutation({
    mutationFn: async ({ circuitId, steps }: { circuitId: string; steps: { stepId: string; stepNumber: number }[] }) => {
      const res = await api.post(`/api/circuits/${circuitId}/reordering-steps`, { steps })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['circuits', currentProjectId] })
    }
  })

  const updateStepsOrder = async ({ circuitId, steps }: { circuitId: string; steps: { stepId: string; stepNumber: number }[] }) => {
    return updateStepsOrderMutation.mutateAsync({ circuitId, steps })
  }

  return {
    ...query,
    circuits: query.data || circuits,
    isLoading: query.isLoading,
    error: query.error,
    addStep,
    setSteps,
    updateStep: updateStepMutation.mutate,
    deleteStep: deleteStepMutation.mutate,
    createCircuit,
    activateCircuit: activateCircuitMutation.mutate,
    renameCircuit,
    updateStepsOrder,
  }
} 