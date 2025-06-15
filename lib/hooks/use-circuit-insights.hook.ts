import { useQuery } from '@tanstack/react-query'
import api from '../api'
import { CircuitType } from '../stores/circuit-store';

// Types adaptés aux données d'insight pour l'affichage
export interface CircuitStepInsight {
  id: string;
  name: string;
  completionThreshold: number;
  usersCompleted: number;
  usersOnThisStep: number;
  completionRate: number;
  avgTime: number;
  alert?: boolean;
}

export interface CircuitInsight {
  id: string;
  activeUsers: number;
  type: CircuitType;
  completionRate: number;
  avgCompletionTime: number;
  steps: CircuitStepInsight[];
}

export function useCircuitInsights(circuitId?: string) {
  return useQuery<CircuitInsight | undefined>({
    queryKey: ['circuit-insights', circuitId],
    queryFn: async () => {
      if (!circuitId) return undefined
      const res = await api.get<CircuitInsight>(`/api/circuits/${circuitId}/insights`)
      return res.data
    },
    enabled: !!circuitId,
    staleTime: 5 * 60 * 1000,
  })
} 