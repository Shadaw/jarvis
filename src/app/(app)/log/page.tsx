'use client'

import LogData from '@/components/log/log-table'

import { getLogs } from '@/http/get-logs'
import { useQuery } from '@tanstack/react-query'

export default function Log() {
  const { data } = useQuery({
    queryKey: ['logs'],
    queryFn: getLogs,
  })

  return (
    <div className="flex-1">
      <h2 className="text-3xl font-bold mb-6 tracking-tight">Log</h2>
      {data && (<LogData data={data} />)}
    </div>
  )
}
