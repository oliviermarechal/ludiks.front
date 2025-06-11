import { useQuery } from '@tanstack/react-query'
import { useProjectStore } from '../stores/project-store'
import api from '../api'

export function useProjectOverview(projectId?: string) {
  const { overview, setOverview, selectedProject } = useProjectStore()

  const effectiveProjectId = projectId || selectedProject?.id

  const query = useQuery({
    queryKey: ['project-overview', effectiveProjectId],
    queryFn: async () => {
      if (!effectiveProjectId) {
        throw new Error('Aucun projet sélectionné')
      }

      const res = await api.get(`/api/projects/${effectiveProjectId}/overview`)
      if (res.status === 200) {
        setOverview(res.data)
        return res.data
      }
      throw new Error('Failed to fetch project overview')
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!effectiveProjectId,
  })

  return {
    ...query,
    overview: query.data || overview,
  }
} 