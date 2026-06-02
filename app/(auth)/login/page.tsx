import Image from 'next/image'
import loginBg from "@/public/login.png"
import LoginComp from '@/components/auth/Login'
const Login = () => {
  return (
    <div className="flex w-full h-screen bg-[#F7F3EA]">
      <div className="w-[55%] h-screen flex items-center justify-center">
          <LoginComp />
      </div>
      <div className="w-[45%] h-screen">
        <Image src={loginBg} alt="Login Background" className="w-full h-full " />
      </div>
    </div>
  )
}

export default Login