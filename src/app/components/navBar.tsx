'use client'

import { useSession } from 'next-auth/react'
/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NavBar = () => {
  const session: any = useSession()
  // const [isOpen, setIsOpen] = useState(false)
  const path = usePathname()
  const router = useRouter()

  return (
    <div className="flex items-center">
      <div className="relative flex items-center w-full h-[60px] px-3 justify-between text-2xl ">
        {path === '/' ? (
          <div>로고</div>
        ) : (
          <button onClick={() => router.back()}>뒤로가기</button>
        )}
        {session.data ? (
          <div>{session.data.user.name}</div>
        ) : (
          <Link href={'/login'}>로그인</Link>
        )}
      </div>
    </div>
  )
}
export default NavBar
