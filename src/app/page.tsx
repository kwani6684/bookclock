'use client'

import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="flex-col justify-center">
      <div className="flex justify-center">독서관리 타이머 앱</div>
      {/* 벤또 그리드 */}
      <div className="w-full px-6 py-10 bg-cyan-900">
        <div className="grid gap-x-8 gap-y-8 w-full grid-cols-2">
          <motion.div
            whileHover={{ scale: 1.1, transition: { duration: 1 } }}
            className="flex justify-center items-center bg-pink-300 h-[300px] rounded-lg col-span-2"
          >
            독서 타이머
          </motion.div>
          <div className="flex justify-center h-[150px] items-center bg-sky-400 rounded-lg">
            내 기록
          </div>
          <div className="flex justify-center h-[150px] items-center bg-emerald-400 rounded-lg">
            랭킹
          </div>
        </div>
      </div>
    </div>
  )
}
