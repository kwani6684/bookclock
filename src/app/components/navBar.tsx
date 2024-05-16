'use client'

import { useSession } from 'next-auth/react'
/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import navLogo from '../../../public/icon/nav-logo.png'

const NavBar = () => {
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
          <button className="flex justify-center" onClick={() => router.back()}>
            <ArrowBackIosIcon />
          </button>
        )}
        {session.data ? (
          <div className="text-xl font-semibold text-smallBento-selected">
            {session.data.user.name}
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
