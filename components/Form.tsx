import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

interface FormData {
  numero_serie: string
  nome: string
  quantidade: number
  data_aquisicao: string
  fornecedor: string
  unidade: string
  status: boolean
}

interface Error {
  name?: string
  owner_name?: string
  species?: string
  image_url?: string
}

type Props = {
  formId: string
  produtosForm: FormData
  forNewPet?: boolean
}

const Form = ({ formId, produtosForm, forNewPet = true }: Props) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    numero_serie: produtosForm.numero_serie,
    nome: produtosForm.nome,
    quantidade: produtosForm.quantidade,
    data_aquisicao: produtosForm.data_aquisicao,
    fornecedor: produtosForm.fornecedor,
    unidade: produtosForm.unidade,
    status: produtosForm.status,
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form: FormData) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/pets/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString())
      }

      const { data } = await res.json()

      mutate(`/api/pets/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update pet')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form: FormData) => {
      form.quantidade = Number(form.quantidade);
    try {
      const res = await fetch('/api/pets', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        console.log(res)
        throw new Error(res.status.toString())
      }

      router.push('/')
    } catch (error) {
      setMessage('Failed to add pet')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target
    const value =
      target.name === 'status'
        ? (target as HTMLInputElement).checked
        : target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  // const formValidate = () => {
  //   let err: Error = {}
  //   if (!form.numero_serie) err.numero_serie = 'Name is required'
  //   if (!form.owner_name) err.owner_name = 'Owner is required'
  //   if (!form.species) err.species = 'Species is required'
  //   if (!form.image_url) err.image_url = 'Image URL is required'
  //   return err
  // }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // const errs = formValidate()

      forNewPet ? postData(form) : putData(form)
  }

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="numero_serie">Número de Série</label>
        <input
          type="text"
          maxLength={20}
          name="numero_serie"
          value={form.numero_serie}
          onChange={handleChange}
          required
        />

        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          maxLength={20}
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <label htmlFor="quantidade">Quantidade</label>
        <input
          type="number"
          maxLength={30}
          name="quantidade"
          value={form.quantidade}
          onChange={handleChange}
          required
        />

        <label htmlFor="data_aquisicao">Data de Aquisicao</label>
        <input
          type="text"
          name="data_aquisicao"
          value={form.data_aquisicao}
          onChange={handleChange}
          required
        />

        <label htmlFor="fornecedor">Fornecedor</label>
        <textarea
          name="fornecedor"
          maxLength={60}
          value={form.fornecedor}
          onChange={handleChange}
          required
        />

        <label htmlFor="unidade">Unidade</label>
        <input
          type="text"
          name="unidade"
          value={form.unidade}
          onChange={handleChange}
          required
        />

        <label htmlFor="status">Status</label>
        <input
          type="checkbox"
          name="status"
          checked={form.status}
          onChange={handleChange}
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default Form
