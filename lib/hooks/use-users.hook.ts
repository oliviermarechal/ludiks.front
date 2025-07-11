import { useQuery } from '@tanstack/react-query';
import api from '../api';

type UserMetadata = {
    [key: string]: string | boolean | number;
}

type CircuitProgress = {
    id: string;
    circuitName: string;
    status: 'completed' | 'in_progress';
    startedAt: Date;
    points: number;
    completedAt?: Date;
}

export type EndUser = {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
  lastLoginAt: string;
  externalId: string;
  picture?: string;
  currentStreak: number;
  longestStreak: number;
  metadata: UserMetadata;
  circuitProgress: CircuitProgress[];
};

export type PaginatedEndUserResponse = {
  total: number;
  users: EndUser[];
};

function buildQueryString(filters: Record<string, unknown> = {}) {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      const stringValue = String(value);
      if (stringValue.trim() !== '') {
        params.append(key, stringValue);
      }
    }
  });
  
  return params.toString() ? `?${params.toString()}` : '';
}

type UseUsersParams = {
  projectId: string | null;
  filters?: Record<string, unknown>;
  limit?: number;
  offset?: number;
};

export function useUsers({ projectId, filters = {}, limit = 10, offset = 0 }: UseUsersParams) {
  const query = useQuery<PaginatedEndUserResponse>({
    queryKey: ['users', projectId, filters, limit, offset],
    queryFn: async () => {
      if (!projectId) return { total: 0, users: [] };
      const query = buildQueryString({ ...filters, limit, offset });
      const res = await api.get<PaginatedEndUserResponse>(`/api/projects/${projectId}/end-users${query}`);
      if (res.status === 200) {
        return res.data;
      }
      throw new Error('Failed to fetch users');
    },
    enabled: !!projectId,
  });

  return {
    users: query.data?.users ?? [],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
} 