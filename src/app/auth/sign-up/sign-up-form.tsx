'use client'

import { z } from 'zod'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

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

import { SignUp } from '@/http/sign-out'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z
  .object({
    name: z.string().min(3, 'Please, provide a valid name.'),
    email: z.string().email('Please, provide a valid e-mail'),
    password: z.string().min(6, 'The password must have at least 6 characters'),
    password_confirmation: z.string(),
  })
  .refine((fields) => fields.password === fields.password_confirmation, {
    path: ['password_confirmation'],
    message: "the passwords don't match",
  })

type formSchema = z.infer<typeof formSchema>

export default function SignUpForm() {
  const { toast } = useToast()
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  })

  async function onSubmit(values: formSchema) {
    const { name, email, password } = values

    startTransition(async () => {
      const { error, data } = await SignUp({ name, email, password })

      if (error) {
        toast({ title: data, variant: 'destructive' })
        return
      }

      toast({ title: data, variant: 'sucess' })
      router.push('/auth/sign-in')
    })
  }

  return (
    <div className="w-[500px]">
      <h1 className="text-2xl mb-6 font-bold text-center">Create an account</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm your password</FormLabel>
                <FormControl>
                  <Input placeholder="******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {isPending ? (
              <Loader2 className="size-4 animate-ping" />
            ) : (
              'Create account'
            )}
          </Button>

          <Button variant="link" className="w-full" size="sm" asChild>
            <Link href="/auth/sign-in">Already have an account? sign in</Link>
          </Button>
        </form>
      </Form>
    </div>
  )
}
