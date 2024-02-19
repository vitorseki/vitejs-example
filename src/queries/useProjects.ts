import { useQuery } from 'react-query'

import { api } from '@/lib/axios'

interface ProjectsResponse {
  data: {
    id: number
    name: string
    image: string
  }[]
}

interface Project {
  id: number
  name: string
  image: string
}

async function fetchGroups() {
  const projectsResponse = await api.get<ProjectsResponse>('/projects')

  const projects = projectsResponse.data.data.map((projectItem) => ({
    id: projectItem.id,
    name: projectItem.name,
    image: projectItem.image,
  }))

  return projects
}

export default function useProjects() {
  return useQuery<Project[], Error>('projects', fetchGroups, {
    refetchOnWindowFocus: false,
    staleTime: 86400000,
    retry: false,
  })
}
