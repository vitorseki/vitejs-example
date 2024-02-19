import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import useProjects from '@/queries/useProjects'

export function Dashboard() {
  const { isLoading, isFetching, data, refetch } = useProjects()

  return (
    <>
      <Helmet title="Dashboard" />
      <div>
        <div>
          <Button onClick={() => refetch()}>Projects request</Button>
        </div>
        {isLoading && 'Carregando...'}
        {isFetching && 'Atualizando lista de projetos...'}
        <div>
          <h1 className="mt-10 font-bold">Projetos:</h1>
          {data?.map((project) => (
            <div key={'project-' + project.id}>{project.name}</div>
          ))}
        </div>
      </div>
    </>
  )
}
