import { createSlice } from '@reduxjs/toolkit'

const initialState: number = 0

export const timer = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    isMinus: () => -1,
    isPlus: () => 1,
  },
})

export const { isMinus, isPlus } = timer.actions
export default timer.reducer
