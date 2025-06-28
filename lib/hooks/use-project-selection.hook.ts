import { Organization, Project, useProjectStore } from '../stores/project-store'
import { useOrganizations } from './use-organizations.hook'
import { useEffect } from 'react'

export function useProjectSelection() {
  const { 
    selectedProject, 
    selectedOrganization, 
    selectedProjectId, 
    selectedOrganizationId,
    setSelectedProject, 
    setSelectedOrganization 
  } = useProjectStore()
  const { organizations, isLoading } = useOrganizations()

  useEffect(() => {
    if (!isLoading && organizations.length > 0) {
      if (selectedOrganizationId) {
        const org = organizations.find((o: Organization) => o.id === selectedOrganizationId)
        if (org) {
          setSelectedOrganization(org)
        }
      }
      
      if (selectedProjectId) {
        const org = organizations.find((o: Organization) => o.id === selectedOrganizationId)
        if (org) {
          const project = org.projects.find((p: Project) => p.id === selectedProjectId)
          if (project) {
            setSelectedProject(project)
          }
        }
      }
      
      if (!selectedProjectId && !selectedOrganizationId) {
        const firstOrg = organizations[0]
        const firstProject = firstOrg?.projects[0]
        if (firstProject) {
          setSelectedProject(firstProject)
          setSelectedOrganization(firstOrg)
        }
      }
    }
  }, [isLoading, organizations, selectedProjectId, selectedOrganizationId, setSelectedProject, setSelectedOrganization])

  return {
    selectedProject,
    selectedOrganization,
    setSelectedProject,
    setSelectedOrganization,
    isLoading,
    organizations
  }
} 