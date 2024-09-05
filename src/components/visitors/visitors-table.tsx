'use client'

import { useQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '../ui/data-table'
import Actions from './actions'

import { formatDate } from '@/lib/utils'
import { getVisitors, type Visitor } from '@/http/get-visitors'

export const columns: ColumnDef<Visitor>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
  },
  {
    accessorKey: 'cpf',
    header: 'CPF',
  },
  {
    accessorKey: 'room.name',
    header: 'Room',
  },
  {
    accessorKey: 'birthdate',
    header: 'Birth date',
  },
  {
    accessorKey: 'isVisiting',
    header: 'Status',
    cell: ({ row }) => {
      const { isVisiting } = row.original

      return (
        <div className="flex items-center gap-2">
          <span
            data-visiting={isVisiting}
            className="size-2 rounded-full bg-red-500 data-[visiting=true]:bg-green-500"
          />
          <span className="font-medium">{isVisiting ? 'visiting' : 'out'}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created at',
    cell: ({ row }) => {
      const { createdAt } = row.original

      return (
        <div className="flex items-center gap-2">{formatDate(createdAt)}</div>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return <Actions data={row.original} />
    },
  },
]

export default function VisitorsTable() {
  const { data } = useQuery({
    queryKey: ['visitors'],
    queryFn: getVisitors,
  })

  return <>{data && <DataTable columns={columns} data={data}></DataTable>}</>
}
