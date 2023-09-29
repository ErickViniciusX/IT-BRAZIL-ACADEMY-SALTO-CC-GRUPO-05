import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import produto, { Produtos } from '../models/Produto'
import { GetServerSideProps } from 'next'

type Props = {
  Produtos: Produtos[]
}

const Index = ({ Produtos }: Props) => {
  return (
    <>
      {Produtos.map((produto) => (
        <div key={produto._id}>
          <div className="card">
            <h5 className="produto-name">{produto.numero_serie}</h5>
            <div className="main-content">
              <p className="produto-name">{produto.nome}</p>
              <p className="owner">Fornecedor: {produto.fornecedor}</p>
              <div className="btn-container">
                <Link href={{ pathname: '/[id]/edit', query: { id: produto._id } }}>
                  <button className="btn edit">Edit</button>
                </Link>
                <Link href={{ pathname: '/[id]', query: { id: produto._id } }}>
                  <button className="btn view">View</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
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
