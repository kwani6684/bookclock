import CustomModal from '../modal'
import LoginBtn from './loginButton'

const LoginModal = () => {
  return (
    <div className="flex justify-center">
      <CustomModal isOpen={true} size={'350px'}>
        <div className="p-[2rem]">
          <div className="font-bold text-2xl">로그인</div>
          <div className="text-xs text-[#E57C65] py-2">
            <h1>로그인을 하고 모든 기능을 이용해 보세요</h1>
            <h1>필요한 시간은 단 3초!</h1>
          </div>
          <LoginBtn />
        </div>
      </CustomModal>
    </div>
  )
}
export default LoginModal
