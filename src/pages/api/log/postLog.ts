import { connectDB } from '@/lib/db/database'
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { finished } from 'stream'

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
      const existLog = await db
        .collection('logs')
        .findOne({ writer: data.writer, 'book.isbn': data.book.isbn })

      console.log(existLog)
      if (existLog) {
        console.log('update')
        const updateData = {
          readTime: existLog.readTime + data.readTime,
          finished: data.finished,
          endPage: data.endPage,
          memo: data.memo,
          count: existLog.count + data.count,
          date: data.date,
        }
        await db
          .collection('logs')
          .updateOne({ _id: new ObjectId(existLog._id) }, { $set: updateData })
      } else {
        await db.collection('logs').insertOne(data)
      }
      response.redirect(302, '/logs')
    } catch (error) {}
  }
}
