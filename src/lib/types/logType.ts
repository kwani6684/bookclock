import { ObjectId } from 'mongodb'
import { BookType } from './bookType'

export interface LogType {
  book: BookType
  readTime: number
  endPage: string
  finished: boolean
  memo?: string
}
export interface LogDataType extends LogType {
  _id: ObjectId
  date: string
  writer: string
  count: number
}
