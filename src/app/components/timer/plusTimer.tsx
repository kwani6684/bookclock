import React, { useState } from 'react'
import moment from 'moment'
import { setOffTimer, setOnTimer } from '@/redux/features/onTimerSlice'
import { AppDispatch } from '@/redux/store'
import { useDispatch } from 'react-redux'

const PlusTimer = () => {
  const [time, setTime] = useState(moment.duration(0)) // duration(시작시간 1000=1초)
  const [timeTick, setTimeTick] = useState<NodeJS.Timeout | null>(null)
  const dispatch = useDispatch<AppDispatch>()

  const handleOffTimer = () => {
    dispatch(setOffTimer())
  }
  const handleOnTimer = () => {
    dispatch(setOnTimer())
  }
  const startTimer = () => {
    const tick = () => setTime((prevTime) => prevTime.clone().add(1, 'seconds'))
    handleOnTimer()
    const timerTick = setInterval(() => {
      tick()
    }, 1000)
    setTimeTick(timerTick)
  }

  const pauseTimer = () => {
    if (timeTick) {
      clearInterval(timeTick)
    }
  }

  const stopTimer = () => {
    pauseTimer()
    handleOffTimer()
    setTime(moment.duration(0))
  }

  return (
    <div>
      <div className="flex justify-center text-6xl">
        {moment(time.asSeconds(), 's').format('HH:mm:ss')}
      </div>
      <div>
        <button
          className="main-button-container mx-1"
          onClick={() => startTimer()}
        >
          시작
        </button>
        <button
          className="main-button-container mx-1"
          onClick={() => pauseTimer()}
        >
          일시정지
        </button>
        <button
          className="main-button-container mx-1"
          onClick={() => stopTimer()}
        >
          정지
        </button>
      </div>
    </div>
  )
}

export default PlusTimer
