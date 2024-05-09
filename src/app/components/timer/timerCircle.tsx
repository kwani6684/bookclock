'use client'

import React from 'react'

import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

function TimerCircle() {
  const angle = useSelector((state: RootState) => state.angleReducer)

  return (
    <div className="flex-col">
      <div className="pt-[150px] ">
        {/* 파이타이머 레이아웃 */}
        <div className="flex justify-center">
          <div className="relative left-0 right-0  min-w-full w-[300px] h-[150px]">
            {/* 타이머가 움직임에 따라 내려가는 왼쪽 북커버 */}
            <motion.div
              animate={{
                y: angle.angle === 45 ? 6 : 0,
                scaleX: angle.angle === 45 ? 1.01 : 1,
              }}
              style={{
                originX: 0,
                originY: 0,
              }}
              transition={{ duration: 1 }}
              className="absolute  w-[150px] h-[20px]  rounded-md bg-yellow-800 bottom-[140px] z-20"
            ></motion.div>
            {/* 회전하는 직사각형 */}
            <motion.div
              initial={{
                rotate: 0,
              }}
              animate={{ rotate: angle.angle }}
              transition={{ duration: 1 }}
              style={{
                originX: 0.5,
                originY: 0,
              }}
              className="absolute top-0  w-[300px] h-[150px] overflow-hidden inline-block"
            >
              {/* 타이머를 나타내는 반원 */}
              <motion.div
                initial={{ scale: 0.9 }}
                className="absolute w-[300px] h-[300px] rounded-full bg-amber-100 bottom-0"
              ></motion.div>
              {/* 반원에 붙어있는 오른쪾 북커버 */}
              <div className="absolute  w-[150px] h-[20px]  rounded-md bg-yellow-800 bottom-[140px]"></div>
            </motion.div>
            {/* 배경색과 동일한 직사각형 */}
            <div className="absolute  top-0 w-[300px] h-[150px] overflow-hidden inline-block">
              <motion.div
                animate={{
                  y: angle.angle === 45 ? 3 : 0,
                }}
                transition={{ duration: 1 }}
                className="absolute  w-[300px] h-[150px]  bg-green-400 bottom-0 z-30"
              ></motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimerCircle
