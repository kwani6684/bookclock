/* eslint-disable @next/next/no-img-element */

'use client'

import { useSession } from 'next-auth/react'
/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import navLogo from '../../../public/icon/nav-logo.png'
import DropDown from './dropDown'

const NavBar = () => {
  const [isOpen, setisOpen] = useState(false)
  const session: any = useSession()
  // const [isOpen, setIsOpen] = useState(false)
  const path = usePathname()
  const router = useRouter()

  return (
    <div className="flex items-center">
      <div className="relative flex items-center w-full h-[60px] px-3 justify-between text-2xl ">
        {path === '/' ? (
          <Image src={navLogo} width={50} height={50} alt="로고" />
        ) : (
          <button
            className="flex justify-center text-smallBento-selected "
            onClick={() => router.back()}
          >
            <ArrowBackIosIcon />
          </button>
        )}
        {path !== '/' && (
          <Link
            className="absolute flex justify-center left-0 right-0"
            href={'/'}
          >
            <Image src={navLogo} width={50} height={50} alt="로고" />
          </Link>
        )}
        {session.data ? (
          <div className="flex flex-col items-center justify-center ">
            <button
              onClick={() => {
                setisOpen(!isOpen)
              }}
            >
              <img
                src={session.data.user.image}
                alt="로고"
                className="relative rounded-full h-[50px] w-[50px] border-smallBento-selected border-2 hover:opacity-80 z-50"
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
