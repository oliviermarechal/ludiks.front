import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../api'

export type ApiKey = {
    id: string;
    name: string;
    value: string;
    projectId: string;
    createdAt: Date;
}

export type CreateApiKeyRequest = {
    name: string;
}

export type CreateApiKeyResponse = {
    id: string;
    name: string;
    value: string;
    projectId: string;
    createdAt: Date;
}

export function useProjectApiKeys(projectId: string) {
    const queryClient = useQueryClient();

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

    const createApiKeyMutation = useMutation({
        mutationFn: async (data: CreateApiKeyRequest) => {
            if (!projectId) {
                throw new Error('Project ID is required')
            }

            const res = await api.post<CreateApiKeyResponse>(`/api/projects/${projectId}/api-keys`, data)
            
            if (res.status === 201) {
                return res.data
            }

            throw new Error('Failed to create API key')
        },
        onSuccess: () => {
            // Invalidate and refetch the API keys list
            queryClient.invalidateQueries({ queryKey: ['projectApiKeys', projectId] })
        },
    })

    const deleteApiKeyMutation = useMutation({
        mutationFn: async (apiKeyId: string) => {
            if (!projectId) {
                throw new Error('Project ID is required')
            }

            const res = await api.delete(`/api/projects/${projectId}/api-keys/${apiKeyId}`)
            
            if (res.status !== 201) {
                throw new Error('Failed to delete API key')
            }

            return apiKeyId
        },
        onSuccess: () => {
            // Invalidate and refetch the API keys list
            queryClient.invalidateQueries({ queryKey: ['projectApiKeys', projectId] })
        },
    })

    return {
        ...query,
        apiKeys: query.data || [],
        isLoading: query.isLoading,
        error: query.error,
        createApiKey: createApiKeyMutation.mutate,
        isCreatingApiKey: createApiKeyMutation.isPending,
        createApiKeyError: createApiKeyMutation.error,
        deleteApiKey: deleteApiKeyMutation.mutateAsync,
        isDeletingApiKey: deleteApiKeyMutation.isPending,
        deleteApiKeyError: deleteApiKeyMutation.error,
    }
} 