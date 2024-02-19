import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { Audience } from './pages/app/audience'
import { Calendar } from './pages/app/calendar'
import { Content } from './pages/app/content'
import { Dashboard } from './pages/app/dashboard'
import { ExecutiveReport } from './pages/app/executive-report'
import { Login } from './pages/auth/login'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/audiencia', element: <Audience /> },
      { path: '/conteudo', element: <Content /> },
      { path: '/relatorio', element: <ExecutiveReport /> },
      { path: '/calendario', element: <Calendar /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [{ path: '/login', element: <Login /> }],
  },
])
