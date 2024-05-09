import React, { useState } from 'react'
import moment from 'moment'

const PlusTimer = () => {
  const [time, setTime] = useState(moment.duration(0))
  const [timeTick, setTimeTick] = useState<NodeJS.Timeout | null>(null)
  const startTimer = () => {
    const tick = () => setTime((prevTime) => prevTime.clone().add(1, 'seconds'))
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
