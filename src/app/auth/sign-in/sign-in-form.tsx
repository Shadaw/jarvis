'use client'

import { z } from 'zod'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

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

import { signIn } from '@/http/sign-in'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  email: z.string().email('Please, provide a valid e-mail address.'),
  password: z.string().min(1, 'Please, provide your password.'),
})

type formSchema = z.infer<typeof formSchema>

export default function SignInForm() {
  const { toast } = useToast()
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: formSchema) {
    const { email, password } = values

    startTransition(async () => {
      const { error, data } = await signIn({ email, password })

      if (error) {
        toast({ title: data, variant: 'destructive' })
        return
      }

      toast({ title: 'Successfully logged in', variant: 'sucess' })
      router.push('/')
    })
  }

  return (
    <div className="w-[500px]">
      <h1 className="text-2xl mb-6 font-bold text-center">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <FormLabel>E-mail</FormLabel>
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
              'Sign in'
            )}
          </Button>

          <Button variant="link" className="w-full" size="sm" asChild>
            <Link href="/auth/sign-up">Create new account</Link>
          </Button>
        </form>
      </Form>
    </div>
  )
}
