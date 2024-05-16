'use client'

import { useRouter } from 'next/navigation'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import closeIcon from '../../../public/icon/closeIcon.png'

interface ModalType {
  isOpen: boolean
  onClose?: boolean // 모달을 닫을 때 호출할 함수
  children: React.ReactNode
  size: string
  modalheight?: string
  modalColor?: string
}

const CustomModal = ({
  isOpen,
  onClose,
  children,
  size,
  modalheight,
  modalColor,
}: ModalType) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  const handleClose = () => {
    setOpen(false)
    if (onClose) {
      router.back()
    }
  }

  const handleOutsideClick = () => {
    handleClose()
  }

  const handleInsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      onClick={handleOutsideClick}
    >
      {/* 모달 슬라이드 애니메이션 수정 */}

      <div className="flex justify-center align-center h-full outline-0">
        <Paper
          elevation={2}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: size,
            backgroundColor: modalColor,
            maxWidth: '100%',
            maxHeight: '100%',
            overflowY: 'auto',
          }}
          className={`h-[${modalheight}] sm:h-[100vh]`}
          onClick={handleInsideClick}
        >
          <Image
            src={closeIcon}
            alt="closeIcon"
            className="mr-6 mt-6 float-right cursor-pointer"
            onClick={handleClose}
          />
          {children}
        </Paper>
      </div>
    </Modal>
  )
}

export default CustomModal
