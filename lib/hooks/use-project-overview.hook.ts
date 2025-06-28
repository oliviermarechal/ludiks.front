import { useQuery } from '@tanstack/react-query'
import { useProjectStore } from '../stores/project-store'
import { useOrganizations } from './use-organizations.hook'
import { useEffect } from 'react'
import api from '../api'

export function useProjectOverview(projectId?: string) {
  const { overview, setOverview, selectedProject, setSelectedProject, setSelectedOrganization } = useProjectStore()
  const { organizations, isLoading: isOrgLoading } = useOrganizations()

  const effectiveProjectId = projectId || selectedProject?.id

  // Sélection automatique du premier projet si aucun n'est sélectionné
  useEffect(() => {
    if (!isOrgLoading && organizations.length > 0 && !selectedProject) {
      const firstOrg = organizations[0]
      const firstProject = firstOrg?.projects[0]
      if (firstProject) {
        setSelectedProject(firstProject)
        setSelectedOrganization(firstOrg)
      }
    }
  }, [isOrgLoading, organizations, selectedProject, setSelectedProject, setSelectedOrganization])

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