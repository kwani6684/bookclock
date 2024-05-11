import Link from 'next/link'

const BookSearchInput = () => {
  return (
    <div className="flex-col pt-2 sm:px-0">
      <div className="flex py-2 justify-center w-full">
        <Link
          href={'../logs/bookSearch'}
          className=" w-full h-[150px] flex justify-center items-center text-black  px-4 border-dashed rounded-lg border-4 border-gray-400 hover:bg-gray-100 focus:outline-none"
        >
          <div>책을 검색해보세요</div>
        </Link>
      </div>
    </div>
  )
}
export default BookSearchInput
