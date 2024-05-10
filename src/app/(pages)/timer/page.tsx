'use client'

import PlusTimer from '@/app/components/timer/plusTimer'
import TimerCircle from '@/app/components/timer/timerCircle'
import TimerSelect from '@/app/components/timer/timerSelect'
import TimerStart from '@/app/components/timer/timerStart'
import { RootState } from '@/redux/store'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

const Timer = () => {
  const isWhatTimer = useSelector((state: RootState) => state.timerReducer)
  const isOntimer = useSelector((state: RootState) => state.onTimerReducer)
  const isCompleteTimer = useSelector(
    (state: RootState) => state.completeTimerReducer,
  )
  return (
    <div className="relative h-[100vh]">
      {/* {!isCompleteTimer && ( */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isOntimer ? 0 : 1, y: isOntimer ? -200 : 0 }}
        transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
      >
        <TimerSelect />
      </motion.div>
      {/* )} */}

      <div>
        {isWhatTimer !== 0 &&
          (isWhatTimer === -1 ? (
            <div>
              <motion.div
                animate={{
                  y: isOntimer ? -200 : 0,
                }}
                transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
              >
                <div className="flex justify-center">
                  <TimerCircle />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 1 }}
                animate={{
                  opacity: isOntimer ? 0 : 1,
                }}
              >
                <div className="flex justify-center ">
                  <TimerStart />
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              animate={{
                y: isOntimer ? -200 : 0,
              }}
              transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
            >
              <PlusTimer />
            </motion.div>
          ))}
      </div>
      <motion.div
        className=""
        initial={{ y: 0, opacity: 0 }}
        animate={{
          opacity: isCompleteTimer ? 1 : 0,
          y: isCompleteTimer ? -300 : 0,
        }}
        transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
      >
        <div className="flex justify-center">
          <div>독서를 끝마쳤어요</div>
          <div></div>
        </div>
      </motion.div>
    </div>
  )
}
export default Timer
