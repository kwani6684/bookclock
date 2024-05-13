import { setEndPage } from '@/redux/features/logSlice'
import { AppDispatch } from '@/redux/store'
import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

const EndPageInput = () => {
  const dispatch = useDispatch<AppDispatch>()

  const handleEndPage = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    dispatch(setEndPage(newValue))
  }

  return (
    <div className="flex  flex-col items-center justify-center ">
      <div className="flex flex-col items-center">
        <span>어디까지 읽으셨나요?</span>
        <div className="relative">
          <span className="absolute  pl-2 flex items-center justify-center h-full text-4xl text-gray-400">
            P.
          </span>
          <input
            type="text"
            onChange={(e) => {
              handleEndPage(e)
            }}
            className="input w-[100px] rounded-md pl-10 text-2xl appearance-none"
          />
        </div>
      </div>
    </div>
  )
}

export default EndPageInput
