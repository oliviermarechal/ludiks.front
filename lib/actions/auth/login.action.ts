import api from "@/lib/api"

export default async function loginAction(email: string, password: string): Promise<{ token: string, user: { id: string, email: string } }> {
  const res = await api.post('/api/accounts/login', { email, password })

  if (res.status !== 200) {
    throw new Error('Invalid credentials')
  }

  return res.data
}
