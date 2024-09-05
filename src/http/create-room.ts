import type { AxiosError } from 'axios'

import axios from './api-client'
import type { Room } from './get-rooms'

interface CreateRoomRequest {
  name: string
  capacity: number
}

interface ErrorResponse {
  message: string
}

export async function createRoom({ name, capacity }: CreateRoomRequest) {
  try {
    const result = await axios.post<Room[]>('/rooms', {
      name,
      capacity,
    })

    return {
      error: false,
      data: result.data,
    }
  } catch (err) {
    const errorAxios = err as AxiosError<ErrorResponse>
    const errorMessage = errorAxios.response?.data

    return {
      error: true,
      data: errorMessage?.message ?? 'unexpected error',
    }
  }
}
