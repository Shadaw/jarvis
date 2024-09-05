'use client'

import { useMutation } from '@tanstack/react-query'
import { Bolt, CircleX } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Table, TableBody, TableCell, TableRow } from '../ui/table'
import { Avatar, AvatarFallback } from '../ui/avatar'

import type { Room } from '@/http/get-rooms'
import { getInitials } from '@/lib/utils'
import { removeVisitor } from '@/http/remove-visitor'
import { useToast } from '@/hooks/use-toast'
import { queryClient } from '@/lib/react-query'

type ViewRoomModalProps = {
  room: Room
}

export default function ViewRoomModal({ room }: ViewRoomModalProps) {
  const { toast } = useToast()

  const { mutateAsync: handleRemoveVisitor } = useMutation({
    mutationFn: removeVisitorFn,
    onSuccess(_, id) {
      queryClient.setQueryData(['rooms'], (rooms: Room[]) => {
        return rooms.map((room) => ({
          ...room,
          visitors: room.visitors.filter((visitor) => visitor.id !== id),
        }))
      })
    },
  })

  async function removeVisitorFn(id: string) {
    const { error, data } = await removeVisitor({ visitorId: id })

    if (error) {
      toast({ title: data, variant: 'destructive' })
      return
    }

    toast({ title: 'Visitor successfully removed.', variant: 'sucess' })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Bolt className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-950">
        <DialogHeader>
          <DialogTitle>{room.name}</DialogTitle>
          <Table className="mt-4">
            <TableBody>
              {room.visitors.map((visitor) => (
                <TableRow key={visitor.id} className="flex justify-between">
                  <TableCell className="flex gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {getInitials(visitor.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p>{visitor.email}</p>
                      <p className="text-sm text-muted-foreground">
                        {visitor.cpf}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <Button
                      onClick={() => handleRemoveVisitor(visitor.id)}
                      className="gap-2"
                      variant="destructive"
                    >
                      Remove
                      <CircleX className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
