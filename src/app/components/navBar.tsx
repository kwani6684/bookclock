'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  // const session: any = useSession()
  // const [isOpen, setIsOpen] = useState(false)
  const path = usePathname()

  return (
    <div className="flex items-center">
      <div className="relative flex items-center w-full h-[60px] px-3 justify-between text-2xl ">
        {path === '/' ? <div>로고</div> : <Link href={'/'}>뒤로가기</Link>}
        <Link href={'/login'}>로그인</Link>
      </div>
    </div>
  )
}
export default NavBar
