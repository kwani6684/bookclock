import { connectDB } from '@/lib/db/database'
import { ObjectId } from 'mongodb'

export default async function getLogId(id: string) {
  const client = (await connectDB) as any
  const db = client.db('bookClock')
  const result = await db.collection('logs').findOne({ _id: new ObjectId(id) })
  return result
}
