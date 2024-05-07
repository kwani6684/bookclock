'use client'

import React from 'react'

import { motion } from 'framer-motion'

function TimerCircle() {
  return (
    <div className="relative w-32 h-16">
      <motion.div
        initial={{
          rotate: 180,
        }}
        // animate={{ rotate: 0 }}
        // transition={{ duration: 1800 }}
        style={{
          originX: 0.5,
          originY: 0,
        }}
        className="absolute top-0 left-0 w-32 h-16 overflow-hidden inline-block"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          className="absolute w-32 h-32 rounded-full bg-red-500 bottom-0"
        ></motion.div>

        {/*
        //이 부분 motion div 바깥으로 옮기고 파란 반원으로 가리기
         <motion.div
          initial={{
            rotate: 0,
          }}
          animate={{ rotate: 170 }}
          transition={{ duration: 30 }}
          style={{
            originX: 0,
            originY: 0.5,
          }}
          className="absolute  w-16 h-8 left-16  rounded-md bg-yellow-500 bottom-14"
        ></motion.div> */}
        <motion.div className="absolute  w-16 h-8  rounded-md bg-yellow-500 bottom-14"></motion.div>
      </motion.div>
      <div className="absolute top-0 left-0 w-32 h-16 overflow-hidden inline-block">
        <div className="absolute w-32 h-32 rounded-full bg-blue-500 bottom-0"></div>
      </div>
    </div>
  )
}

export default TimerCircle
