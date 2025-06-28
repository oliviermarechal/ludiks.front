import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../api'

export function useOrganizations() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['organizations'],
    queryFn: async () => {
      try {
        const res = await api.get('/api/organizations')

        if (res.status === 200) {
          return res.data
        }

        throw new Error('Failed to fetch organizations')
      } catch (error) {
        throw error
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const createOrganizationMutation = useMutation({
    mutationFn: async (name: string) => {
      const response = await api.post('/api/organizations', { name })
      
      if (response.status !== 201) {
        throw new Error('Failed to create organization')
      }
      
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] })
    },
  })

  const updateProjectMutation = useMutation({
    mutationFn: async ({id, name}: {id: string, name: string}) => {
      const response = await api.put(`/api/projects/${id}`, {name})

      if (response.status !== 201) {
        throw new Error('Failed to update project')
      }

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] })
    },
  })

  return {
    ...query,
    organizations: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    createOrganization: createOrganizationMutation.mutateAsync,
    isCreating: createOrganizationMutation.isPending,
    createError: createOrganizationMutation.error,
    updateProject: updateProjectMutation.mutateAsync,
    isUpdating: updateProjectMutation.isPending,
    updateError: updateProjectMutation.error,
  }
}