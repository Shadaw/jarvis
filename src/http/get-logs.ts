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
  try {
    const result = await axios.get<getLogsResponse>('/logs')

    return {
      error: false,
      data: result.data.data,
    }
  } catch (err) {
    return {
      error: true,
      data: [],
    }
  }
}
