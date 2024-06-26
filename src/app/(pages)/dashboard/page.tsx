'use client'

import LoadingSpinner from '@/app/components/loadingSpinner'
import { LogDataType } from '@/lib/types/logType'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

const DashBoard = () => {
  const [totalCount, setTotalCount] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [readTimeCount, setReadTimeCount] = useState()
  const [completedBookCount, setCompletedBookCount] = useState()
  const [recentReadBookData, setRecentReadBookData] = useState<LogDataType>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: any = useSession()

  useEffect(() => {
    if (session.data) {
      // 모든 fetch 요청을 Promise 배열로 준비
      const fetchPromises = [
        fetch(`/api/dashboard/getReadCount?id=${session.data.user.id}`).then(
          (r) => r.json(),
        ),
        fetch(
          `/api/dashboard/getReadTimeCount?id=${session.data.user.id}`,
        ).then((r) => r.json()),
        fetch(
          `/api/dashboard/getCompletedBooks?id=${session.data.user.id}`,
        ).then((r) => r.json()),
        fetch(
          `/api/dashboard/getRecentReadBook?id=${session.data.user.id}`,
        ).then((r) => r.json()),
      ]

      // Promise.all을 사용하여 모든 요청을 동시에 실행
      Promise.all(fetchPromises).then((results) => {
        // 각 결과를 상태에 설정
        setTotalCount(results[0])
        setReadTimeCount(results[1])
        setCompletedBookCount(results[2])
        setRecentReadBookData(results[3])

        // 모든 요청이 완료된 후에 로딩 상태 업데이트
        setIsLoading(false)
      })
    }
  }, [session])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const month = `0${date.getMonth() + 1}`.slice(-2) // 월 (0을 추가하여 두 자리로 만듦)
    const day = `0${date.getDate()}`.slice(-2) // 일 (0을 추가하여 두 자리로 만듦)

    return `${month}.${day}` // 결과 형식: "24.05.16"
  }
  if (isLoading) {
    return <LoadingSpinner />
  }
  return (
    <div className="flex-col justify-center">
      <div className="w-full px-2 py-2">
        <div className="bg-semiBrown rounded-[20px] text-white w-full text-center py-2 mb-2">
          대시보드
        </div>
        <div className="grid gap-x-2 gap-y-2 w-full grid-rows-6 grid-cols-2">
          <div className="flex flex-col rounded-[30px] p-5 row-span-2 col-span-2 font-black justify-center items-center text-mainBg bg-smallBento-primary ">
            <div className="text-lg pb-2">요즘 읽고있는 책</div>
            <img src={recentReadBookData?.book.thumbnail} alt="bookimage"></img>
          </div>

          <div className="flex flex-col rounded-[30px] p-5 font-black items-center text-mainBg bg-smallBento-primary ">
            <div className="text-lg pb-2">총 읽은 횟수</div>
            <div className="flex items-end">
              <div className="text-4xl pl-4 pr-2">{totalCount}</div>
              <div>번</div>
            </div>
          </div>

          <div className="flex flex-col rounded-[30px] p-5 font-black items-center text-mainBg bg-smallBento-primary ">
            <div className="text-lg pb-2">총 읽은 시간</div>
            <div className="flex items-end">
              <div className="text-4xl pl-4 pr-2">{readTimeCount}</div>
              <div>초</div>
            </div>
          </div>

          <div className="flex flex-col rounded-[30px] p-5 font-black items-center text-mainBg bg-smallBento-primary ">
            <div className="text-lg pb-2">다 읽은 책</div>
            <div className="flex items-end">
              <div className="text-4xl pl-4 pr-2">{completedBookCount}</div>
              <div>권</div>
            </div>
          </div>

          <div className="flex flex-col rounded-[30px] p-5 font-black items-center text-mainBg bg-smallBento-primary ">
            <div className="text-lg pb-2">최근 읽은 날짜</div>
            <div className="flex items-end">
              <div className="text-4xl pl-4 pr-2">
                {formatDate(
                  recentReadBookData?.date ? recentReadBookData?.date : '',
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
