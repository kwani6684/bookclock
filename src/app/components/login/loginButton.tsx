'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import kakaologin from '../../../../public/kakaoLogin.png'

export default function LoginBtn({ onLogin }: { onLogin?: () => void }) {
  return (
    <Image
      src={kakaologin}
      alt="kakaoLogin"
      className="cursor-pointer"
      onClick={async () => {
        const result = await signIn('kakao', { callbackUrl: '/' })
        if (result?.error) {
          // 로그인 실패시
        } else if (result?.url && onLogin) {
          onLogin()
        }
      }}
    />
  )
}
