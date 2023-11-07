import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        const newProduct = await User.find({
            usuario: req.body.username,
            senha: req.body.password
        }).exec() /* create a new model in the database */
        // 1 - fazer a comparação das senhas
        // 2 - no retorno do usuário não deve conter a senha dele
        console.log("AQUIIII")
        const user = await User.findOne({ usuario: req.body.username }).exec()
        if (!user) {
          return res.status(401).json({ success: false, message: 'Usuário não encontrado' })
        }
        const isPasswordValid = null//await bcrypt.compare(req.body.password, user.senha)

        if (isPasswordValid) {
          // Remova a senha do objeto de retorno
          user.senha = undefined

          res.status(200).json({ success: true, data: user })
        } else {
          res.status(401).json({ success: false, message: 'Senha incorreta' })
        }
        
        console.log("AQUIIII")
        console.log(Object.keys(newProduct[0]))


        res.status(201).json({ success: true, data: newProduct })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
