/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BookType } from '@/lib/types/bookType'

interface BookState {
  bookInfo: BookType | undefined
}

// 초기 상태를 BookState 타입으로 선언합니다.
const initialState: BookState = {
  bookInfo: undefined,
}

export const book = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBookInfo: (state, action: PayloadAction<BookType | undefined>) => {
      // 상태 업데이트 시, bookInfo 필드를 업데이트합니다.
      state.bookInfo = action.payload
    },
    // 필요한 경우, bookInfo를 undefined로 재설정하는 액션도 추가할 수 있습니다.
    resetBookInfo: (state) => {
      state.bookInfo = undefined
    },
  },
})

export const { setBookInfo, resetBookInfo } = book.actions
export default book.reducer
