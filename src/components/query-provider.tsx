'use client'

import type { ReactNode } from 'react'
import { QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'

type QueryClientProviderProps = {
  children: ReactNode
}

export default function QueryClientProvider({
  children,
}: QueryClientProviderProps) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  )
}
