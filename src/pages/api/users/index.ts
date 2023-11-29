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
        const user = await User.findOne({ usuario: req.body.username }).exec()
        if (!user) {
          return res.status(401).json({ success: false, message: 'Usuário não encontrado' })
        }

        // encrypt password to base64
        const buffPassword = Buffer.from(req.body.password)

        if (user._doc.password !== buffPassword.toString('base64')) {
          return res.status(401).json({ success: false, message: 'Senha incorreta' })
        }


        res.status(201).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
