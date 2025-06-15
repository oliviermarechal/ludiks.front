import { useQuery } from '@tanstack/react-query'
import api from '../api'

export type ApiKey = {
    id: string;
    name: string;
    value: string;
    project_id: string;
    created_at: Date;
}

export function useProjectApiKeys(projectId: string) {
    const query = useQuery<ApiKey[]>({
        queryKey: ['projectApiKeys', projectId],
        queryFn: async () => {
            try {
                if (!projectId) {
                    return []
                }

                const res = await api.get<ApiKey[]>(`/api/projects/${projectId}/api-keys`)

                if (res.status === 200) {
                    return res.data
                }

                throw new Error('Failed to fetch project API keys')
            } catch (error) {
                throw error
            }
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    })

    return {
        ...query,
        apiKeys: query.data || [],
        isLoading: query.isLoading,
        error: query.error,
    }
} 