'use client'

import { motion } from 'framer-motion'

interface BentoType {
  content: string
  color: string
  height?: number
  size?: string
}

// 벤또 컴포넌트
const Bento = ({ content, color, height, size }: BentoType) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className={`flex justify-center items-center ${color} h-[${height}px] rounded-lg col-span-${size}`}
    >
      {content}
    </motion.div>
  )
}
export default Bento
