import { motion } from 'framer-motion'
import { signOut } from 'next-auth/react'

const DropDown = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <motion.div
      animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
      className="absolute top-[50px] py-2 px-3 z-40 text-sm rounded-[20px] bg-white"
    >
      <button
        onClick={() => {
          signOut()
        }}
      >
        로그아웃
      </button>
    </motion.div>
  )
}
export default DropDown
