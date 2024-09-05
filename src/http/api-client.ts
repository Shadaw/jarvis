import axios from 'axios'
import { getCookie } from 'cookies-next'
import type { CookiesFn } from 'cookies-next/lib/types'

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

client.interceptors.request.use(
  async (config) => {
    let cookieStore: CookiesFn | undefined

    if (typeof window === 'undefined') {
      const { cookies: serverCookies } = await import('next/headers')
      cookieStore = serverCookies
    }

    const token = getCookie('token', { cookies: cookieStore })

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default client
