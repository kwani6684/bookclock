/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable @next/next/no-img-element */

'use client'

import BottomSheet from '@/app/components/bottomSheet'
import EndPageInput from '@/app/components/log/EndPageInput'
import BookSearchInput from '@/app/components/log/bookSearchInput'
import PlusTimer from '@/app/components/timer/plusTimer'
import TimerCircle from '@/app/components/timer/timerCircle'
import TimerSelect from '@/app/components/timer/timerSelect'
import TimerStart from '@/app/components/timer/timerStart'
import { setUnCompleteTimer } from '@/redux/features/completeTimerSlice'
import { setFinished, setMemo } from '@/redux/features/logSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { Checkbox, checkboxClasses } from '@mui/material'
import { motion, useAnimation } from 'framer-motion'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Timer = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: any = useSession()
  const router = useRouter()
  const controls = useAnimation()
  const isWhatTimer = useSelector((state: RootState) => state.timerReducer)
  const isOnTimer = useSelector((state: RootState) => state.onTimerReducer)
  const log = useSelector((state: RootState) => state.LogReducer)
  const isCompleteTimer = useSelector(
    (state: RootState) => state.completeTimerReducer,
  )
  const bookInfo = useSelector((state: RootState) => state.bookReducer)
  const dispatch = useDispatch<AppDispatch>()

  const toggleBottomSheet = () => {
    dispatch(setUnCompleteTimer())
  }
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    dispatch(setFinished(isChecked))
  }

  const handlePostLog = () => {
    fetch(`/api/log/postLog`, {
      method: 'POST',
      body: JSON.stringify({
        writer: session.data?.user?.id,
        date: new Date().toISOString(),
        count: 1,
        ...log,
      }),
    }).then((response) => {
      if (response.ok) {
        router.push('/logs')
        toggleBottomSheet()
      }
    })
  }
  // textarea의 값이 변경될 때 호출될 이벤트 핸들러 함수입니다.
  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value
    dispatch(setMemo(newValue))
  }

  useEffect(() => {
    // isOnTimer가 true일 경우 항상 scale이 커져 있어야 합니다.
    if (isOnTimer) {
      controls.start({
        scale: 1.2,
        y: 30,
        transition: { duration: 0.5, type: 'spring' },
      })

      // 30초마다 튀는 애니메이션 실행
      const interval = setInterval(async () => {
        await controls.start({
          y: 10, // 조금 위로 튀어오르게
          transition: { duration: 0.6 },
        })
        await controls.start({
          y: 30, // 원위치
          transition: { duration: 1.5, type: 'spring' },
        })
      }, 10000)
      return () => clearInterval(interval)
      // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
    }
  }, [isOnTimer, controls])

  const getTimeString = () => {
    if (log.readTime >= 60) {
      return `${log.readTime / 60}분 ${log.readTime % 60}초`
    }
    return `${log.readTime}초`
  }
  return (
    <div className={`relative h-[${100 % -60}px] `}>
      {isCompleteTimer && (
        <motion.div
          className="absolute w-full flex justify-center bottom-0 z-30"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isCompleteTimer ? 1 : 0,
          }}
          transition={{ delay: 0.3, duration: 1, type: 'spring' }}
        >
          <div className="flex flex-col items-center justify-center">
            <BottomSheet onClose={toggleBottomSheet}>
              <div className="flex flex-col gap-y-2 h-[50vh] p-4 ">
                <h2 className="text-xl font-bold">독서를 마쳤어요🎉</h2>
                <p className="text-sm">오늘의 독서를 기록해보세요</p>
                <div className="flex flex-col gap-y-1 items-center justify-center">
                  <div>독서시간</div>
                  <div className="text-3xl font-bold pb-2">
                    {getTimeString()}
                  </div>
                  <div className="flex items-center px-2 justify-center gap-x-4 pt-3 text-sm border-t-2 ">
                    <EndPageInput />
                    <div>또는</div>
                    <div>
                      <div className="flex justify-center">
                        책을 다 읽으셨나요?
                      </div>
                      <div className="flex justify-center">
                        <Checkbox
                          onChange={handleCheckboxChange}
                          className="p-1"
                          sx={{
                            [`&, &.${checkboxClasses.checked}`]: {
                              color: 'rgb(55,127,100)',
                            },
                          }}
                        ></Checkbox>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <h3 className="font-semibold">메모</h3>
                  {/* 텍스트에리아 */}
                  <textarea
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-smallBento-selected"
                    placeholder="여기에 메모를 입력하세요..." // 리덕스 스토어의 memo 상태를 value로 설정합니다.
                    onChange={handleTextareaChange} // 사용자 입력을 처리하기 위해 onChange 이벤트에 핸들러 함수를 연결합니다.
                  ></textarea>
                </div>
                <button
                  onClick={
                    log.finished || log.endPage ? handlePostLog : () => {}
                  }
                  className={` flex py-2 justify-center w-full default-button disabled:bg-slate-300 disabled:hover:text-black`}
                  disabled={!(log.finished || log.endPage)}
                >
                  저장
                </button>
              </div>
            </BottomSheet>
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
            <div> Step.1 읽을 책을 선택해주세요.</div>
            {bookInfo.bookInfo && (
              <Link href={'/logs/bookSearch'}>다시 검색</Link>
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
              className={`w-full h-[150px] flex justify-center items-center text-black px-4 border-dashed rounded-lg border-4 border-smallBento-primary hover:bg-gray-100 focus:outline-none ${(isOnTimer || isCompleteTimer) && 'hidden'}`}
            ></div>
          </div>
        ) : (
          <BookSearchInput />
        )}
        {bookInfo.bookInfo !== undefined && (
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
        )}
      </div>
      {/* )} */}

      <div>
        {isWhatTimer !== 0 &&
          (isWhatTimer === -1 ? (
            <div>
              <motion.div
                animate={{
                  y: isOnTimer || isCompleteTimer ? -90 : 0,
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
                y: isOnTimer || isCompleteTimer ? -90 : 0,
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
