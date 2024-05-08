import { motion } from 'framer-motion'
import { AppDispatch, RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { setAngle } from '@/redux/features/angleSlice'

const TimerStart = () => {
  const dispatch = useDispatch<AppDispatch>()
  const angle = useSelector((state: RootState) => state.angleReducer)
  const handleAngle = (a: number) => {
    dispatch(setAngle(a))
  }
  return (
    <div className="flex-col py-10">
      <motion.div animate={{ x: -100 }} className="flex overflow-x-hidden">
        <div className="flex justify-center px-1 ">
          {[45, 90, 180].map((selectedAngle, i) => {
            return (
              <button
                key={i}
                onClick={() => handleAngle(selectedAngle)}
                className={`main-button-container mx-1 ${angle.angle === selectedAngle ? 'bg-blue-400' : ''}`}
              >
                {selectedAngle / 3}m
              </button>
            )
          })}
        </div>
        <div>sfdddaddd</div>
      </motion.div>
      <div className="flex py-6 justify-end">
        <button>다음</button>
      </div>
    </div>
  )
}
export default TimerStart
