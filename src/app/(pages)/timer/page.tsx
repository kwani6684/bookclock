import TimerCircle from '@/app/components/timer/timerCircle'
import TimerSelect from '@/app/components/timer/timerSelect'

const Timer = () => {
  return (
    <div className="grid px-4 gap-x-2 py-10 h-[400px] grid-cols-4">
      <TimerSelect />
      <TimerCircle />
    </div>
  )
}
export default Timer
