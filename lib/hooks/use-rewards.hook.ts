import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../api'

export interface Reward {
  id: string
  name: string
  description: string
  stepId: string | null
  unlockOnCircuitCompletion: boolean
}

export function useRewards(circuitId?: string) {
  const queryClient = useQueryClient()

  const query = useQuery<Reward[]>({
    queryKey: ['rewards', circuitId],
    queryFn: async () => {
      try {
        if (!circuitId) {
          return []
        }

        const res = await api.get<Reward[]>(`/api/circuits/${circuitId}/rewards`)

        if (res.status === 200) {
          return res.data
        }

        throw new Error('Failed to fetch rewards')
      } catch (error) {
        throw error
      }
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!circuitId,
  })

  const addRewardMutation = useMutation({
    mutationFn: async ({ circuitId, reward }: { circuitId: string; reward: Omit<Reward, 'id'> }) => {
      const res = await api.post(`/api/circuits/${circuitId}/rewards`, reward)
      return res.data as Reward
    },
    onSuccess: (newReward, { circuitId }) => {
      queryClient.invalidateQueries({ queryKey: ['rewards', circuitId] })
    }
  })

  const addReward = async ({ circuitId, reward }: { circuitId: string; reward: Omit<Reward, 'id'> }) => {
    return addRewardMutation.mutateAsync({ circuitId, reward })
  }

  const updateRewardMutation = useMutation({
    mutationFn: async ({ circuitId, rewardId, reward }: { circuitId: string; rewardId: string; reward: Omit<Reward, 'id'> }) => {
      const res = await api.put(`/api/circuits/${circuitId}/rewards/${rewardId}`, reward)
      return res.data
    },
    onSuccess: (updatedReward, { circuitId }) => {
      queryClient.invalidateQueries({ queryKey: ['rewards', circuitId] })
    }
  })

  const updateReward = async ({ circuitId, rewardId, reward }: { circuitId: string; rewardId: string; reward: Omit<Reward, 'id'> }) => {
    return updateRewardMutation.mutateAsync({ circuitId, rewardId, reward })
  }

  const deleteRewardMutation = useMutation({
    mutationFn: async ({ circuitId, rewardId }: { circuitId: string; rewardId: string }) => {
      const res = await api.delete(`/api/circuits/${circuitId}/rewards/${rewardId}`)
      return res.data
    },
    onSuccess: (_, { circuitId }) => {
      queryClient.invalidateQueries({ queryKey: ['rewards', circuitId] })
    }
  })

  const deleteReward = async ({ circuitId, rewardId }: { circuitId: string; rewardId: string }) => {
    return deleteRewardMutation.mutateAsync({ circuitId, rewardId })
  }

  return {
    ...query,
    rewards: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    addReward,
    updateReward,
    deleteReward,
  }
} 