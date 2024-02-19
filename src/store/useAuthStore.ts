import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'

interface SetAuthParams {
  userId: number
  name: string
  email: string
  token: string
  roles: string[]
}

interface AuthStoreState {
  authenticated: boolean
  userId: number
  token: string
  name: string
  email: string
  roles: string[]
  setAuth: (authData: SetAuthParams) => void
  logout: () => void
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => {
      return {
        authenticated: false,
        userId: 0,
        name: '',
        email: '',
        roles: [],
        token: '',

        setAuth: (authData: SetAuthParams) => {
          set({
            authenticated: true,
            userId: authData.userId,
            token: authData.token,
            name: authData.name,
            email: authData.email,
            roles: authData.roles,
          })
        },

        logout: () => {
          set({
            authenticated: false,
            token: '',
            roles: [],
          })
        },
      }
    },
    {
      name: 'auth-store',
      onRehydrateStorage: () => {
        return (state, error) => {
          if (state === undefined || error) {
            return
          }

          if (state.authenticated && state.token) {
            api.defaults.headers.Authorization = `Bearer ${state.token}`
          }
        }
      },
    },
  ),
)
