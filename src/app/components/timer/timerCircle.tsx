'use client'

import React from 'react'

import { motion } from 'framer-motion'

function TimerCircle() {
  return (
    <div className="flex pt-[150px] justify-center ">
      <div className="relative w-[300px] h-[150px]">
        {/* 타이머가 움직임에 따라 내려가는 왼쪽 북커버 */}
        <motion.div
          // animate={{ y: 10 }}
          // transition={{ duration: 30, ease: 'linear' }}
          className="absolute  w-[150px] h-[20px]  rounded-md bg-yellow-800 bottom-[140px] z-20"
        ></motion.div>
        {/* 회전하는 직사각형 */}
        <motion.div
          initial={{
            rotate: 180,
          }}
          // animate={{ rotate: 0 }}
          // transition={{ duration: 30, ease: 'linear' }}
          style={{
            originX: 0.5,
            originY: 0,
          }}
          className="absolute top-0 right-0 left-0 w-[300px] h-[150px] overflow-hidden inline-block"
        >
          {/* 타이머를 나타내는 반원 */}
          <motion.div
            initial={{ scale: 0.9 }}
            className="absolute w-[300px] h-[300px] rounded-full bg-red-500 bottom-0"
          ></motion.div>
          {/* 반원에 붙어있는 오른쪾 북커버 */}
          <div className="absolute  w-[150px] h-[20px]  rounded-md bg-yellow-800 bottom-[140px]"></div>
        </motion.div>
        {/* 배경색과 동일한 반원 */}
        <div className="absolute top-0 left-0 w-[300px] h-[150px] overflow-hidden inline-block">
          <div className="absolute w-[300px] h-[150px]  bg-blue-500 bottom-0 z-30"></div>
        </div>
      </div>
    </div>
  )
}

export default TimerCircle
