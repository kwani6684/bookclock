import Link from 'next/link'
import Bento from './components/bento'

export default function Home() {
  return (
    <div className="flex-col justify-center">
      <div className="flex justify-center">독서관리 타이머 앱</div>
      {/* 벤또 그리드 */}
      <div className="w-full px-6 py-10 bg-amber-200">
        <div className="grid gap-x-8 gap-y-8 w-full grid-cols-2">
          {/* 타이머 */}
          <Link className="col-span-2" href={'/timer'}>
            <Bento content="독서 타이머" color="bg-pink-200" height={300} />
          </Link>
          {/* 내 기록  */}
          <Link className="col-span-1" href={'/logs'}>
            <Bento content="내 기록" color="bg-sky-200" height={150} />
          </Link>
          {/* 랭킹 */}
          <Link className="col-span-1" href={'/ranking'}>
            <Bento content="랭킹" color="bg-emerald-200" height={150} />
          </Link>
        </div>
      </div>
    </div>
  )
}
