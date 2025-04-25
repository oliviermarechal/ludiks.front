import { useQuery } from '@tanstack/react-query'
import { useProjectStore } from '../stores/project-store'
import api from '../api'

export function useProjects() {
  const { projects, setProjects } = useProjectStore()

  const query = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      try {
        const res = await api.get('/api/projects')

        if (res.status === 200) {
          setProjects(res.data)
          return res.data
        }

        throw new Error('Failed to fetch projects')
      } catch (error) {
        throw error
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  return {
    ...query,
    projects: query.data || projects,
    isLoading: query.isLoading,
    error: query.error,
  }
} 