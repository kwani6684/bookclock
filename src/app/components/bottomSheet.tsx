// components/BottomSheet.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BottomSheet = ({ onClose, children }: any) => {
  return (
    <div
      className={`fixed min-w-[350px] sm:w-full bottom-0 bg-white max-h-1/2 overflow-y-auto`}
    >
      <button className="absolute top-0 right-0 p-4" onClick={onClose}>
        닫기
      </button>
      {children}
    </div>
  )
}

export default BottomSheet
