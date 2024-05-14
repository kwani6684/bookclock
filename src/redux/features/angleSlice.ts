/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AngleType {
  angle: number
}
const initialState: AngleType = {
  angle: 0,
}

export const angle = createSlice({
  name: 'angle',
  initialState,
  reducers: {
    setAngle: (state, action: PayloadAction<number>) => {
      state.angle = action.payload
    },
  },
})

export const { setAngle } = angle.actions
export default angle.reducer
