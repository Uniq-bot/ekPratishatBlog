import logo from "@/public/logo.png"
import Image from "next/image"
const LoginComp = () => {
  return (
    <div className="w-1/2 h-[70%] mt-10  flex flex-col items-center">
          <div className="w-30 h-30 flex items-center justify-center">
            <Image src={logo} alt="Logo" className="w-full h-full" />
          </div>
          <form className="w-full mt-8">
            <div>
              <label className="mb-2 block">
              Email:
            </label>
            <input type="email" name="email" className="border border-gray-300 bg-[#D6CD7A]/50 outline-none focus:shadow-amber-200 focus:ring-1 ring-amber-500 rounded-md p-2 w-full mb-4" />
            </div>
            <div>
              <label className="mb-2 block">
              Password:
            </label>
            <input type="password" name="password" className="border border-gray-300 bg-[#D6CD7A]/50 outline-none focus:shadow-amber-200 focus:ring-1 ring-amber-500 rounded-md p-2 w-full mb-4" />
            </div>
            <button type="submit" className="bg-[#918D92] hover:bg-[#7a767b] cursor-pointer transition-all text-white px-4 py-2 rounded-md w-full">Login</button>
          </form>
    </div>
  )
}

export default LoginComp