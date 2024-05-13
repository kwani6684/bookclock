import { connectDB } from '@/lib/db/database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function showDate(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const client = (await connectDB) as any
  const db = client.db('bookClock')
  request.body = JSON.parse(request.body)
  if (request.method === 'POST') {
    try {
      const data = {
        ...request.body,
      }
      await db.collection('logs').insertOne(data)
    } catch (error) {}
  }
}
