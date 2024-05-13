import { BookType } from './bookType'

export interface LogType {
  book: BookType
  readTime: string
  endPage: string
  finished: boolean
  memo?: string
}
