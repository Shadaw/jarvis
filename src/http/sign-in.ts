import type { AxiosError } from 'axios'

import axios from './api-client'

interface SignInRequest {
  email: string
  password: string
}

interface SignInResponse {
  token: string
}

interface ErrorResponse {
  message: string
}

export async function signIn({ email, password }: SignInRequest) {
  try {
    const result = await axios.post<SignInResponse>('/api/auth', {
      email,
      password,
    })

    return {
      error: false,
      data: result.data.token,
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
