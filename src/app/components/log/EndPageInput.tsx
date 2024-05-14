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
        <span className="pb-2">어디까지 읽으셨나요?</span>
        <div className="relative">
          <span
            className={`absolute pl-2 flex items-center justify-center h-full text-4xl text-smallBento-selected`}
          >
            P.
          </span>
          <input
            type="text"
            onChange={(e) => {
              handleEndPage(e)
            }}
            className="input w-[100px] rounded-md pl-10 text-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-smallBento-selected"
          />
        </div>
      </div>
    </div>
  )
}

export default EndPageInput
