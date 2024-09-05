import type { AxiosError } from 'axios'

import axios from './api-client'
import type { Room } from './get-rooms'

interface AddVisitorRequest {
  name: string
  cpf: string
  destinationRoom: string
  email?: string
  birthdate?: string
}

interface ErrorResponse {
  message: string
}

export async function addVisitor({
  name,
  cpf,
  destinationRoom,
  email,
  birthdate,
}: AddVisitorRequest) {
  try {
    const result = await axios.post<Room[]>('/api/visitors', {
      name,
      cpf,
      destinationRoom,
      email,
      birthdate,
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
