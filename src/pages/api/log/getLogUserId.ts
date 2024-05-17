import { connectDB } from '@/lib/db/database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const db = (await connectDB).db('bookClock')
  const id = request.query.id as string
  const result = await db.collection('logs').find({ writer: id }).toArray()
  response.status(200).json(result.reverse())
}
