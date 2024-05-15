import LogItem from '@/app/components/log/logItem'
import { LogDataType } from '@/lib/types/logType'
import Link from 'next/link'
import { getLog } from '@/pages/api/getLog'

const Logs = async () => {
  const logsData = await getLog()
  return (
    <div className="flex flex-col justify-center items-center px-2">
      <div className="default-button w-full text-center py-2 ">기록</div>
      <div className="grid gap-x-4 grid-cols-2">
        {logsData.map((items: LogDataType, i: number) => (
          // eslint-disable-next-line no-underscore-dangle
          <Link key={i} href={`/logs/${items._id}`}>
            <LogItem key={i} data={items}></LogItem>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Logs