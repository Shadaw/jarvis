import { CircleX, MoreHorizontal } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'

import type { Visitor } from '@/http/get-visitors'
import { removeVisitor } from '@/http/remove-visitor'
import { useToast } from '@/hooks/use-toast'
import { queryClient } from '@/lib/react-query'

type ActionsProps = {
  data: Visitor
}

export default function Actions({ data }: ActionsProps) {
  const { toast } = useToast()

  const { mutateAsync: handleRemoveVisitor } = useMutation({
    mutationFn: handleRemoveVisitorFn,
    onSuccess(_, visitorId) {
      queryClient.setQueryData(['visitors'], (visitors: Visitor[]) => {
        return visitors.map((visitor) => ({
          ...visitor,
          isVisiting: visitorId === visitor.id ? false : visitor.isVisiting,
        }))
      })
    },
  })

  async function handleRemoveVisitorFn(visitorId: string) {
    const { error, data } = await removeVisitor({ visitorId })

    if (error) {
      toast({ title: data as string, variant: 'destructive' })
      return
    }

    toast({ title: 'Visitor successfully removed.', variant: 'sucess' })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => handleRemoveVisitor(data.id)}
          disabled={!data.isVisiting}
          className="gap-2"
        >
          Remove
          <CircleX className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
