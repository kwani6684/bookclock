import { createSlice } from '@reduxjs/toolkit'

const initialState: boolean = false

export const onTimer = createSlice({
  name: 'onTimer',
  initialState,
  reducers: {
    setOnTimer: () => true,
    setOffTimer: () => false,
  },
})

export const { setOnTimer, setOffTimer } = onTimer.actions
export default onTimer.reducer
