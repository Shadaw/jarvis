import type { AxiosError } from 'axios'

import axios from './api-client'

interface SignUpRequest {
  name: string
  email: string
  password: string
}

interface SignUpResponse {
  message: string
}

export async function SignUp({ name, email, password }: SignUpRequest) {
  try {
    const result = await axios.post<SignUpResponse>('/users', {
      name,
      email,
      password,
    })

    return {
      error: false,
      data: result.data.message,
    }
  } catch (err) {
    const errorAxios = err as AxiosError<SignUpResponse>
    const errorMessage = errorAxios.response?.data

    return {
      error: true,
      data: errorMessage?.message ?? 'Unexpected error',
    }
  }
}
