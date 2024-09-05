'use client'

import { useTransition } from 'react'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useToast } from '@/hooks/use-toast'
import { addVisitor } from '@/http/add-visitor'
import { queryClient } from '@/lib/react-query'
import type { Visitor } from '@/http/get-visitors'
import { zodResolver } from '@hookform/resolvers/zod'
import { formatBirthdate, formatCpf } from '@/lib/utils'
import { getRoomsAvailable } from '@/http/get-rooms-available.tsx'

const formSchema = z.object({
  name: z.string().min(3, 'Please, provide a valid name.'),
  cpf: z.string().min(14, 'Please, provide a valid cpf'),
  destinationRoom: z.string().min(1, 'Please, provide a valid room'),
  email: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.string().email().optional(),
  ),
  birthdate: z.string().optional(),
})

type formSchema = z.infer<typeof formSchema>

type NewVisitorFormProps = {
  onSuccess: () => void
}

export default function NewVisitorForm({ onSuccess }: NewVisitorFormProps) {
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()

  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      destinationRoom: '',
      birthdate: '',
      cpf: '',
    },
  })

  const { data: roomsAvailable } = useQuery({
    queryKey: ['rooms_available'],
    queryFn: getRoomsAvailable,
  })

  const { mutateAsync: addVisitorFn } = useMutation({
    mutationFn: addVisitor,
    onSuccess(data) {
      if (!data.error) {
        queryClient.setQueryData(['visitors'], (visitors: Visitor[]) => {
          return [...visitors, data.data]
        })
      }
    },
  })

  function onSubmit(values: formSchema) {
    const { name, cpf, destinationRoom, email, birthdate } = values

    startTransition(async () => {
      const { error, data } = await addVisitorFn({
        name,
        cpf,
        destinationRoom,
        email,
        birthdate,
      })

      if (error) {
        toast({ title: data as string, variant: 'destructive' })
        return
      }

      toast({ title: 'Visitor successfully added.', variant: 'sucess' })
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
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cpf"
            render={({ field: { onChange, ...props } }) => (
              <FormItem>
                <FormLabel>CPF *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="cpf"
                    onChange={(e) => {
                      const { value } = e.target

                      e.target.value = formatCpf(value)

                      onChange(e)
                    }}
                    {...props}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="destinationRoom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination room *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a room" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roomsAvailable &&
                      roomsAvailable.map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          {room.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthdate"
            render={({ field: { onChange, ...props } }) => (
              <FormItem>
                <FormLabel>Birth date</FormLabel>
                <FormControl>
                  <Input
                    placeholder="birthdate"
                    onChange={(e) => {
                      const { value } = e.target

                      e.target.value = formatBirthdate(value)

                      onChange(e)
                    }}
                    {...props}
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
              'Register visitor'
            )}
          </Button>

          <span className="text-sm text-muted-foreground text-center mt-5 block">
            * required fields
          </span>
        </form>
      </Form>
    </div>
  )
}
