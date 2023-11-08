import { Produtos } from '@/models/Produto'
import React, { useMemo } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import Link from 'next/link'
import { Edit2, Eye } from 'lucide-react'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'

type CardProductProps = {
  produto: Produtos
}

type StockIndication = {
  variant: 'default' | 'secondary' | 'destructive'
  badgeMessage: string
}

export default function CardProduct({ produto }: CardProductProps) {
  const dateFormated = new Date(produto.data_aquisicao).toLocaleDateString('pt-BR');
  const showProgressBar = !!produto.quantidade_maxima

  const stockCount = useMemo(() => {
    return 100 * produto.quantidade / produto.quantidade_maxima
  }, [produto.quantidade, produto.quantidade_maxima]);

  const stockIndication: StockIndication = useMemo(() => {
    if (produto.quantidade <= produto.quantidade_minima) {
      return {
        variant: 'destructive',
        badgeMessage: 'Estoque baixo'
      }
    } else if (produto.quantidade > produto.quantidade_minima && produto.quantidade + 5 < produto.quantidade_maxima) {
      return {
        variant: 'secondary',
        badgeMessage: 'Estoque médio'
      }
    }
    return {
      variant: 'default',
      badgeMessage: 'Estoque alto'
    }

  }, [produto.quantidade, produto.quantidade_maxima, produto.quantidade_minima]);

  return (
    <Card className='m-4 rounded-md border p-2'>
      <CardHeader>
        <CardTitle className='text-md'>{produto.nome}</CardTitle>
        <CardDescription>
          {produto.numero_serie} - {produto.fornecedor}
        </CardDescription>
        <CardDescription>
          <Badge variant={stockIndication.variant}>{stockIndication.badgeMessage}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className='text-gray-500 text-sm text-left'>
        <p>Data de entrada: {dateFormated}</p>
        <p>Estoque atual: {produto.quantidade} {produto.unidade}</p>
        {showProgressBar && <Progress className={"mt-2"} value={stockCount} />}
      </CardContent>
      <CardFooter className="gap-4">
        <Button variant='outline' asChild>
          <Link className="gap-2" href={{ pathname: '/[id]/edit', query: { id: produto._id } }}>
            <Edit2 size={16} />
            Editar
          </Link>
        </Button>
        <Button variant="default" asChild>
          <Link className="gap-2" href={{ pathname: '/[id]', query: { id: produto._id } }}>
            <Eye size={16} />
            Visualizar
          </Link>
        </Button>
      </CardFooter>

    </Card>
  )
}
