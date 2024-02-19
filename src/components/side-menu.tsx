import { Link, useLocation } from 'react-router-dom'

export function SideMenu() {
  const location = useLocation()

  const dashboardLinks = [
    {
      label: 'Geral',
      to: '/',
    },
    {
      label: 'Audiência',
      to: '/audiencia',
    },
    {
      label: 'Conteúdo',
      to: '/conteudo',
    },
    {
      label: 'Relatório executivo',
      to: '/relatorio',
    },
    {
      label: 'Calendário',
      to: '/calendario',
    },
  ]

  return (
    <div className="pt-8">
      <div className="flex justify-center">
        <img alt="baroes-logo" src="./baroes-logo.png" />
      </div>
      <nav className="mt-10">
        <ul className="font-semibold text-gray-400">
          {dashboardLinks.map((menuItem) => {
            const activeClasses =
              location.pathname === menuItem.to ? ' bg-gray-100' : ''

            return (
              <li
                key={'menu-item-' + menuItem.label.toLowerCase()}
                className={'px-5 py-3' + activeClasses}
              >
                <Link to={menuItem.to}>{menuItem.label}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
