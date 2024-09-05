import axios from './api-client'

interface getRoomsResponse {
  id: string
  name: string
}

export async function getRoomsAvailable() {
  const { data } = await axios.get<getRoomsResponse[]>('/api/rooms-available')

  return data
}
