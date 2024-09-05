'use client'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import CreateRoomForm from './create-room-form'

export default function CreateRoomModal() {
  const [open, setOpen] = useState(false)

  function handleCloseModal() {
    setOpen((value) => !value)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create a room</Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-950">
        <DialogHeader>
          <DialogTitle>Create a room</DialogTitle>
          <DialogDescription>
            fill in the information to create a new room
          </DialogDescription>
          <CreateRoomForm onSuccess={handleCloseModal} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
