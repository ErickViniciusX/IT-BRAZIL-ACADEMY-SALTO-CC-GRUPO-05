import { Produtos } from '@/models/Produto'
import React, { useMemo } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import Link from 'next/link'
import { Edit2, Eye, Delete, LucideDelete, XIcon, Trash, BatteryLow } from 'lucide-react'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import EditProduct from './EditProduct'

type CardProductProps = {
  produto: Produtos
}

type StockIndication = {
  badgeMessage: string
}

export default function CardProduct({ produto }: CardProductProps) {
  const dateFormated = new Date(produto.data_aquisicao).toLocaleDateString('pt-BR');
  const showProgressBar = !!produto.quantidade_maxima

  const stockCount = useMemo(() => {
    return 100 * produto.quantidade / produto.quantidade_maxima
  }, [produto.quantidade, produto.quantidade_maxima]);

  return (
    <Card className='m-4 rounded-md border p-2'>
      <CardHeader>
        <CardTitle className='text-md'>{produto.nome}</CardTitle>
        <CardDescription>
          {produto.numero_serie} - {produto.fornecedor}
        </CardDescription>
        <CardDescription>
          {produto.quantidade < produto.quantidade_minima && (
            <div className='flex flex-row items-center gap-3'>
              <BatteryLow color='#fb923c' />
              <h4 className="text-sm font-medium leading-none text-orange-400">Atenção ao baixo estoque</h4>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className='text-gray-500 text-sm text-left'>
        <p>Data de entrada: {dateFormated}</p>
        <p>Estoque atual: {produto.quantidade} {produto.unidade}</p>
        {showProgressBar && <Progress className={"mt-2"} value={stockCount} />}
      </CardContent>
      <CardFooter className="gap-4">
        <EditProduct produto={produto} />
        <Button className='w-full' variant="destructive">
          Excluir
        </Button>
      </CardFooter>

    </Card>
  )
}
