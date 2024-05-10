import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAngle } from '@/redux/features/angleSlice'
import { RootState } from '@/redux/store'
import { setOnTimer } from '@/redux/features/onTimerSlice'
import CustomAlert from '../alert'
import StartPageInput from '../log/startPageInput'

const TimerStart = () => {
  const dispatch = useDispatch()
  const angle = useSelector((state: RootState) => state.angleReducer)
  const [showInput, setShowInput] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const handleAngle = (a: number) => {
    dispatch(setAngle(a))
  }
  const handleTimerStart = () => {
    dispatch(setOnTimer())
  }

  const closeAlert = () => {
    setShowAlert(false)
  }

  const handleNext = () => {
    if (showInput) {
      setShowAlert(true)
    } else {
      setShowInput(true)
    }
  }
  const handlePrev = () => {
    setShowInput(false)
  }

  return (
    <div>
      {showAlert && (
        <CustomAlert
          message={'독서를 시작할까요?'}
          onClose={closeAlert}
          isActive={true}
          active={handleTimerStart}
        />
      )}

      <div className="flex-col pt-6 max-h-[80px]">
        <AnimatePresence>
          {!showInput && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              //   exit={{ opacity: 0, x: -100 }}
              className="flex overflow-x-hidden"
            >
              <div className="flex justify-center px-1 z-30 ">
                {[3, 90, 180].map((selectedAngle, i) => (
                  <button
                    key={i}
                    onClick={() => handleAngle(selectedAngle)}
                    className={`main-button-container mx-1 ${angle.angle === selectedAngle ? 'bg-blue-400' : ''}`}
                  >
                    {selectedAngle / 3}m
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {showInput && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, type: 'spring' }}
            // transition={{ delay: 0.5 }}
          >
            <StartPageInput />
          </motion.div>
        )}
      </div>
      <div className={`flex ${showInput ? `justify-between` : `justify-end`}`}>
        {showInput && (
          <div className="flex pt-6 justify-start">
            <button onClick={handlePrev}>이전</button>
          </div>
        )}
        <div className="flex pt-6 justify-end">
          <button onClick={handleNext}>다음</button>
        </div>
      </div>
    </div>
  )
}

export default TimerStart
