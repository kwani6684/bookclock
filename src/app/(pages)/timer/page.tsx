const Timer = () => {
  return (
    <div className="grid px-4 gap-x-2 py-10 h-[400px] grid-cols-2">
      <div className="flex justify-center items-center bg-red-300 rounded-lg">
        줄어드는 시간
      </div>
      <div className="flex justify-center items-center bg-blue-300 rounded-lg">
        늘어나는 시간
      </div>
    </div>
  )
}
export default Timer
