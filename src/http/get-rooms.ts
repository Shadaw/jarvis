import axios from './api-client'

export type Room = {
  id: string
  name: string
  capacity: number
  createdAt: string
  updatedAt: string
  visitors: {
    id: string
    name: string
    email: string
    cpf: string
  }[]
}

interface getRoomsResponse {
  data: Room[]
}

export async function getRooms() {
  const { data } = await axios.get<getRoomsResponse>('/rooms')

  return data.data
}
