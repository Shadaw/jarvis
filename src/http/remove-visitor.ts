import type { AxiosError } from 'axios'

import axios from './api-client'

interface RemoveVisitorRequest {
  visitorId: string
}

interface RemoveVisitorResponse {
  message: string
}

export async function removeVisitor({ visitorId }: RemoveVisitorRequest) {
  try {
    const result = await axios.put<RemoveVisitorResponse>('/visitors', {
      visitorId,
    })

    return {
      error: false,
      data: result.data.message,
    }
  } catch (err) {
    const errorAxios = err as AxiosError<RemoveVisitorResponse>
    const errorMessage = errorAxios.response?.data

    return {
      error: true,
      data: errorMessage?.message ?? 'unexpected error',
    }
  }
}
