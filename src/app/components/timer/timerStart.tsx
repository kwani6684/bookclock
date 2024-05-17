import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'

import { useDispatch, useSelector } from 'react-redux'
import { setAngle } from '@/redux/features/angleSlice'
import { RootState } from '@/redux/store'
import { setOnTimer } from '@/redux/features/onTimerSlice'
import CustomAlert from '../alert'

const TimerStart = () => {
  const session = useSession()
  const dispatch = useDispatch()
  const angle = useSelector((state: RootState) => state.angleReducer)
  const [showInput] = useState(false)
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
    setShowAlert(true)
  }
  const handleLogin = () => {
    signIn('kakao')
  }

  return (
    <div>
      {showAlert &&
        (session.data ? (
          <CustomAlert
            message={'독서를 시작할까요?'}
            onClose={closeAlert}
            isActive={true}
            active={handleTimerStart}
          />
        ) : (
          <CustomAlert
            message={'먼저 로그인 해주세요'}
            onClose={closeAlert}
            isActive={true}
            active={handleLogin}
          ></CustomAlert>
        ))}

      <div className="flex-col bottom-[200px] max-h-[80px]">
        <AnimatePresence>
          {!showInput && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              //   exit={{ opacity: 0, x: -100 }}
              className="flex overflow-x-hidden"
            >
              <div className="flex justify-center px-1 z-50 ">
                {[45, 90, 180].map((selectedAngle, i) => (
                  <button
                    key={i}
                    onClick={() => handleAngle(selectedAngle)}
                    className={`default-button px-6 py-4 mx-1 ${angle.angle === selectedAngle ? 'bg-smallBento-selected text-white' : ''}`}
                  >
                    {selectedAngle / 3}m
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        className={`flex z-50 ${showInput ? `justify-between` : `justify-end`}`}
      >
        <button
          onClick={handleNext}
          className="flex mt-6 px-4 py-2  bg-smallBento-hover justify-end default-button hover:bg-[#BE4f31] text-white"
        >
          시작
        </button>
      </div>
    </div>
  )
}

export default TimerStart
