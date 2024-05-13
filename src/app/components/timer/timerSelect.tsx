'use client'

import { isPlus, isMinus } from '@/redux/features/timerSlice'
import { AppDispatch } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { useState } from 'react'

const TimerSelect = () => {
  const [plusHovered, setPlusHovered] = useState(false)
  const [minusHovered, setMinusHovered] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const handleMinus = () => {
    dispatch(isMinus())
  }
  const handlePlus = () => {
    dispatch(isPlus())
  }

  return (
    <div className="grid  gap-x-2 py-2 grid-cols-4">
      <div className="col-span-4">Step.2 타이머를 설정해주세요</div>
      <div className="flex py-4 col-span-4 h-[100px]  gap-2">
        <motion.div
          onClick={handleMinus}
          initial={{ width: '100%' }}
          animate={{ width: minusHovered ? '150%' : '50%' }} // 호버 상태에 따라 width 조절
          transition={{ duration: 0.5 }}
          style={{ originX: 0 }} // 확장의 기준점을 왼쪽으로 설정
          onMouseEnter={() => setMinusHovered(true)} // 마우스 진입 시 호버 상태 활성화
          onMouseLeave={() => setMinusHovered(false)} // 마우스 벗어날 때 호버 상태 비활성화
          className="flex justify-center items-center bg-red-300 rounded-lg col-span-2"
        >
          시간 선택
        </motion.div>
        <motion.div
          onClick={handlePlus}
          initial={{ width: '100%' }}
          animate={{ width: plusHovered ? '150%' : '50%' }} // 호버 상태에 따라 width 조절
          transition={{ duration: 0.5 }}
          onMouseEnter={() => setPlusHovered(true)} // 마우스 진입 시 호버 상태 활성화
          onMouseLeave={() => setPlusHovered(false)} // 마우스 벗어날 때 호버 상태 비활성화
          style={{ originX: 1 }} // 확장의 기준점을 오른쪽으로 설정
          className="flex justify-center items-center bg-blue-300 rounded-lg col-span-2"
        >
          시간 미지정
        </motion.div>
      </div>
    </div>
  )
}
export default TimerSelect
