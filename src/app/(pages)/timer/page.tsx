'use client'

import InfinityTimer from '@/app/components/timer/InfinityTimer'
import TimerCircle from '@/app/components/timer/timerCircle'
import TimerSelect from '@/app/components/timer/timerSelect'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

const Timer = () => {
  const isWhatTimer = useSelector((state: RootState) => state.timerReducer)

  return (
    <div>
      <TimerSelect />
      <div className="flex justify-center">
        {isWhatTimer !== 0 &&
          (isWhatTimer === -1 ? <TimerCircle /> : <InfinityTimer />)}
      </div>
    </div>
  )
}
export default Timer
