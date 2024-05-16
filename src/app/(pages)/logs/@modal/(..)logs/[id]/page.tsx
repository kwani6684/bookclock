/* eslint-disable @next/next/no-img-element */
import CustomModal from '@/app/components/modal'
import getLogId from '@/pages/api/log/getLogId'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'

/* eslint-disable @typescript-eslint/no-unused-vars */

const LogDetailPage = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const data = await getLogId(id)
  const getTimeString = () => {
    if (data.readTime >= 60) {
      return `${data.readTime / 60}분 ${data.readTime % 60}초`
    }
    return `${data.readTime}초`
  }
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear().toString().substr(-2) // 년도의 마지막 두 자리
    const month = `0${date.getMonth() + 1}`.slice(-2) // 월 (0을 추가하여 두 자리로 만듦)
    const day = `0${date.getDate()}`.slice(-2) // 일 (0을 추가하여 두 자리로 만듦)

    return `${year}.${month}.${day}` // 결과 형식: "24.05.16"
  }

  return (
    <div>
      <CustomModal
        isOpen={true}
        modalheight={'60vh'}
        onClose={true}
        size={'350px'}
      >
        <div className="px-8 py-8">
          <div className="flex flex-col justify-center items-center">
            <div className="flex relative">
              <img
                src={data.book.thumbnail}
                alt="책 표지"
                className=" mb-2 rounded object-fll"
              />
              <div className="absolute rounded-full bg-white bg-opacity-60  ml-1 mt-1 ">
                {data.finished ? (
                  <WorkspacePremiumIcon className="text-yellow-400" />
                ) : (
                  <LocalFireDepartmentIcon className="text-red-400" />
                )}
              </div>
            </div>
            <div className="text-lg font-bold text-smallBento-selected">
              {data.book.title}
            </div>
            <div>by {data.book.authors[0]}</div>
          </div>
          <div className="flex pt-2 text-sm justify-center gap-x-8 grid-cols-3">
            <div className="flex flex-col pb-1 items-center justify-center">
              <div>읽은 페이지</div>
              <div>{data.endPage}</div>
            </div>
            <div className="flex flex-col pb-1 items-center justify-center">
              <div>읽은 시간</div>
              <div>{getTimeString()}</div>
            </div>
            <div className="flex flex-col pb-1 items-center justify-center">
              <div>읽은 날짜</div>
              <div>{formatDate(data.date)}</div>
            </div>
          </div>
          {/* 내용 엔터키 적용 */}
          <div className="flex justify-center items-center">
            <div className="my-4 w-full rounded-lg overflow-hidden shadow-lg px-3 py-3 sm:pt-0 p-10 bg-[#FFFCF9]">
              <div className="mt-4 px-2">
                <h2 className="text-lg font-bold mb-2 border-black border-b pb-2 text-[#503526]">
                  메모
                </h2>
                <div
                  className="h-[150px] mx-auto text-[#999999] overflow-y-auto max-h-[45vh]"
                  dangerouslySetInnerHTML={{
                    __html: data.memo ? data.memo.replace(/\n/g, '<br>') : '',
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  )
}

export default LogDetailPage
