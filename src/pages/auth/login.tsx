import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'
import { useAuthStore } from '@/store/useAuthStore'

const loginForm = z.object({
  email: z.string().email(),
  password: z.string(),
})

type LoginForm = z.infer<typeof loginForm>

type LoginResponse = {
  data: {
    userId: number
    email: string
    name: string
    access_token: string
  }
}

type MeResponse = {
  data: {
    roles: string[]
  }
}

export function Login() {
  queryClient.invalidateQueries()
  queryClient.getQueryCache().clear()

  const navigate = useNavigate()

  const { setAuth } = useAuthStore()

  const [authFailed, setAuthFailed] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginForm>()

  async function handleLogin({ email, password }: LoginForm) {
    try {
      setAuthFailed(false)

      const loginResponse = await api.post<LoginResponse>('auth/login', {
        email,
        password,
      })

      const loginData = loginResponse.data.data

      api.defaults.headers.Authorization = `Bearer ${loginData.access_token}`

      const meResponse = await api.get<MeResponse>('auth/me')

      const meData = meResponse.data.data

      setAuth({
        userId: loginData.userId,
        email: loginData.email,
        name: loginData.name,
        token: loginData.access_token,
        roles: meData.roles,
      })

      navigate('/')
    } catch (err) {
      setAuthFailed(true)
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h2 className="text-xl font-semibold leading-tight">Login</h2>
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" {...register('email')}></Input>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                ></Input>
              </div>

              <div className="mt-0">
                <Button
                  disabled={isSubmitting}
                  className="mt-4 w-full"
                  type="submit"
                >
                  Acessar painel
                </Button>

                {authFailed && (
                  <p className="mt-4 text-red-600">
                    Credenciais inválidas. Por favor, tente novamente.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
