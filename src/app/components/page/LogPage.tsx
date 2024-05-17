'use client'

import LogItem from '@/app/components/log/logItem'
import { LogDataType } from '@/lib/types/logType'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const LogPage = () => {
  const [data, setData] = useState([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: any = useSession()

  useEffect(() => {
    if (session.data) {
      fetch(`/api/log/getLogUserId?id=${session.data.user.id}`)
        .then((r) => r.json())
        .then((result) => setData(result))
    }
  }, [session])

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
