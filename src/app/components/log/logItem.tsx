/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-underscore-dangle */

import { LogDataType } from '@/lib/types/logType'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'

interface LogDataProps {
  data: LogDataType
}

const LogItem = ({ data }: LogDataProps) => {
  return (
    <div className="flex relative rounded-[20px] h-[200px]">
      <img
        src={data.book.thumbnail}
        alt="책 표지"
        className="rounded-[25px] h-full py-2"
      />
      <div className="absolute rounded-full bg-white bg-opacity-60  ml-1 mt-3 ">
        {data.finished ? (
          <WorkspacePremiumIcon className="text-yellow-400" />
        ) : (
          <LocalFireDepartmentIcon className="text-red-400" />
        )}
      </div>
      <div className="absolute rounded-b-[20px] w-[100%] flex justify-center bottom-0 bg-black opacity-80 py-1 px-2 mb-2">
        <div className="text-white font-semibold overflow-hidden text-sm text-ellipsis whitespace-nowrap">
          {data.book.title}
        </div>
      </div>
    </div>
  )
}

export default LogItem
