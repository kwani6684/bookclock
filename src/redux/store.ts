import { configureStore } from '@reduxjs/toolkit'
import timerReducer from './features/timerSlice'
import angleReducer from './features/angleSlice'
import onTimerReducer from './features/onTimerSlice'
import completeTimerReducer from './features/completeTimerSlice'

export const store = configureStore({
  reducer: {
    timerReducer,
    angleReducer,
    onTimerReducer,
    completeTimerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
