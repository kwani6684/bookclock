import { configureStore } from '@reduxjs/toolkit'
import timerReducer from './features/timerSlice'
import angleReducer from './features/angleSlice'
import onTimerReducer from './features/onTimerSlice'
import bookReducer from './features/bookSlice'
import LogReducer from './features/logSlice'
import completeTimerReducer from './features/completeTimerSlice'

export const store = configureStore({
  reducer: {
    timerReducer,
    angleReducer,
    onTimerReducer,
    completeTimerReducer,
    bookReducer,
    LogReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
