import mongoose from 'mongoose'

export interface Produtos extends mongoose.Document {
  numero_serie: string
  nome: string
  quantidade: number
  quantidade_minima: number
  quantidade_maxima: number
  data_aquisicao: string
  fornecedor: string
  unidade: string
  status: boolean
}

/* Produtoschema will correspond to a collection in your MongoDB database. */
const ProdutoSchema = new mongoose.Schema<Produtos>({
  numero_serie: {
    type: String,
    required: [true, 'Insira o número de série'],
    minlength: [6, 'Você precisa inserir um número de série que contenha no mínimo 6 caracteres']
  },
  nome: {
    type: String,
    required: [true, 'O Nome é um campo obrigatório'],
    maxlength: [60, 'O Nome pode ter até 60 caracteres'],
  },
  quantidade: {
    type: Number,
    required: [true, "Quantidade é um campo obrigatório"]
  },
  quantidade_minima: {
    type: Number
  },
  quantidade_maxima: {
    type: Number
  },
  data_aquisicao: {
    type: String,
    required: [true, 'A data de aquisição é um campo obrigatório']
  },
  fornecedor: {
    type: String,
    required: [true, 'O Fornecedor é um campo obrigatório'],
  },
  unidade: {
    type: String,
    required: [true, 'A Unidade é um campo obrigatório'],
  },
  status: {
    type: Boolean
  }
})

export default mongoose.models.Produto || mongoose.model<Produtos>('Produto', ProdutoSchema)
