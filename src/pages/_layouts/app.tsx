import { Navigate, Outlet } from 'react-router-dom'

import { ProjectSelector } from '@/components/project-selector'
import { SessionUserInfo } from '@/components/session-user-info'
import { SideMenu } from '@/components/side-menu'
import { useAuthStore } from '@/store/useAuthStore'

export function AppLayout() {
  const { authenticated, logout, ...userInfo } = useAuthStore()

  if (!authenticated) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className="flex h-full w-full">
      <section className="w-[218px] bg-white">
        <SideMenu />
        <SessionUserInfo
          name={userInfo.name}
          email={userInfo.email}
          avatarUrl={'https://avatars.githubusercontent.com/u/21312312312312'}
          logout={logout}
        />
      </section>
      <section className="grow overflow-y-auto p-5">
        <ProjectSelector />
        <div>
          <Outlet />
        </div>
      </section>
    </div>
  )
}
