'use client'

import LogItem from '@/app/components/log/logItem'
import { LogDataType } from '@/lib/types/logType'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import LoadingSpinner from '../loadingSpinner'

const LogPage = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: any = useSession()

  useEffect(() => {
    // 비동기 함수 선언
    const fetchData = async () => {
      if (session.data) {
        const response = await fetch(
          `/api/log/getLogUserId?id=${session.data.user.id}`,
        )
        const result = await response.json()
        setData(result)
        setIsLoading(false) // fetch 요청이 완료된 후 로딩 상태 업데이트
      }
    }

    // 비동기 함수 호출
    fetchData()
  }, [session])

  if (isLoading) {
    return <LoadingSpinner />
  }
  return (
    <div className="flex flex-col justify-center items-center px-2">
      <div className="bg-semiBrown rounded-[20px] text-white w-full text-center py-2 ">
        기록
      </div>
      <div className="grid gap-x-4 grid-cols-2">
        {data.length > 1 &&
          data.map((items: LogDataType, i: number) => (
            // eslint-disable-next-line no-underscore-dangle
            <Link key={i} href={`/logs/${items._id}`}>
              <LogItem key={i} data={items}></LogItem>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default LogPage
