import { configureStore } from '@reduxjs/toolkit'
import timerReducer from './features/timerSlice'
import angleReducer from './features/angleSlice'

export const store = configureStore({
  reducer: {
    timerReducer,
    angleReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
