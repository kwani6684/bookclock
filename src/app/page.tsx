import Bento from './components/bento'

export default function Home() {
  return (
    <div className="flex-col justify-center">
      <div className="flex justify-center">독서관리 타이머 앱</div>
      {/* 벤또 그리드 */}
      <div className="w-full px-6 py-10 bg-cyan-900">
        <div className="grid gap-x-8 gap-y-8 w-full grid-cols-2">
          <Bento
            content="독서 타이머"
            color="bg-pink-400"
            height={300}
            size="2"
          />

          <Bento content="내 기록" color="bg-sky-400" height={150} size="1" />

          <Bento content="랭킹" color="bg-emerald-400" height={150} size="1" />
        </div>
      </div>
    </div>
  )
}
