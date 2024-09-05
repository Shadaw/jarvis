import LogData from '@/components/log/log-table'

import { getLogs } from '@/http/get-logs'

export default async function Log() {
  const { data } = await getLogs()

  return (
    <div className="flex-1">
      <h2 className="text-3xl font-bold mb-6 tracking-tight">Log</h2>
      <LogData data={data} />
    </div>
  )
}
