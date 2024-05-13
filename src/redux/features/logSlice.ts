/* eslint-disable no-param-reassign */

import { BookType } from '@/lib/types/bookType'
import { LogType } from '@/lib/types/logType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: LogType = {
  book: {
    isbn: '',
    title: '',
    thumbnail: '',
    authors: '',
  }, // 적절한 초기값으로 설정해야 합니다.
  readTime: '',
  endPage: '',
  finished: false,
  memo: undefined,
}

export const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    // 독서 로그의 페이지를 설정합니다.
    setEndPage: (state, action: PayloadAction<string>) => {
      state.endPage = action.payload
    },
    setReadTime: (state, action: PayloadAction<string>) => {
      state.readTime = action.payload
    },
    // 독서 완료 여부를 설정합니다.
    setFinished: (state, action: PayloadAction<boolean>) => {
      state.finished = action.payload
    },
    // 메모를 설정합니다.
    setMemo: (state, action: PayloadAction<string | undefined>) => {
      state.memo = action.payload
    },
    // 책 정보를 설정합니다.
    setBook: (state, action: PayloadAction<BookType>) => {
      state.book = action.payload
    },
  },
})

// 생성한 액션 크리에이터를 export합니다.
export const { setEndPage, setFinished, setMemo, setBook, setReadTime } =
  logSlice.actions

// 리듀서를 export합니다.
export default logSlice.reducer
