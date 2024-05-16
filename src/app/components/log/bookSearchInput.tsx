import Link from 'next/link'

const BookSearchInput = () => {
  return (
    <div className="flex-col pt-2 sm:px-0">
      <div className="flex py-2 justify-center w-full">
        <Link
          href={'/logs/bookSearch'}
          className=" w-full h-[150px] flex text-[#758074] justify-center items-center  px-4 border-dashed rounded-lg border-4 border-smallBento-primary hover:bg-smallBento-primary hover:text-white hover:border-white "
        >
          <div>책을 검색해보세요</div>
        </Link>
      </div>
    </div>
  )
}
export default BookSearchInput
