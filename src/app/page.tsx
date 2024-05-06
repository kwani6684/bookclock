export default function Home() {
  return (
    <div className="flex-col justify-center">
      <div className="flex justify-center">독서관리 타이머 앱</div>
      {/* 벤또 그리드 */}
      <div className="w-full px-4 py-10 bg-cyan-900">
        <div className="grid gap-x-2 gap-y-2 w-full grid-cols-2">
          <div className="flex justify-center items-center bg-pink-300 h-[300px] rounded-lg col-span-2">
            독서 타이머
          </div>
          <div className="flex justify-center h-[150px] items-center bg-sky-400 rounded-lg">
            내 기록
          </div>
          <div className="flex justify-center h-[150px] items-center bg-emerald-400 rounded-lg">
            랭킹
          </div>
        </div>
      </div>
    </div>
  )
}
