import mongoose from 'mongoose'

export interface Users extends mongoose.Document {
  usuario: string
  senha: string
}

/* Produtoschema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema<Users>({
    usuario: {
    type: String,
    required: [true, 'Insira o usuário'],
    maxlength: [40, 'O usuário pode ter até 40 caracteres'],
    minlength: [4, 'O usuário pode ter no minino 4 caracteres']
  },
  senha : {
    type: String,
    required: [true, 'Insira a senha']
  }
})

export default mongoose.models.User || mongoose.model<Users>('User', UserSchema)
