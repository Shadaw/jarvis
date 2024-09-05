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
import NewVisitorForm from './new-visitor-form'

export default function NewVisitorModal() {
  const [open, setOpen] = useState(false)

  function handleCloseModal() {
    setOpen((value) => !value)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Visitor</Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-950">
        <DialogHeader>
          <DialogTitle>New Visitor</DialogTitle>
          <DialogDescription>
            fill in the information to add a new visitor
          </DialogDescription>
          <NewVisitorForm onSuccess={handleCloseModal} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
