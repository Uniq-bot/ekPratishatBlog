import { Mail, PhoneCall, Verified } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import NewsLetter from "./NewsLetter";

const Footer = () => {
  return (
    <div className="bg-[#1F1B16] w-full  text-white">
      <NewsLetter />
      <div className="max-w-[80%] mx-auto px-4 sm:px-6 py-8 lg:py-12 border-t border-dashed border-[#5E4F29] border-b flex flex-col lg:flex-row gap-8 lg:gap-10">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-start gap-6 lg:pl-10 xl:pl-20 lg:border-r lg:border-[#5E4F29] lg:pr-6 xl:pr-10">
          <div className="flex items-center gap-3 sm:gap-8">
            <Image
              src="/logo.png"
              width={100}
              height={100}
              alt="Ekpratishat Logo"
              className="w-20 h-20 sm:w-25 sm:h-25 lg:w-30 lg:h-30 object-contain"
            />
            <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-3xl font-black leading-tight">
              <span className="text-[#EFC75A]">
                Reach EkPratishat through the right channel.
              </span>
            </h1>
          </div>

          {/* Contact Cards */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="border-2 bg-[#2E2A22] border-[#5E4F29] flex items-center px-3 py-2 rounded-2xl gap-2 flex-1">
              <span className="p-2 text-[#EFC75A] border border-[#5E4F29] rounded-full shrink-0">
                <PhoneCall size={18} />
              </span>
              <div>
                <p className="text-sm text-gray-300">Call us</p>
                <span>
                  <p className="font-bold text-sm">- 97120 68341 </p>
                  <p className="font-bold text-sm">- 97120 68342</p>
                </span>
              </div>
            </div>

            <div className="border-2 bg-[#2E2A22] border-[#5E4F29] flex items-center px-2 py-2 rounded-2xl gap-2 flex-1 min-w-0">
              <span className="p-2 text-[#EFC75A] border border-[#5E4F29] rounded-full shrink-0">
                <Mail size={18} />
              </span>

              <div className="min-w-0">
                <p className="text-sm text-gray-300">Get in touch</p>
                <p className="font-bold text-sm break-all">
                  hello@ekpratishat.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-full lg:max-w-125 flex flex-col items-center justify-center border border-[#493F27] bg-[#302B24] rounded-xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
              <h2 className="text-lg sm:text-xl font-bold">Find us at:</h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 [&_svg]:w-5 [&_svg]:h-5">
                <Link
                  href="https://www.youtube.com/@ekpratishat"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="p-2.5 sm:p-3 border border-[#5E4F29] rounded-full inline-flex transition-transform duration-200 hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="text-[#FF0000]"
                  >
                    {" "}
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>{" "}
                    <path d="m10 15 5-3-5-3z"></path>{" "}
                  </svg>
                </Link>

                <Link
                  href="https://www.threads.com/@ek_pratishat?xmt=AQG0-GUE39y0Z1f5q6MluhmS6sycaBeh_Q3c79HBDYk6-0Q"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Threads"
                  className="p-2.5 sm:p-3 border border-[#5E4F29] rounded-full inline-flex transition-transform duration-200 hover:scale-110"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="text-white w-6 h-6"
                  >
                    {" "}
                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Z"></path>{" "}
                  </svg>
                </Link>

                <Link
                  href="https://x.com/ekpratishat"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="p-2.5 sm:p-3 border border-[#5E4F29] rounded-full inline-flex transition-transform duration-200 hover:scale-110"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="text-white w-6 h-6"
                  >
                    {" "}
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>{" "}
                  </svg>
                </Link>

                <Link
                  href="https://www.instagram.com/ek_pratishat"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2.5 sm:p-3 border border-[#5E4F29] rounded-full inline-flex transition-transform duration-200 hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="url(#instagram-gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="instagram-gradient"
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#FFDC80" />
                        <stop offset="25%" stopColor="#FCAF45" />
                        <stop offset="50%" stopColor="#E1306C" />
                        <stop offset="75%" stopColor="#C13584" />
                        <stop offset="100%" stopColor="#833AB4" />
                      </linearGradient>
                    </defs>{" "}
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>{" "}
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>{" "}
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>{" "}
                  </svg>
                </Link>

                <Link
                  href="https://www.linkedin.com/company/ek-pratishat-real-estate-pvt-ltd/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2.5 sm:p-3 border border-[#5E4F29] rounded-full inline-flex transition-transform duration-200 hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="text-[#0A66C2]"
                  >
                    {" "}
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>{" "}
                    <rect width="4" height="12" x="2" y="9"></rect>{" "}
                    <circle cx="4" cy="4" r="2"></circle>{" "}
                  </svg>
                </Link>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-5">
              <p className="text-lg sm:text-xl font-bold">Get the app:</p>
              <div className="flex gap-3">
                <button className="border border-[#5E4F29] rounded-lg overflow-hidden cursor-pointer w-27.5 sm:w-32.5 shrink-0">
                  <Image
                    src="/playstore.png"
                    alt="Play Store"
                    width={130}
                    height={45}
                    className="object-contain w-full h-full"
                  />
                </button>

                <button className="border border-[#5E4F29] rounded-lg overflow-hidden cursor-pointer w-27.5 sm:w-32.5 shrink-0">
                  <Image
                    src="/appstore.png"
                    alt="App Store"
                    width={130}
                    height={45}
                    className="object-contain w-full h-full"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
     {/* <div className="w-full text-center mb-10 px-4 overflow-hidden">
  <h1 className="text-[clamp(2.5rem,14vw,10rem)] font-black font-[Girls] leading-none pt-5 bg-[linear-gradient(135deg,#EBC044,#F4CA3B_28%,#FFD33A_55%,#F4DC91_78%,#F4CA3B)] bg-clip-text text-transparent">
    Ek-pratishat
  </h1>
  
</div> */}
      <div className="py-4  w-[90%] mx-auto  flex justify-around  ">
        <p className="text-center text-[10px] sm:text-base text-gray-400">
         All right reserved
        </p>
        <p className="text-center text-[10px] sm:text-base  bg-[linear-gradient(135deg,#EBC044,#F4CA3B_28%,#FFD33A_55%,#F4DC91_78%,#F4CA3B)] bg-clip-text text-transparent">
  Ekpratishat Real-Estate Pvt. Ltd.
</p>
        <p className="text-center text-[10px] sm:text-base text-gray-400">
           <Suspense>
             &copy; {new Date().getFullYear()} 
           </Suspense>
        </p>
      </div>
    </div>
  );
};

export default Footer;
