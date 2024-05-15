/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { BookType } from '@/lib/types/bookType'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { setBookInfo } from '@/redux/features/bookSlice'
import Link from 'next/link'
import { setBook } from '@/redux/features/logSlice'
import searchIcon from '../../../../public/icon/searchIcon.png'

const BookSearch = () => {
  const [bookName, setBookName] = useState<string>('')
  const [page, setPage] = useState(1)
  const [last, setLast] = useState(1)

  const [documents, setDocuments] = useState<any>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<BookType>()
  const dispatch = useDispatch<AppDispatch>()

  const callAPI = async () => {
    const url = `https://dapi.kakao.com/v3/search/book?target=title&query=${bookName}&page=${page}&size=10`
    const config = {
      headers: { Authorization: `KakaoAK 4a3294385b3e838f9f020a39fe8c04e3` },
    }

    const result = await axios.get(url, config)
    setDocuments(result.data.documents)
    const total = result.data.meta.pageable_count
    setLast(Math.ceil(total / 10))
    setModalOpen(true) // API 호출 후 모달 열기
  }
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault() // 기본 제출 이벤트 방지
    setPage(1) // 새로운 검색을 위해 페이지를 1로 초기화
    callAPI()
  }
  useEffect(() => {
    if (!bookName) return // 빈 검색어인 경우 API 호출하지 않음
    callAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]) // 페이지가 변경될 때마다 호출

  const nextPage = (e: any) => {
    e.preventDefault()
    const container = document.querySelector('.scrollBar') // 상위 div 박스의 클래스명으로 선택

    if (container) {
      container.scrollTop = 0 // 스크롤을 맨 위로 이동
    }
    setPage((prevPage) => Math.min(last, prevPage + 1))
  }

  const prevPage = (e: any) => {
    e.preventDefault()
    const container = document.querySelector('.scrollBar') // 상위 div 박스의 클래스명으로 선택

    if (container) {
      container.scrollTop = 0 // 스크롤을 맨 위로 이동
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    setPage((prevPage) => Math.max(1, prevPage - 1))
  }

  const closeOnOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      e.preventDefault()
      setModalOpen(false)
    }
  }
  const handleConfirmation = (confirmed: boolean) => {
    if (confirmed && selectedBook) {
      dispatch(setBookInfo(selectedBook))
      dispatch(setBook(selectedBook))
    }
    setModalOpen(false)
  }
  const handleBookClick = (data: BookType) => {
    const copy: BookType = {
      isbn: data.isbn,
      title: data.title,
      thumbnail: data.thumbnail,
      authors: data.authors,
    }
    setSelectedBook(copy)
  }

  return (
    <div className="flex-col px-3 py-4 sm:px-0">
      <div className="relative w-[100%]">
        <Image
          src={searchIcon}
          alt="Search"
          width={20}
          height={20}
          onClick={(e) => onSubmit(e)}
          className={`absolute left-3 top-1/2 transform  -translate-y-1/2 ${bookName ? 'opacity-100' : 'opacity-20'}`}
        />
        <input
          type="text"
          size={20}
          placeholder="검색어를 입력해주세요"
          onChange={(e) => setBookName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmit(e)
            }
          }}
          className="pl-10 w-[100%] h-[2.5rem] px-3 border-2 border-smallBento-primary rounded-2xl bg-white focus:border-smallBento-selected focus:outline-none"
        />
      </div>

      {modalOpen && ( // 서버컴포넌트 활용 위해 modal route 방식 변경 필요
        <div className="flex hide-scrollBar pt-4">
          <div
            className="w-[350px] inset-0 z-50 flex items-center justify-center"
            onClick={closeOnOverlayClick}
          >
            <div className="  sm:px-4 rounded-lg overflow-y-auto">
              <div className="grid grid-cols-1 overflow-y-auto max-h-[70vh] justify-items-start hide-scrollBar">
                {documents.map((d: any, i: number) => (
                  <div
                    key={i}
                    className={`p-2 max-h-[30vh] block ${selectedBook && selectedBook.isbn === d.isbn ? 'rounded-[13px] border-4 border-smallBento-selected' : 'rounded-lg border-4 border-transparent'}`}
                  >
                    <div
                      className="flex align-center"
                      key={i}
                      onClick={() => handleBookClick(d)}
                    >
                      <img
                        src={
                          d.thumbnail
                            ? d.thumbnail
                            : 'http://via.placeholder.com/120X150'
                        }
                        alt="책 표지"
                        className="rounded-2xl"
                      />
                      <div className="flex-col justify-between p-4 mt-2 sm:text-sm h-full">
                        <div className="flex font-black text-md">{d.title}</div>
                        <div>
                          <div className="font-semibold text-[#646464]">
                            | 지은이 {d.authors[0]}
                          </div>
                          <div className="font-semibold text-slate-700">
                            출판사:{d.publisher}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4">
                <button onClick={prevPage} className="px-4 py-2 default-button">
                  이전
                </button>
                <span className="text-lg font-semibold">
                  {page}/{last}
                </span>
                <button onClick={nextPage} className="px-4 py-2 default-button">
                  다음
                </button>
              </div>
              <div className="mt-4 text-center flex gap-4 justify-center">
                <button
                  onClick={() => handleConfirmation(false)}
                  className="px-4 py-2 default-button"
                >
                  취소
                </button>
                <Link
                  href={'../../timer'}
                  onClick={() => handleConfirmation(true)}
                  className="px-4 py-2 bg-[#BE4f31]  text-white rounded-full"
                >
                  확인
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default BookSearch
