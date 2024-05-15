import { ObjectId } from 'mongodb'
import { BookType } from './bookType'

export interface LogType {
  book: BookType
  readTime: string
  endPage: string
  finished: boolean
  memo?: string
}
export interface LogDataType extends LogType {
  _id: ObjectId
  date: string
}
