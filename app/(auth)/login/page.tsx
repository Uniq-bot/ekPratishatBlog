import React from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import LoginComp from "@/components/auth/Login";
const Login = () => {
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 bg-black h-full flex flex-col">
        <div className="w-full h-20 p-4">
          <Image src={logo} alt="logo" className="h-full w-20" />
        </div>
        <div className="w-full flex flex-col px-20 justify-center
         h-full ">
            <div className="relative flex flex-col mb-20 text-white ">
              <header className="flex items-start gap-4 p-8">
               
                <div className="mt-1">
                  <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
                  <p className="text-sm text-amber-100/80 max-w-xs">Manage properties, blog content, users, and website settings from one place.</p>
                </div>
              </header>

              <main className="flex-1 flex items-center">
                <div className="max-w-md mx-10 p-6 bg-white/5">
                  <ul className="space-y-6">
                    <li className="flex gap-4 items-start">
                      <span className="flex items-center justify-center h-12 w-12 bg-white/5 ring-1 ring-white/10">
                        <div className="h-8 w-8 bg-amber-400/40 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/90" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M3 13h2v-2H3v2zM3 9h2V7H3v2zM7 13h2v-2H7v2zM7 9h2V7H7v2zM11 13h2v-2h-2v2zM11 9h2V7h-2v2zM15 13h2v-2h-2v2zM15 9h2V7h-2v2z" />
                          </svg>
                        </div>
                      </span>
                      <div>
                        <p className="font-semibold text-lg">Overview</p>
                        <p className="text-sm text-amber-100/80">Monitor your website performance and activity.</p>
                      </div>
                    </li>

                    <li className="flex gap-4 items-start">
                      <span className="flex items-center justify-center h-12 w-12 bg-white/5 ring-1 ring-white/10">
                        <div className="h-8 w-8 bg-amber-400/40 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/90" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 2a2 2 0 00-2 2v1H6a2 2 0 00-2 2v3h12V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2zM6 12v4a2 2 0 002 2h4a2 2 0 002-2v-4H6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </span>
                      <div>
                        <p className="font-semibold text-lg">Secure Access</p>
                        <p className="text-sm text-amber-100/80">Only authorized administrators can access this area.</p>
                      </div>
                    </li>

                    <li className="flex gap-4 items-start">
                      <span className="flex items-center justify-center h-12 w-12 bg-white/5 ring-1 ring-white/10">
                        <div className="h-8 w-8 bg-amber-400/40 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/90" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 17a1 1 0 01-1 1H6a1 1 0 01-1-1v-4h6v4zM17 3H7a1 1 0 00-1 1v8h12V4a1 1 0 00-1-1z" />
                          </svg>
                        </div>
                      </span>
                      <div>
                        <p className="font-semibold text-lg">Full Control</p>
                        <p className="text-sm text-amber-100/80">Manage content, users, and system settings.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </main>
            </div>
        </div>
      </div>
      <div className="w-1/2 h-full flex items-center justify-center">
      <LoginComp />
      </div>
    </div>
  );
};

export default Login;
