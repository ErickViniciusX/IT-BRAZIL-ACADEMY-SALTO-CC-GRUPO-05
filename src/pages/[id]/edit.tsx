import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../components/Form'

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditPet = () => {
  const router = useRouter()
  const { id } = router.query
  const {
    data: produto,
    error,
    isLoading,
  } = useSWR(id ? `/api/pets/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (isLoading) return <p>Loading...</p>
  if (!produto) return null

  const produtosForm = {
    numero_serie: produto.numero_serie,
    nome: produto.nome,
    quantidade: produto.quantidade,
    data_aquisicao: produto.data_aquisicao,
    fornecedor: produto.fornecedor,
    unidade: produto.unidade,
    status: produto.status,
  }

  return <Form formId="edit-pet-form" produtosForm={produtosForm} forNewPet={false} />
}

export default EditPet
