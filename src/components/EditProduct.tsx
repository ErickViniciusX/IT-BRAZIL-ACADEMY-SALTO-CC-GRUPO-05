"use client"
import React from 'react'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '@/lib/utils'
import { Calendar } from './ui/calendar'
import { ptBR } from 'date-fns/locale'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Switch } from './ui/switch'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet'
import { useRouter } from 'next/router'
import { Produtos } from '@/models/Produto'

type CardProductProps = {
  produto: Produtos
}

const formSchema = z.object({
  numero_serie: z.string().min(2, { message: "O código precisa ter no mínimo 2 caracteres" }).max(50, { message: "O código precisa ter no máximo 50 caracteres" }),
  nome: z.string().min(1, { message: "O nome do produto é um campo obrigatório" }),
  quantidade: z.coerce.number(),
  quantidade_minima: z.coerce.number(),
  quantidade_maxima: z.coerce.number(),
  data_aquisicao: z.date({
    required_error: "A data de aquisição é obrigatória",
  }),
  fornecedor: z.string().min(1, { message: "O nome do fornecedor é um campo obrigatório" }),
  unidade: z.string().min(1, {
    message: "Selelcione um tipo de unidade",
  }),
  status: z.boolean(),
})

export default function EditProduct({ produto }: CardProductProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      numero_serie: produto.numero_serie,
      nome: produto.nome,
      quantidade: produto.quantidade,
      quantidade_minima: produto.quantidade_minima,
      quantidade_maxima: produto.quantidade_maxima,
      data_aquisicao: new Date(produto.data_aquisicao),
      fornecedor: produto.fornecedor,
      unidade: produto.unidade,
      status: produto.status,
    }
  })

  const maximumValue = form.watch('quantidade_maxima');

  const handleToggleSheet = () => {
    setIsOpen(!isOpen)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch(`/api/pets/${produto._id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        console.log(res)
        throw new Error(res.status.toString())
      }
      setIsOpen(false)

      router.replace(router.asPath)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleToggleSheet}>
      <Button className='w-full' variant={'outline'} onClick={handleToggleSheet}>Editar</Button>
      <SheetContent className='overflow-y-scroll'>
        <SheetHeader>
          <SheetTitle>Edite o cadastro de um produto</SheetTitle>
          <SheetDescription>
            Edite as informações do produto. Caso queira, você pode desabilitar o produto.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full my-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input type='number' max={maximumValue} placeholder="Quantidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantidade_minima"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade mínima</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder="Quantidade mínima" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantidade_maxima"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade máxima</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder="Quantidade máxima" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unidade</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma unidade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="UN">Unitário (UN)</SelectItem>
                      <SelectItem value="LT">Litros (LT)</SelectItem>
                      <SelectItem value="MM">Milimetro (MM)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Produto habilitado?
                    </FormLabel>
                    <FormDescription>
                      Se estiver ativo, o produto poderá ser utilizado.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit">Salvar alterações</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>

  )
}
