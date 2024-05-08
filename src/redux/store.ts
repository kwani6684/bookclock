import { configureStore } from '@reduxjs/toolkit'
import timerReducer from './features/timerSlice'

export const store = configureStore({
  reducer: {
    timerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
