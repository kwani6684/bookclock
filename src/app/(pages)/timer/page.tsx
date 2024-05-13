/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable @next/next/no-img-element */

'use client'

import BookSearchInput from '@/app/components/log/bookSearchInput'
import PlusTimer from '@/app/components/timer/plusTimer'
import TimerCircle from '@/app/components/timer/timerCircle'
import TimerSelect from '@/app/components/timer/timerSelect'
import TimerStart from '@/app/components/timer/timerStart'
import { RootState } from '@/redux/store'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Timer = () => {
  const controls = useAnimation()
  const isWhatTimer = useSelector((state: RootState) => state.timerReducer)
  const isOnTimer = useSelector((state: RootState) => state.onTimerReducer)
  const isCompleteTimer = useSelector(
    (state: RootState) => state.completeTimerReducer,
  )
  const bookInfo = useSelector((state: RootState) => state.bookReducer)

  useEffect(() => {
    // isOnTimer가 true일 경우 항상 scale이 커져 있어야 합니다.
    if (isOnTimer) {
      controls.start({
        scale: 1.2,
        y: 50,
        transition: { duration: 0.5, type: 'spring' },
      })

      // 30초마다 튀는 애니메이션 실행
      const interval = setInterval(async () => {
        await controls.start({
          y: 30, // 조금 위로 튀어오르게
          transition: { duration: 0.6 },
        })
        await controls.start({
          y: 50, // 원위치
          transition: { duration: 1.5, type: 'spring' },
        })
      }, 10000)
      return () => clearInterval(interval)
      // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
    }
  }, [isOnTimer, controls])

  return (
    <div className="relative h-full">
      {isCompleteTimer && (
        <motion.div
          className="absolute w-full flex justify-center bottom-0 z-30"
          initial={{ y: 0, opacity: 0 }}
          animate={{
            opacity: isCompleteTimer ? 1 : 0,
            y: isCompleteTimer ? -200 : 0,
          }}
          transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
        >
          <div className="flex-col justify-center">
            <div className="flex justify-center pb-4">독서를 끝마쳤어요</div>
            <div className="flex gap-x-4 justify-center">
              <button className="push-button bg-gray-400">다음에 하기</button>
              <button
                className="push-button bg-[#007AFF]"
                onClick={() => {
                  fetch(`/api/postLog`, {
                    method: 'POST',
                    body: JSON.stringify({
                      time: 1,
                    }),
                  }).then((response) => {
                    if (response.ok) {
                      console.log('yaho')
                      // '/lists' 로 페이지 이동하는 코드
                    }
                  })
                }}
              >
                기록하기
              </button>
            </div>
          </div>
        </motion.div>
      )}
      <div className=" flex-col pt-2 px-3 ">
        {isOnTimer && (
          <div className="flex justify-center">
            <div className="text-xl font-bold">읽는 중 . . .</div>
          </div>
        )}
        {!isOnTimer && !isCompleteTimer && (
          <div className="flex justify-between">
            <div> Step.1 책 제목을 입력해주세요</div>
            {bookInfo.bookInfo && (
              <Link href={'../logs/bookSearch'}>다시 검색</Link>
            )}
          </div>
        )}

        {bookInfo.bookInfo !== undefined ? (
          <div className="flex justify-center h-[150px] relative">
            <motion.div
              className="absolute inset-0 flex justify-center"
              initial={{ x: -100 }}
              animate={
                isOnTimer
                  ? controls
                  : {
                      x: 0,
                      scale: 1,
                      y: 0,
                    }
              }
              transition={{
                delay: isOnTimer ? 0.3 : 0,
                duration: 0.5,
                type: 'spring',
              }}
            >
              <img
                src={
                  bookInfo.bookInfo?.thumbnail
                    ? bookInfo.bookInfo?.thumbnail
                    : 'http://via.placeholder.com/120X150'
                }
                alt="책 표지"
                className="rounded-2xl h-full py-2"
              />
            </motion.div>
            <div
              className={`w-full h-[150px] flex justify-center items-center text-black  px-4 border-dashed rounded-lg border-4 border-gray-400 hover:bg-gray-100 focus:outline-none ${(isOnTimer || isCompleteTimer) && 'hidden'}`}
            ></div>
          </div>
        ) : (
          <BookSearchInput />
        )}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: isOnTimer || isCompleteTimer ? 0 : 1,
            y: isOnTimer || isCompleteTimer ? -200 : 0,
          }}
          transition={{ delay: 0.1, duration: 0.5, type: 'spring' }}
        >
          <TimerSelect />
        </motion.div>
      </div>
      {/* )} */}

      <div>
        {isWhatTimer !== 0 &&
          (isWhatTimer === -1 ? (
            <div>
              <motion.div
                animate={{
                  y: isOnTimer || isCompleteTimer ? -50 : 0,
                }}
                transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
              >
                <div className="flex justify-center">
                  <TimerCircle />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 1 }}
                animate={{
                  opacity: isOnTimer || isCompleteTimer ? 0 : 1,
                }}
              >
                <div className="flex justify-center ">
                  <TimerStart />
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              animate={{
                y: isOnTimer ? -50 : 0,
              }}
              transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
            >
              <PlusTimer />
            </motion.div>
          ))}
      </div>
    </div>
  )
}
export default Timer
