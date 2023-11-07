import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import { Edit2, Eye } from 'lucide-react'
import produto, { Produtos } from '../models/Produto'
import { GetServerSideProps } from 'next'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import MainLayout from '@/layouts/MainLayout'

type Props = {
  Produtos: Produtos[]
}

const Index = ({ Produtos }: Props) => {
  return (
    <div className='flex flex-row'>
      {Produtos.map((produto) => {
        const dateFormated = new Date(produto.data_aquisicao).toLocaleDateString('pt-BR')
        
      return (
        <Card key={produto._id} className='m-4 rounded-md border p-2'>
          <CardHeader>
            <CardTitle className='text-md'>{produto.nome}</CardTitle>
            <CardDescription>{produto.numero_serie} - {produto.fornecedor}</CardDescription>
          </CardHeader>
          <CardContent className='text-gray-500 text-sm text-left'>
            <p>{dateFormated}</p>
            <p>{produto.quantidade} {produto.unidade}</p>
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
      )}
      )}
    </div>
  )
}

Index.getLayout = function getLayout (page: React.ReactElement) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

/* Retrieves produto(s) data from mongodb database */
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect()

  /* find all the data in our database */
  const result = await produto.find({})

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const Produtos = result.map((doc) => {
    const produto = JSON.parse(JSON.stringify(doc))
    return produto
  })

  return { props: { Produtos: Produtos } }
}

export default Index
