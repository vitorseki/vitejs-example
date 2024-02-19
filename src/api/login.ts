import { api } from '@/lib/axios'

export interface LoginData {
  email: string
  password: string
}

export async function login({ email, password }: LoginData) {
  await api.post('auth/login', { email, password })
}
