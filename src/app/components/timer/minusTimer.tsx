import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { setOffTimer } from '@/redux/features/onTimerSlice'
import { setCompleteTimer } from '@/redux/features/completeTimerSlice'
import confetti from 'canvas-confetti'
import { setReadTime } from '@/redux/features/logSlice'

interface TimeType {
  timerTime: number // 초 단위로 제한 시간을 입력합니다. 예: 300 (5분)
}

const MinusTimer = ({ timerTime }: TimeType) => {
  const [time, setTime] = useState(moment.duration(timerTime, 'seconds'))
  const isOnTimer = useSelector((state: RootState) => state.onTimerReducer)

  const dispatch = useDispatch<AppDispatch>()

  const handleOffTimer = () => {
    dispatch(setOffTimer())
  }
  const handleCompleteTimer = () => {
    dispatch(setCompleteTimer())
    confetti({
      particleCount: 100, // 파티클 개수
      spread: 70, // 퍼지는 각도
      origin: { y: 0.6 }, // 시작 위치 조정
    })
  }
  useEffect(() => {
    let timerTick: NodeJS.Timeout | null = null

    if (isOnTimer && time.asSeconds() > 0) {
      timerTick = setInterval(() => {
        setTime((prevTime) => {
          // 새로운 duration 객체를 생성하여 시간을 업데이트합니다.
          const newTime = moment.duration(prevTime.asMilliseconds() - 1000)
          if (newTime.asSeconds() <= 0) {
            clearInterval(timerTick!)
            handleOffTimer()
            handleCompleteTimer()
            dispatch(setReadTime(timerTime))
          }
          return newTime
        })
      }, 1000)
    }

    return () => {
      if (timerTick) {
        clearInterval(timerTick)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnTimer])
  useEffect(() => {
    setTime(moment.duration(timerTime, 'seconds'))
  }, [timerTime])

  const stopTimer = () => {
    handleOffTimer()
    handleCompleteTimer()
    dispatch(setReadTime(timerTime))
    setTime(moment.duration(timerTime, 'seconds')) // 정지 시 초기 설정 시간으로 리셋합니다.
  }

  return (
    <div>
      <div className="flex justify-center text-5xl">
        <div className="flex justify-center text-5xl">
          {`${Math.floor(time.asSeconds() / 60)
            .toString()
            .padStart(2, '0')}:${Math.floor(time.asSeconds() % 60)
            .toString()
            .padStart(2, '0')}`}
        </div>
      </div>
      <div>
        <button
          className="main-button-container mx-1 hidden"
          onClick={stopTimer}
        >
          정지
        </button>
      </div>
    </div>
  )
}

export default MinusTimer
