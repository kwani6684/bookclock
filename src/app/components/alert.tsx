import { motion } from 'framer-motion'
import React from 'react'

interface AlertType {
  message: string
  onClose: () => void
  active?: () => Promise<void> | void
  yPosition?: number
  isActive?: boolean
}
function CustomAlert({
  message,
  onClose,
  isActive,
  yPosition,
  active,
}: AlertType) {
  const onActive = async () => {
    if (isActive && active) {
      await active() // Correctly call the active function if it's provided and isActive is true
    }
    onClose() // Always call onClose function
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: yPosition || 0 }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="flex flex-col p-6 pb-4 bg-white rounded-3xl justify-center overflow-hidden shadow-md max-w-sm w-[250px] sm:mx-[10vw]">
        <div className="modal-body text-center font-black pb-4  border-b-[0.5px] border-[#ACACAC] ">
          <p>{message}</p>
        </div>
        <div className="flex justify-center pt-4">
          <button
            type="button"
            className={`w-[50%] close text-smallBento-selected py-2 font-bold border-r-[0.5px] border-[#ACACAC] ${isActive ? '' : 'hidden'}`}
            onClick={onClose}
          >
            취소
          </button>

          <button
            type="button"
            className="w-[50%] text-smallBento-selected py-2 font-bold"
            onClick={onActive}
          >
            확인
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default CustomAlert
