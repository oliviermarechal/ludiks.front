import api from "@/lib/api"

export default async function registrationAction(email: string, password: string): Promise<{ 
  data: { token: string, user: { id: string, email: string } } | null,
  error: string | null
}> {
  const res = await api.post('/api/accounts/registration', { email, password })

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
