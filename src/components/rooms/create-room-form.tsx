'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useTransition } from 'react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import type { Room } from '@/http/get-rooms'
import { queryClient } from '@/lib/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { createRoom } from '@/http/create-room'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  name: z.string().min(3, 'Please, provide a valid name.'),
  capacity: z.number().min(3),
})

type formSchema = z.infer<typeof formSchema>

type CreateRoomFormProps = {
  onSuccess: () => void
}

export default function CreateRoomForm({ onSuccess }: CreateRoomFormProps) {
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()

  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      capacity: 3,
    },
  })

  const { mutateAsync: createRoomFn } = useMutation({
    mutationFn: createRoom,
    onSuccess(data) {
      queryClient.setQueryData(['rooms'], (rooms: Room[]) => {
        return [...rooms, data.data]
      })
    },
  })

  function onSubmit(values: formSchema) {
    const { name, capacity } = values

    startTransition(async () => {
      const { error, data } = await createRoomFn({ name, capacity })

      if (error) {
        toast({ title: data as string, variant: 'destructive' })
        return
      }

      toast({ title: 'Room successfully created.', variant: 'sucess' })

      onSuccess()
    })
  }

  return (
    <div className="w-[450px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room name</FormLabel>
                <FormControl>
                  <Input placeholder="Room name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled
                    {...field}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {isPending ? (
              <Loader2 className="size-4 animate-ping" />
            ) : (
              'Create new room'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
