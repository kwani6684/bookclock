'use client'

interface BentoType {
  color: string
  height?: number
  size?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any
}

// 벤또 컴포넌트
const Bento = ({ color, height, size, children }: BentoType) => {
  return (
    <div
      className={`flex flex-col p-5 ${color} h-[${height}px] rounded-[30px] col-span-${size}`}
    >
      {children}
    </div>
  )
}
export default Bento
