import { createSlice } from '@reduxjs/toolkit'

const initialState: boolean = false

export const completeTimer = createSlice({
  name: 'completeTimer',
  initialState,
  reducers: {
    setCompleteTimer: () => true,
    setUnCompleteTimer: () => false,
  },
})

export const { setCompleteTimer, setUnCompleteTimer } = completeTimer.actions
export default completeTimer.reducer
