import { create } from 'zustand'

interface CircuitState {
  circuits: Circuit[]
  projectId: string
  addCircuit: (circuit: Circuit) => void
  setCircuits: (circuits: Circuit[]) => void
  setProjectId: (projectId: string) => void
}

export enum CircuitType {
  POINTS = "points",
  ACTIONS = "actions",
  OBJECTIVE = "objective",
}

export type Circuit = {
  id: string
  name: string
  description?: string
  type: CircuitType
  steps?: Step[]
}

export type Step = {
  id: string;
  name: string;
  description?: string;
  completionThreshold: number;
  circuitId: string;
  stepNumber: number;
  eventName: string;
  createdAt: Date;
}

export const useCircuitStore = create<CircuitState>((set) => ({
  circuits: [],
  projectId: "",
  addCircuit: (circuit) => set((state) => ({ circuits: [...state.circuits, circuit] })),
  setCircuits: (circuits) => set({ circuits }),
  setProjectId: (projectId) => set({ projectId, circuits: [] }),
}))