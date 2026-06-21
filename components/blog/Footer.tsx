import { Mail, PhoneCall } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className=" w-full flex flex-col h-100 bg-[#252119] text-[#CBBFA9] px-50 ">
      <div className="w-full h-full  flex justify-between border-b p-5 border-white/20">
        <div className="flex flex-col gap-5 w-1/2 h-full items-center justify-center border-r border-white/20  px-20 ">
          <h1 className="text-4xl leading-none font-black">
           
            Real Estate! <span className="text-[#EFC75A]">Ekpratishat</span> भए पुग्छ।
          </h1>
          <div className="flex  items-center gap-2 ">
            <div className="border-2 flex bg-[#2E2A22] border-[#5E4F29]  items-center px-3 py-2 rounded-2xl gap-2">
              <span
                className="p-2 text-[#EFC75A] border-[#5E4F29]
               border rounded-full"
              >
                <PhoneCall size={19} />
              </span>
              <div className="flex flex-col">
                <p className="text-sm">Call us</p>
                <p className="text-sm font-black">97120 68341 / 97120 68342</p>
              </div>
            </div>
            <div className="border-2 flex bg-[#2E2A22] border-[#5E4F29]  items-center px-3 py-2 rounded-2xl gap-2">
              <span className="p-2 border text-[#EFC75A] border-[#5E4F29] rounded-full">
                <Mail size={19} />
              </span>
              <div className="flex flex-col">
                <p className="text-sm">Email us</p>
                <p className="text-sm font-black">hello@ekpratishat.com</p>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-4 [&_svg]:h-6 [&_svg]:w-6">
            <span className="p-2 border border-[#5E4F29]  rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                <path d="m10 15 5-3-5-3z"></path>
              </svg>
            </span>
            <span className="p-2 border border-[#5E4F29] rounded-full">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Z"></path>
              </svg>
            </span>
            <span className="p-2 border border-[#5E4F29] rounded-full">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </span>
            <span className="p-2 border border-[#5E4F29] rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </span>
            <span className="p-2 border border-[#5E4F29] rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </span>
          </div>
        </div>
        <div className="flex flex-col w-1/2 items-center pt-10  p-3">
          <div className="border w-2/3   p-5 bg-[#302B24] border-[#493F27] rounded-xl flex flex-col gap-1">
            <h1 className="uppercase text-2xl font-black">Get the app</h1>
            <p className="text-sm">
              Browse the lists of properties, get the insights and make the best
              decision for your next property investment. Download our app now!
            </p>
            <div className="flex gap-3 mt-2">
              <p>Play store</p>
              <p>App store</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
