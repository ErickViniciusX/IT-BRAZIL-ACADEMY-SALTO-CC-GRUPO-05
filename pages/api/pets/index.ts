import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import Produto from '../../../models/Produto'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const Produtos = await Produto.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: Produtos })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const newProduct = await Produto.create(
          req.body
        ) /* create a new model in the database */
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
