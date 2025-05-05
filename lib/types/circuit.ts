export enum CircuitType {
  POINTS = "points",
  ACTIONS = "actions",
  OBJECTIVE = "objective"
}

export interface CircuitStep {
  name: string;
  description?: string;
  eventName: string;
  completionThreshold: number;
}

export interface Circuit {
  id: string;
  name: string;
  description: string;
  steps: CircuitStep[];
}

export interface CircuitStepGeneratorConfig {
  circuitType: CircuitType.POINTS | CircuitType.ACTIONS;
  numberOfSteps: number;
  curve: "linear" | "power" | "logarithmic";
  maxValue: number;
  exponent?: number;
  eventName: string;
}

export interface ManualStepsConfig {
  steps: CircuitStep[];
  eventName: string;
}