import { create } from 'zustand'
import { Circuit } from './circuit-store'

interface ProjectState {
  projects: Project[]
  selectedProject: Project | null
  addProject: (project: Project) => void
  setProjects: (projects: Project[]) => void
  setSelectedProject: (project: Project | null) => void
  overview: ProjectOverview | null
  setOverview: (overview: ProjectOverview | null) => void
}

export type Project = {
  id: string
  name: string
  description?: string
  createdAt: Date
}

export type ProjectOverview = {
  KPIs: {
    total: number
    active: number
    inactive: number
    averageCompletionRate: number
  }
  users: {
    total: number
    activeLastWeek: number
    completedAtLeastOne: number
  }
  circuits: CircuitWithInsights[]
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

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  selectedProject: null,
  overview: null,
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  setProjects: (projects) => set({ projects }),
  setSelectedProject: (project) => set({ selectedProject: project }),
  setOverview: (overview) => set({ overview }),
}))