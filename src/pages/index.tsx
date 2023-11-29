'use client'
import dbConnect from '../lib/dbConnect'
import produto, { Produtos } from '../models/Produto'
import { GetServerSideProps } from 'next'
import CardProduct from '@/components/CardProduct'

type Props = {
  Produtos: Produtos[]
}

const Index = ({ Produtos }: Props) => {

  return (
    <>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {Produtos.map((produto) => {
          return (
            <CardProduct key={produto._id} produto={produto} />
          )
        }
        )}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect()

  const result = await produto.find({})
  const Produtos = result.map((doc) => {
    const produto = JSON.parse(JSON.stringify(doc))
    return produto
  })

  return { props: { Produtos: Produtos } }
}

export default Index
