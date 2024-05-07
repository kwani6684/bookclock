'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const TimerSelect = () => {
  const [plusHovered, setPlusHovered] = useState(false)
  const [minusHovered, setMinusHovered] = useState(false)

  return (
    <div className="flex col-span-4 gap-2">
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: minusHovered ? '150%' : '50%' }} // 호버 상태에 따라 width 조절
        transition={{ duration: 0.5 }}
        style={{ originX: 0 }} // 확장의 기준점을 왼쪽으로 설정
        onMouseEnter={() => setMinusHovered(true)} // 마우스 진입 시 호버 상태 활성화
        onMouseLeave={() => setMinusHovered(false)} // 마우스 벗어날 때 호버 상태 비활성화
        className="flex justify-center items-center bg-red-300 rounded-lg col-span-2"
      >
        줄어드는 시간
      </motion.div>
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: plusHovered ? '150%' : '50%' }} // 호버 상태에 따라 width 조절
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setPlusHovered(true)} // 마우스 진입 시 호버 상태 활성화
        onMouseLeave={() => setPlusHovered(false)} // 마우스 벗어날 때 호버 상태 비활성화
        style={{ originX: 1 }} // 확장의 기준점을 오른쪽으로 설정
        className="flex justify-center items-center bg-blue-300 rounded-lg col-span-2"
      >
        늘어나는 시간
      </motion.div>
    </div>
  )
}
export default TimerSelect
