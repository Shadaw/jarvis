import axios from './api-client'

export type Visitor = {
  id: string
  name: string
  email: string
  cpf: string
  birthdate: string
  isVisiting: boolean
  createdAt: string
  updatedAt: string
  room: {
    name: string
  }
}

interface SignUpResponse {
  data: Visitor[]
}

export async function getVisitors() {
  const { data: response } = await axios.get<SignUpResponse>('/visitors')

  return response.data
}
