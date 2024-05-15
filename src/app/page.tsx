'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { setAngle } from '@/redux/features/angleSlice'
import Bento from './components/bento'
import TimerCircle from './components/timer/timerCircle'

export default function Home() {
  const dispatch = useDispatch()
  const [play, setPlay] = useState(false)
  const handleMouseEnter = () => {
    dispatch(setAngle(180))
    setPlay(true)
  }
  const handleMouseLeave = () => {
    dispatch(setAngle(0))
    setPlay(false)
  }

  return (
    <div className="flex-col justify-center">
      {/* 벤또 그리드 */}
      <div className="w-full px-2 py-2">
        <div className="grid gap-x-2 gap-y-2 w-full grid-cols-2">
          {/* 타이머 */}

          <Link className="col-span-2" href={'/timer'}>
            <motion.div
              onHoverStart={handleMouseEnter}
              onHoverEnd={handleMouseLeave}
            >
              <Bento color="bg-semiBrown" height={300}>
                <motion.div
                  animate={play ? { scale: 1.2 } : { scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    originX: 0,
                    originY: 0.5,
                  }}
                  className="font-black text-mainBg text-2xl"
                >
                  독서 타이머
                </motion.div>

                <motion.div
                  initial={{ scale: 0.6 }}
                  animate={play ? { scale: 0.75 } : { scale: 0.6 }}
                  transition={{ duration: 0.5 }}
                  style={{ originX: 0.5, originY: 0.2 }}
                  className="flex justify-center"
                >
                  <TimerCircle isMain={true} />
                </motion.div>
              </Bento>
            </motion.div>
          </Link>

          {/* 내 기록  */}
          <Link className="col-span-1" href={'/logs'}>
            <Bento color="bg-smallBento-primary" height={150}>
              <div className="flex font-black text-mainBg text-xl">기록</div>
            </Bento>
          </Link>
          {/* 랭킹 */}
          <Link className="col-span-1" href={'/ranking'}>
            <Bento color="bg-smallBento-primary" height={150}>
              <div className="flex font-black text-mainBg text-xl">랭킹</div>
            </Bento>
          </Link>
        </div>
      </div>
    </div>
  )
}
