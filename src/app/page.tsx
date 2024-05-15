'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { setAngle } from '@/redux/features/angleSlice'
import Bento from './components/bento'
import TimerCircle from './components/timer/timerCircle'

export default function Home() {
  const dispatch = useDispatch()
  const handleMouseEnter = () => {
    dispatch(setAngle(180))
  }
  const handleMouseLeave = () => {
    dispatch(setAngle(0))
  }

  return (
    <div className="flex-col justify-center">
      {/* 벤또 그리드 */}
      <div className="w-full px-2 py-2">
        <div className="grid gap-x-2 gap-y-2 w-full grid-cols-2">
          {/* 타이머 */}
          <Link className="col-span-2" href={'/timer'}>
            <Bento color="bg-semiBrown" height={300}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{
                  originX: 0.5,
                  originY: 0.5,
                }}
                className="font-black text-mainBg text-2xl"
              >
                독서 타이머
              </motion.div>

              <motion.div
                initial={{ scale: 0.6 }}
                whileHover={{ scale: 0.75 }}
                style={{ originX: 0.5, originY: 0.2 }}
                onHoverStart={handleMouseEnter}
                onHoverEnd={handleMouseLeave}
                className="flex justify-center"
              >
                <TimerCircle isMain={true} />
              </motion.div>
            </Bento>
          </Link>
          {/* 내 기록  */}
          <Link className="col-span-1" href={'/logs'}>
            <Bento color="bg-smallBento-primary" height={150}>
              <div className="flex">기록</div>
            </Bento>
          </Link>
          {/* 랭킹 */}
          <Link className="col-span-1" href={'/ranking'}>
            <Bento color="bg-smallBento-primary" height={150}>
              <div className="flex">기록</div>
            </Bento>
          </Link>
        </div>
      </div>
    </div>
  )
}
