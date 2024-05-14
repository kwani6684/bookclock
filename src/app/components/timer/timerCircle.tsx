'use client'

/* eslint-disable no-nested-ternary */

import React from 'react'

import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import MinusTimer from './minusTimer'

interface IsMainType {
  isMain?: boolean
}

function TimerCircle({ isMain }: IsMainType) {
  const angle = useSelector((state: RootState) => state.angleReducer)
  const isOnTimer = useSelector((state: RootState) => state.onTimerReducer)

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
              className={`absolute  w-[150px] h-[20px]  rounded-md ${isMain ? 'bg-mainBg' : 'bg-[#9E725C]'} bottom-[140px] z-20`}
            ></motion.div>
            {/* 회전하는 직사각형 */}
            <motion.div
              initial={{
                rotate: 0,
              }}
              animate={{ rotate: isOnTimer ? 0 : angle.angle }} // 타이머 작동 중 애니메이션
              transition={{ duration: isOnTimer ? angle.angle * 20 : 1 }}
              style={{
                originX: 0.5,
                originY: 0,
              }}
              className="absolute top-0  w-[300px] h-[150px] overflow-hidden inline-block"
            >
              {/* 타이머를 나타내는 반원 */}
              <motion.div
                initial={{ scale: 0.9 }}
                className="absolute w-[300px] h-[300px] rounded-full  bottom-0"
              ></motion.div>
              {/* 반원에 붙어있는 오른쪾 북커버 */}
              <div
                className={`absolute  w-[150px] h-[20px] rounded-md ${isMain ? 'bg-mainBg' : 'bg-[#9E725C]'} bottom-[140px]`}
              ></div>
              {/* 선 */}
              <div className="absolute w-[300px] h-[150px] ">
                <motion.div
                  animate={{
                    scale:
                      angle.angle <= 45 ? 0.8 : angle.angle <= 90 ? 0.9 : 1,
                    rotate: angle.angle <= 45 ? 3 : angle.angle <= 90 ? 2 : 0,
                  }}
                  style={{
                    originX: 0,
                    originY: 0,
                  }}
                  className="absolute w-[300px] h-[150px]"
                >
                  <svg>
                    <path
                      strokeWidth="3"
                      stroke={`${isMain ? 'rgb(227,225,209)' : 'rgb(158,114,92)'}`}
                      strokeLinecap="round"
                      d="M 135 20 L 23.5 75"
                    />
                  </svg>
                </motion.div>
                <motion.div
                  animate={{
                    scale: angle.angle <= 90 ? 0.95 : 1,
                    rotate: angle.angle <= 90 ? 4 : 0,
                    opacity: angle.angle <= 45 ? 0 : 1,
                  }}
                  style={{
                    originX: 0,
                    originY: 0,
                  }}
                  className="absolute w-[300px] h-[150px]"
                >
                  <svg>
                    <path
                      strokeWidth="3"
                      stroke={`${isMain ? 'rgb(227,225,209)' : 'rgb(158,114,92)'}`}
                      strokeLinecap="round"
                      d="M 140 25 L 75 126.5"
                    />
                  </svg>
                </motion.div>
                <div className="absolute">
                  <svg>
                    <path
                      strokeWidth="3"
                      stroke={`${isMain ? 'rgb(227,225,209)' : 'rgb(158,114,92)'}`}
                      strokeLinecap="round"
                      d="M 150 30 L 150 165"
                    />
                  </svg>
                </div>
                <div className="absolute">
                  <svg
                    width="150"
                    style={{ transform: 'scale(-1, 1) translate(-150px, 0)' }}
                  >
                    <path
                      strokeWidth="3"
                      stroke={`${isMain ? 'rgb(227,225,209)' : 'rgb(158,114,92)'}`}
                      strokeLinecap="round"
                      d="M 135 20 L 23.5 75"
                    />
                  </svg>
                </div>
                <div className="absolute">
                  <svg
                    width="150"
                    style={{ transform: 'scale(-1, 1) translate(-150px, 0)' }}
                  >
                    <path
                      strokeWidth="3"
                      stroke={`${isMain ? 'rgb(227,225,209)' : 'rgb(158,114,92)'}`}
                      strokeLinecap="round"
                      d="M 140 25 L 75 126.5"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
            {/* 배경색과 동일한 직사각형 */}
            <div className="absolute  top-0 w-[300px] h-[150px] overflow-hidden  inline-block">
              <motion.div
                animate={{
                  y: angle.angle === 45 ? 3 : 0,
                }}
                transition={{ duration: 1 }}
                className={`absolute flex items-center
                justify-center w-[300px] h-[150px] ${isMain ? 'bg-semiBrown' : 'bg-mainBg'} bottom-0 z-30`}
              >
                <div className="text-center z-40">
                  {!isMain && <MinusTimer timerTime={angle.angle * 20} />}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimerCircle
