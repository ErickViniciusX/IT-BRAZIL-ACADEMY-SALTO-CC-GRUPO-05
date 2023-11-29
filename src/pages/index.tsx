'use client'
import dbConnect from '../lib/dbConnect'
import produto, { Produtos } from '../models/Produto'
import { GetServerSideProps } from 'next'
import CardProduct from '@/components/CardProduct'
import MainLayout from '@/layouts/MainLayout'
import nookies from 'nookies'

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

Index.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

/* Retrieves produto(s) data from mongodb database */
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const cookies = nookies.get(ctx)

  if (!cookies.isAutenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  await dbConnect()

  const result = await produto.find({})
  const Produtos = result.map((doc) => {
    const produto = JSON.parse(JSON.stringify(doc))
    return produto
  })

  return { props: { Produtos: Produtos } }
}

export default Index
