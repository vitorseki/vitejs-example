import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <Outlet />
    </section>
  )
  /* 
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg font-medium text-foreground">
          Logo aqui
          <span>Logo aqui</span>
        </div>

        <footer>Painel do parceiro</footer>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  ) */
}
