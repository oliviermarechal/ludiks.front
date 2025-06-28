import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../api'

interface User {
  id: string
  email: string
}

interface AuthResponse {
  token: string
  user: User
}

interface LoginCredentials {
  email: string
  password: string
}

interface RegistrationCredentials {
  email: string
  password: string
  inviteId?: string
}

const getToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

const setToken = (token: string | null): void => {
  if (typeof window === 'undefined') return
  if (token) {
    localStorage.setItem('token', token)
  } else {
    localStorage.removeItem('token')
  }
}

const loginApi = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const res = await api.post('/api/accounts/login', credentials)
    
    if (res.status === 200) {
      return res.data
    }
    
    throw new Error('Invalid credentials')
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status: number } }
      if (axiosError.response?.status === 400 || axiosError.response?.status === 401) {
        throw new Error('Invalid credentials')
      }
    }
    
    throw new Error('Connection error')
  }
}

const registrationApi = async (credentials: RegistrationCredentials): Promise<AuthResponse> => {
  try {
    const res = await api.post('/api/accounts/registration', credentials)
    
    if (res.status === 201) {
      return res.data
    }
    
    if (res.status === 400) {
      throw new Error(res.data || 'Registration failed')
    }
    
    throw new Error('Registration failed')
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status: number, data: string } }
      if (axiosError.response?.status === 400) {
        throw new Error(axiosError.response.data || 'Registration failed')
      }
    }
    
    if (error instanceof Error) {
      throw error
    }
    
    throw new Error('Connection error')
  }
}

const getCurrentUserApi = async (): Promise<User> => {
  const res = await api.get('/api/accounts/me')
  
  if (res.status === 200) {
    return res.data
  }
  
  throw new Error('Not authenticated')
}

const googleAuthApi = async (data: {idToken: string, inviteId?: string}): Promise<AuthResponse> => {
  try {
    const res = await api.post('/api/accounts/google-auth', { idToken:data.idToken, inviteId:data.inviteId })
    
    if (res.status === 201) {
      return res.data
    }
    
    if (res.status === 400) {
      throw new Error(res.data || 'Google authentication failed')
    }
    
    throw new Error('Google authentication failed')
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status: number, data: string } }
      if (axiosError.response?.status === 400) {
        throw new Error(axiosError.response.data || 'Google authentication failed')
      }
    }
    
    if (error instanceof Error) {
      throw error
    }
    
    throw new Error('Connection error')
  }
}

export function useAuth({ redirectToLogin = true } = {}) {
  const queryClient = useQueryClient()
  const token = getToken()

  const userQuery = useQuery({
    queryKey: ['me'],
    queryFn: getCurrentUserApi,
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  })

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setToken(data.token)
      queryClient.setQueryData(['me'], data.user)
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
    onError: () => {
      setToken(null)
      queryClient.removeQueries({ queryKey: ['me'] })
    }
  })

  const registrationMutation = useMutation({
    mutationFn: registrationApi,
    onSuccess: (data) => {
      setToken(data.token)
      queryClient.setQueryData(['me'], data.user)
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
    onError: () => {
      setToken(null)
      queryClient.removeQueries({ queryKey: ['me'] })
    }
  })

  const googleAuthMutation = useMutation({
    mutationFn: googleAuthApi,
    onSuccess: (data) => {
      setToken(data.token)
      queryClient.setQueryData(['me'], data.user)
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
    onError: () => {
      setToken(null)
      queryClient.removeQueries({ queryKey: ['me'] })
    }
  })

  const logout = () => {
    setToken(null)
    queryClient.removeQueries({ queryKey: ['me'] })
    queryClient.clear()
  }

  const requireAuth = () => {
    if (!token || userQuery.isError) {
      if (redirectToLogin) {
        logout()
        window.location.href = '/auth/login'
      }
      return false
    }
    return true
  }

  return {
    user: userQuery.data,
    token,
    isAuthenticated: !!token && !userQuery.isError,
    isLoading: userQuery.isLoading,
    isError: userQuery.isError,
    
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    registration: registrationMutation.mutate,
    registrationAsync: registrationMutation.mutateAsync,
    googleAuth: googleAuthMutation.mutate,
    googleAuthAsync: googleAuthMutation.mutateAsync,
    logout,
    requireAuth,
    
    isLoginLoading: loginMutation.isPending,
    isRegistrationLoading: registrationMutation.isPending,
    isGoogleAuthLoading: googleAuthMutation.isPending,
    loginError: loginMutation.error,
    registrationError: registrationMutation.error,
    googleAuthError: googleAuthMutation.error,
  }
}