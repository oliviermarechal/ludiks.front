import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../stores/user-store'
import api from '../api'

export function useAuth({ redirectToLogin = true } = {}) {
  const { token, setUser, logout } = useAuthStore()

  const query = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      try {
        const res = await api.get('/api/accounts/me')

        if (res.status === 200) {
          setUser(res.data)
          return res.data
        }

        if (redirectToLogin) {
          logout()
        }
        throw new Error('Not authenticated')
      } catch (error) {
        if (redirectToLogin) {
          logout()
        }
        throw error
      }
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  })

  return {
    ...query,
    isAuthenticated: !!token && !query.isError,
    user: query.data,
  }
}