const StartPageInput = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[300px]">
      <div className="flex flex-col items-center">
        <span>시작 페이지를 입력해주세요: </span>
        <div className="relative">
          <span className="absolute left-0 pl-2 flex items-center justify-center h-full text-4xl text-gray-400">
            P.
          </span>
          <input
            type="text"
            className="input w-[150px] rounded-md pl-10 pr-3 text-4xl text-center appearance-none"
          />
        </div>
      </div>
    </div>
  )
}

export default StartPageInput
