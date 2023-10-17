import Form from '../components/Form'

const NewProdutos = () => {
  const produtosForm = {
    numero_serie: '',
    nome: '',
    quantidade: 0,
    data_aquisicao: '',
    fornecedor: '',
    unidade: '',
    status: false,
  }

  return <Form formId="add-pet-form" produtosForm={produtosForm} />
}

export default NewProdutos
