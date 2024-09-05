import axios from './api-client'

export type Log = {
  id: string
  action: 'CREATE' | 'ADD' | 'REMOVE'
  reference: string
  destination: string
  createdAt: string
  updatedAt: string
  user: {
    email: string
  }
}

interface getLogsResponse {
  data: Log[]
}

export async function getLogs() {
  const { data } = await axios.get<getLogsResponse>('/api/logs')

  return data.data
}
