import { create } from 'zustand'

interface ProjectState {
  projects: Project[]
  addProject: (project: Project) => void
  setProjects: (projects: Project[]) => void
}

export type Project = {
  id: string
  name: string
  createdAt: string
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  setProjects: (projects) => set({ projects }),
}))