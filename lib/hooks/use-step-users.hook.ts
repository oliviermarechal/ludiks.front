import { useQuery } from '@tanstack/react-query'
import api from '../api'

export interface StepUser {
  id: string;
  fullName: string;
  email: string;
  avatar: string | null;
  createdAt: Date;
  lastLoginAt: Date;
  currentStreak: number;
  longestStreak: number;
  metadata: Record<string, string | number | boolean>;
  startSince: Date;
}

export interface PaginatedStepUser {
  data: StepUser[];
  total: number;
  limit: number;
  offset: number;
}

interface StepUserResponse {
  data: StepUserData[];
  total: number;
  limit: number;
  offset: number;
}

interface StepUserData {
  id: string;
  fullName: string;
  email: string;
  picture: string | null;
  createdAt: string;
  lastLoginAt: string;
  currentStreak: number;
  longestStreak: number;
  metadata: Record<string, string | number | boolean>;
  startedAt: string;
}

function transformStepUser(user: StepUserData): StepUser {
  return {
    ...user,
    avatar: user.picture,
    createdAt: new Date(user.createdAt),
    lastLoginAt: new Date(user.lastLoginAt),
    startSince: new Date(user.startedAt)
  }
}

export function useStepUsers(circuitId: string, stepId: string, limit: number, offset: number, filters: Record<string, string> = {}) {
  // Convertir les filtres en un tableau de paires [key, value] pour une meilleure stabilité
  const filterEntries = Object.entries(filters).sort(([a], [b]) => a.localeCompare(b));
  
  return useQuery<PaginatedStepUser>({
    queryKey: ['step-users', circuitId, stepId, limit, offset, filterEntries],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        ...filters
      });
      
      const res = await api.get<StepUserResponse>(`/api/circuits/${circuitId}/steps/${stepId}/users?${queryParams.toString()}`)
      return {
        data: res.data.data.map(transformStepUser),
        total: res.data.total,
        limit: res.data.limit,
        offset: res.data.offset
      }
    },
    staleTime: 0,
  })
} 