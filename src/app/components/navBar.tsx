/* eslint-disable @next/next/no-img-element */

'use client'

import { useSession } from 'next-auth/react'
/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { setOffTimer } from '@/redux/features/onTimerSlice'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import navLogo from '../../../public/icon/nav-logo.png'
import DropDown from './dropDown'
import CustomAlert from './alert'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const session: any = useSession()
  const isOnTimer = useSelector((state: RootState) => state.onTimerReducer)

  // const [isOpen, setIsOpen] = useState(false)
  const path = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()

  const handleBack = () => {
    router.back()
    dispatch(setOffTimer())
  }
  const handleAlert = () => {
    setIsAlertOpen(!isAlertOpen)
  }

  return (
    <div className="flex items-center">
      {isAlertOpen && (
        <CustomAlert
          message={`타이머가 리셋됩니다. 그래도 괜찮으시겠습니까?`}
          onClose={handleAlert}
          isActive={true}
          active={() => {
            dispatch(setOffTimer())
            router.push('/')
          }}
        ></CustomAlert>
      )}
      <div className="relative flex items-center w-full h-[60px] px-3 justify-between text-2xl ">
        {path === '/' ? (
          <Image src={navLogo} width={50} height={50} alt="로고" />
        ) : (
          <button
            className="flex justify-center text-smallBento-selected "
            onClick={isOnTimer ? handleAlert : handleBack}
          >
            <ArrowBackIosIcon />
          </button>
        )}
        {path !== '/' && (
          <Link
            className="absolute left-1/2 w-[50px] flex text-center transform -translate-x-1/2 right-0"
            href={'/'}
          >
            <Image src={navLogo} width={50} height={50} alt="로고" />
          </Link>
        )}
        {session.data ? (
          <div className="flex flex-col items-center justify-center ">
            <button
              onClick={() => {
                setIsOpen(!isOpen)
              }}
            >
              <img
                src={session.data.user.image}
                alt="로고"
                className="relative rounded-full h-[40px] w-[40px] border-smallBento-selected border-2 hover:opacity-80 z-50"
              />
            </button>
            <DropDown isOpen={isOpen} />
          </div>
        ) : (
          <Link
            className="text-xl text-smallBento-hover font-semibold hover:text-smallBento-selected"
            href={'/login'}
          >
            로그인
          </Link>
        )}
      </div>
    </div>
  )
}
export default NavBar
