import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { setCookie } from 'nookies'
import { useRouter } from 'next/router'

const formSchema = z.object({
  username: z.string().min(2, { message: "O nome de usuário precisa ter no mínimo 2 caracteres" }).max(50, { message: "O nome de usuário precisa ter no máximo 50 caracteres" }),
  password: z.string().min(6, { message: "A senha precisa ter no mínimo 6 caracteres" }),
})

export default function Login() {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const response = await res.json();

      if (!response.success) {
        throw new Error(response.message)
      }
      setError(null)

      setCookie(null, 'isAutenticated', 'true', {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      })
      router.push('/')
    } catch (error: any) {
      setError(error.message as string)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full my-4 text-start">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu usuário" {...field} />
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
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type='password' placeholder="Digite sua senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (<Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>)}

        <Button type="submit">Entrar</Button>
      </form>
    </Form>
  )
}
