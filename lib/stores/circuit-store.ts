import { create } from 'zustand'

interface CircuitState {
  circuits: Circuit[]
  projectId: string
  addCircuit: (circuit: Circuit) => void
  setCircuits: (circuits: Circuit[]) => void
  setProjectId: (projectId: string) => void
  addStep: (circuitId: string) => void
}

export enum CircuitType {
  POINTS = "points",
  ACTIONS = "actions",
  OBJECTIVE = "objective",
}

export type Circuit = {
  id: string
  name: string
  type: CircuitType
  steps: Step[]
  active: boolean
}

export interface Step {
  id: string
  name: string
  description: string
  eventName: string
  completionThreshold: number
  stepNumber?: number
}

export const useCircuitStore = create<CircuitState>((set) => ({
  circuits: [],
  projectId: "",
  addCircuit: (circuit) => set((state) => ({ circuits: [...state.circuits, circuit] })),
  setCircuits: (circuits) => set({ circuits }),
  setProjectId: (projectId) => set({ projectId, circuits: [] }),
  addStep: (circuitId: string) => {
    set((state) => {
      const circuit = state.circuits.find((c) => c.id === circuitId)
      if (!circuit) return state

      const newStep: Step = {
        id: crypto.randomUUID(),
        name: '',
        description: '',
        eventName: '',
        completionThreshold: 1,
        stepNumber: circuit.steps.length + 1
      }

      return {
        circuits: state.circuits.map((c) =>
          c.id === circuitId
            ? { ...c, steps: [...c.steps, newStep] }
            : c
        ),
      }
    })
  },
}))