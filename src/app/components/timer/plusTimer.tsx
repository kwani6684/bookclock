import React, { useState } from 'react'
import moment from 'moment'
import { motion } from 'framer-motion'

import { setOffTimer, setOnTimer } from '@/redux/features/onTimerSlice'
import { setReadTime } from '@/redux/features/logSlice'
import { setCompleteTimer } from '@/redux/features/completeTimerSlice'
import confetti from 'canvas-confetti'
import { AppDispatch, RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import CustomAlert from '../alert'
import Path from '../path'

// eslint-disable-next-line @typescript-eslint/no-explicit-any

const PlusTimer = () => {
  const [time, setTime] = useState(moment.duration(0)) // duration(시작시간 1000=1초)
  const [timeTick, setTimeTick] = useState<NodeJS.Timeout | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const [showAlert, setShowAlert] = useState(false)
  const [showCompleteAlert, setShowCompleteAlert] = useState(false)
  const isOnTimer = useSelector((state: RootState) => state.onTimerReducer)

  const [isPause, setIsPause] = useState(true)
  const handleOffTimer = () => {
    dispatch(setOffTimer())
  }
  const getTimeString = () => {
    if (time.minutes() > 0) {
      return `${time.minutes()}분 ${time.seconds()}초`
    }
    return `${time.seconds()}초`
  }
  const handleReadTime = () => {
    dispatch(setReadTime(getTimeString()))
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
  const handleAlert = () => {
    setShowAlert(true)
  }

  const closeAlert = () => {
    setShowAlert(false)
    if (isPause) {
      pauseTimer()
    }
  }
  const closeCompleteAlert = () => {
    setShowCompleteAlert(false)
  }

  const stopTimer = () => {
    pauseTimer()
    setShowCompleteAlert(true)
    handleReadTime()
    console.log(time.seconds())
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
        {`${Math.floor(time.asSeconds() / 60)
          .toString()
          .padStart(2, '0')}:${Math.floor(time.asSeconds() % 60)
          .toString()
          .padStart(2, '0')}`}
      </div>
      <div>
        <div
          className={`flex  justify-center items-center pt-6 ${!isOnTimer && 'hidden'}`}
        >
          <motion.div initial={false} animate={isPause ? 'play' : 'pause'}>
            <button
              className="rounded-full bg-white p-2"
              onClick={() => pauseTimer()}
            >
              <svg width="23" height="23" viewBox="0 0 23 23">
                {/* 첫 번째 선 (일시정지 상태에서 보임) */}
                <Path
                  variants={{
                    play: { d: 'M 7 2 L 7 21' },
                    pause: { d: 'M 9 2 L 9 21' },
                  }}
                />
                {/* 두 번째 선 (일시정지 상태에서 보임) */}
                {/* 삼각형 (재생 상태에서 보임) */}
                <Path
                  fill="hsl(0, 0%, 18%)"
                  variants={{
                    play: { d: 'M 16 2 L 16 11.5' },
                    pause: { d: 'M 18 11.5 L 9 2 ' },
                  }}
                  transition={{ duration: 0.1 }}
                />
                <Path
                  fill="hsl(0, 0%, 18%)"
                  variants={{
                    play: { d: 'M 16 11.5 L 16 21' },
                    pause: { d: 'M 18 11.5  L 9 21 ' },
                  }}
                  transition={{ duration: 0.1 }}
                />
              </svg>
            </button>
          </motion.div>
        </div>
        <div className="flex pt-10 justify-center">
          <button
            className="default-button px-6 py-3"
            onClick={isOnTimer ? stopTimer : handleAlert}
          >
            {isOnTimer ? '저장' : '시작'}
          </button>
        </div>
      </div>
      {showCompleteAlert && (
        <div className="">
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
