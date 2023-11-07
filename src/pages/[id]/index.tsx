import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import Produto, { Produtos } from '../../models/Produto'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import MainLayout from '@/layouts/MainLayout'

interface Params extends ParsedUrlQuery {
  id: string
}

type Props = {
  produto: Produtos
}

/* Allows you to view pet card info and delete pet card*/
const ProdutoPage = ({ produto }: Props) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const petID = router.query.id

    try {
      await fetch(`/api/pets/${petID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the pet.')
    }
  }

  return (
    <div key={produto._id}>
      <div className="card">
        <h5 className="pet-name">{produto.nome}</h5>
        <div className="main-content">
          <p className="pet-name">{produto.numero_serie}</p>
          <p className="owner">Fornecedor: {produto.fornecedor}</p>

          <div className="btn-container">
            <Link href={`/${produto._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}: GetServerSidePropsContext) => {
  await dbConnect()

  if (!params?.id) {
    return {
      notFound: true,
    }
  }

  const produto = await Produto.findById(params.id).lean()

  if (!produto) {
    return {
      notFound: true,
    }
  }

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const serializedProduto = JSON.parse(JSON.stringify(produto))

  return {
    props: {
      produto: serializedProduto,
    },
  }
}

ProdutoPage.getLayout = function getLayout (page: React.ReactElement) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}


export default ProdutoPage
