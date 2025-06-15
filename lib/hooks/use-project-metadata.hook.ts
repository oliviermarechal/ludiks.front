import { useQuery } from '@tanstack/react-query'
import api from '../api'

export type ProjectMetadata = {
	id: string;
	projectId: string;
	keyName: string;
	createdAt: Date;
	values: MetadataValue[];
}

export type MetadataValue = {
	id: string;
	projectMetadataKeyId: string;
	value: string;
	createdAt: Date;
}

export function useProjectMetadatas(projectId: string) {
  const query = useQuery<ProjectMetadata[]>({
    queryKey: ['projectMetadatas', projectId],
    queryFn: async () => {
      try {
        if (!projectId) {
          return []
        }

        const res = await api.get<ProjectMetadata[]>(`/api/projects/${projectId}/metadata`)

        if (res.status === 200) {
          return res.data
        }

        throw new Error('Failed to fetch project metadata')
      } catch (error) {
        throw error
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  return {
    ...query,
    projectMetadatas: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
  }
} 