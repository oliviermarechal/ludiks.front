import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Circuit } from '../types/circuit.types'

interface ProjectState {
  projects: Project[]
  selectedProject: Project | null
  selectedOrganization: Organization | null
  selectedProjectId: string | null
  selectedOrganizationId: string | null
  addProject: (project: Project) => void
  setProjects: (projects: Project[]) => void
  setSelectedProject: (project: Project | null) => void
  setSelectedOrganization: (organization: Organization | null) => void
  setSelectedProjectId: (projectId: string | null) => void
  setSelectedOrganizationId: (organizationId: string | null) => void
  overview: ProjectOverview | null
  setOverview: (overview: ProjectOverview | null) => void
}

export type Organization = {
  id: string
  name: string
  createdAt: Date
  plan: string
  eventsQuota: number
  eventsUsed: number
  pricing: string
  projects: Project[]
}

export type Project = {
  id: string
  name: string
  description?: string
  createdAt: Date
  organizationId: string
}

export type ProjectOverview = {
  KPIs: never,
  circuits: CircuitWithInsights[],
  users: never
}

export type CircuitWithInsights = Circuit & {
  completionRate: number // %
  averageCompletionTime: number // en secondes
  hasFrictionPoints: boolean
  frictionPoints: {
    stepId: string
    stepName: string
    dropoffRate: number // %
    averageTime: number // en secondes
  }[]
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      projects: [],
      selectedProject: null,
      selectedOrganization: null,
      selectedProjectId: null,
      selectedOrganizationId: null,
      overview: null,
      addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
      setProjects: (projects) => set({ projects }),
      setSelectedProject: (project) => set({ 
        selectedProject: project,
        selectedProjectId: project?.id || null
      }),
      setSelectedOrganization: (organization) => set({ 
        selectedOrganization: organization,
        selectedOrganizationId: organization?.id || null
      }),
      setSelectedProjectId: (projectId) => set({ selectedProjectId: projectId }),
      setSelectedOrganizationId: (organizationId) => set({ selectedOrganizationId: organizationId }),
      setOverview: (overview) => set({ overview }),
    }),
    {
      name: 'project-store',
      partialize: (state) => ({
        selectedProjectId: state.selectedProjectId,
        selectedOrganizationId: state.selectedOrganizationId,
      }),
    }
  )
)