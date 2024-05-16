import { connectDB } from '@/lib/db/database'
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const client = (await connectDB) as any
  const db = client.db('bookClock')
  const result = await db.collection('logs').find().toArray()
  response.status(200).json(result.reverse())
}
// async function getLogId(id: string) {
//   const client = (await connectDB) as any
//   const db = client.db('bookClock')
//   const result = await db.collection('logs').findOne({ _id: new ObjectId(id) })
//   return result
// }
