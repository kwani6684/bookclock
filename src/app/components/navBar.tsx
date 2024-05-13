'use client'

import { motion } from 'framer-motion'
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

const NavBar = () => {
  const session: any = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const dropdownVariants = {
    open: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    closed: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  }
  return (
    <div className="flex items-center">
      <div className="relative flex items-center w-full bg-amber-500 justify-center text-4xl ">
        책깍책깍
        <div className="absolute left-0 pl-3 text-lg rounded">
          <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            메뉴
          </button>
          {isOpen && (
            <motion.div
              className="absolute left-0 p-2 text-sm flex justify-center w-[70px] bg-white rounded"
              initial="closed"
              animate={isOpen ? 'open' : 'closed'}
              variants={dropdownVariants}
            >
              {session.data ? (
                <div className="">{session.data?.user.name}</div>
              ) : (
                <Link href={'/login'}>로그인</Link>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
export default NavBar
