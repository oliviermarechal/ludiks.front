export enum CircuitType {
  POINTS = "points",
  ACTIONS = "actions",
  OBJECTIVE = "objective",
}

export interface Step {
  id: string
  name: string
  description: string
  eventName: string
  completionThreshold: number
  stepNumber?: number
}

export type Circuit = {
  id: string
  name: string
  type: CircuitType
  active: boolean
  steps: Step[]
} 