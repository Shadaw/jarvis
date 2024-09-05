import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

import type { Log } from '@/http/get-logs'
import { formatDate } from '@/lib/utils'

type LogTableProps = {
  data: Log[]
}

export default function LogTable({ data }: LogTableProps) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Identification</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.id}</TableCell>
              <TableCell>{log.user.email}</TableCell>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.reference}</TableCell>
              <TableCell>{log.destination}</TableCell>
              <TableCell>{formatDate(log.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
