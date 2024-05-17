import type { Viewport } from 'next'
import ReduxProvider from '@/redux/provider'
import NavBar from './components/navBar'
import './globals.css'

export const metadata = {
  title: '읽는 시간',
  description: '독서관리를 위한 타이머 앱, 읽는 시간',
  manifest: '/manifest.json',
  metadataBase: new URL('https://bookclock.vercel.app/'),
  icons: {
    icon: '/icon/favicon.ico',
    other: [
      {
        url: '/icon/splashscreen.png',
        rel: 'apple-touch-startup-image',
      },
    ],
  },
  openGraph: {
    siteName: '읽는 시간',
    title: 'bookclock',
    description: '독서관리를 위한 타이머 앱, 읽는 시간',
    images: '/appIcon/bookClock512.png',
    url: 'https://bookclock.vercel.app/',
  },
}

export const viewport: Viewport = {
  themeColor: '#B6C4B5',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex justify-center bg-[#798B78] overflow-y-auto h-screen ">
          <div className="justify-center w-[350px] bg-mainBg overflow-y-auto hide-scrollbar sm:w-full">
            <ReduxProvider>
              <NavBar />
              {children}
            </ReduxProvider>
          </div>
        </div>
      </body>
    </html>
  )
}
