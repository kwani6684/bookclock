import Link from 'next/link'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'

const BookSearchInput = () => {
  return (
    <div className="flex-col pt-2 sm:px-0">
      <div className="flex py-2 justify-center w-full">
        <Link
          href={'/logs/bookSearch'}
          className=" w-full h-[150px] flex text-[#758074] justify-center items-center  px-4 border-dashed rounded-lg border-4 border-smallBento-primary hover:bg-smallBento-primary hover:text-white hover:border-white "
        >
          <ManageSearchIcon className=" scale-[2]"></ManageSearchIcon>
        </Link>
      </div>
    </div>
  )
}
export default BookSearchInput
