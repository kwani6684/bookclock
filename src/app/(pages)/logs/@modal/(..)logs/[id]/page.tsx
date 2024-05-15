/* eslint-disable @next/next/no-img-element */
import CustomModal from '@/app/components/modal'
import { getLogId } from '@/pages/api/getLog'

/* eslint-disable @typescript-eslint/no-unused-vars */

const LogDetailPage = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const data = await getLogId(id)
  return (
    <div>
      <CustomModal isOpen={true} size={'350px'}>
        <div className="px-8 py-8">
          <div className="flex flex-col justify-center items-center">
            <img
              src={data.book.thumbnail}
              alt="책 표지"
              className=" mb-2 rounded object-fll"
            />
            <div>{data.book.title}</div>
            <div>by {data.book.authors[0]}</div>
          </div>
          <div className="flex justify-center gap-x-8 grid-cols-3">
            <div>읽은 페이지</div>
            <div>읽은 시간</div>
            <div>읽은 날짜</div>
          </div>
          {/* 내용 엔터키 적용 */}
          <div className="flex justify-center items-center">
            <div className="w-[50vw] sm:w-[90vw] my-4 rounded-lg overflow-hidden shadow-lg px-3 py-3 sm:pt-0 p-10 bg-[#FFFCF9]">
              <div className="mt-10 px-5">
                <h2 className="text-2xl sm:text-lg font-bold mb-4 border-black border-b pb-5 text-[#503526]">
                  {data.title}
                </h2>
                <div
                  className="h-[45vh] mx-auto text-[#999999] overflow-y-auto max-h-[45vh]"
                  dangerouslySetInnerHTML={{
                    __html: data.memo.replace(/\n/g, '<br>'),
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
