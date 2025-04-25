import api from "@/lib/api"

export default async function googleAuthAction(idToken: string): Promise<{ 
  data: { token: string, user: { id: string, email: string } } | null,
  error: string | null
}> {
  const res = await api.post('/api/accounts/google-auth', { idToken })

  if (res.status === 400) {
    return {
      data: null,
      error: res.data
    }
  }

  return {
    data: res.data,
    error: null
  }
}
