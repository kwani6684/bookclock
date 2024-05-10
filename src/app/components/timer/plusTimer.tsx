import React, { useState } from 'react'
import moment from 'moment'
import { motion } from 'framer-motion'

import { setOffTimer, setOnTimer } from '@/redux/features/onTimerSlice'
import { setCompleteTimer } from '@/redux/features/completeTimerSlice'
import confetti from 'canvas-confetti'
import { AppDispatch } from '@/redux/store'
import { useDispatch } from 'react-redux'
import CustomAlert from '../alert'
import StartPageInput from '../log/startPageInput'

const PlusTimer = () => {
  const [time, setTime] = useState(moment.duration(0)) // duration(시작시간 1000=1초)
  const [timeTick, setTimeTick] = useState<NodeJS.Timeout | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const [showAlert, setShowAlert] = useState(false)
  const [showCompleteAlert, setShowCompleteAlert] = useState(false)

  const [showInput, setShowInput] = useState(true)
  const [isPause, setIsPause] = useState(true)
  const handleOffTimer = () => {
    dispatch(setOffTimer())
  }
  const handleCompleteTimer = () => {
    dispatch(setCompleteTimer())
    handleOffTimer()

    confetti({
      particleCount: 100, // 파티클 개수
      spread: 70, // 퍼지는 각도
      origin: { y: 0.6 }, // 시작 위치 조정
    })
  }
  const handleAlert = () => {
    setShowAlert(true)
  }
  const closeAlert = () => {
    setShowAlert(false)
  }
  const closeCompleteAlert = () => {
    setShowCompleteAlert(false)
  }

  const handleOnTimer = () => {
    setShowInput(false)
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
    if (isPause) {
      if (timeTick) {
        clearInterval(timeTick)
        setIsPause(false)
      }
    } else {
      startTimer()
      setIsPause(true)
    }
  }

  const stopTimer = () => {
    setIsPause(true)
    pauseTimer()
    setShowCompleteAlert(true)
    // setShowInput(true)
    // setTime(moment.duration(0))
  }

  return (
    <div>
      {showAlert && (
        <CustomAlert
          message={'독서를 시작할까요?'}
          onClose={closeAlert}
          isActive={true}
          active={startTimer}
        />
      )}

      <div className="flex justify-center text-6xl">
        {moment(time.asSeconds(), 's').format('HH:mm:ss')}
      </div>
      <div>
        <div className="flex justify-center">
          <button
            className="main-button-container mx-1"
            onClick={() => pauseTimer()}
          >
            {isPause ? '=' : '시작'}
          </button>
          <button
            className="main-button-container mx-1"
            onClick={() => stopTimer()}
          >
            완료
          </button>
        </div>
        {showInput && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, type: 'spring' }}
          >
            <div className="flex justify-center">
              <StartPageInput />
            </div>
            <div className="flex justify-center">
              <button className="main-button-container" onClick={handleAlert}>
                시작
              </button>
            </div>
          </motion.div>
        )}
      </div>
      {showCompleteAlert && (
        <div className="mt-[200px]">
          <CustomAlert
            message={'독서를 기록할까요?'}
            onClose={closeCompleteAlert}
            isActive={true}
            yPosition={200}
            active={handleCompleteTimer}
          />
        </div>
      )}
    </div>
  )
}

export default PlusTimer
