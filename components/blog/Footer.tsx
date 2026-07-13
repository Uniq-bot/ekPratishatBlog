import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NewsLetter from "./NewsLetter";

const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@ekpratishat" },
  {
    label: "Threads",
    href: "https://www.threads.com/@ek_pratishat?xmt=AQG0-GUE39y0Z1f5q6MluhmS6sycaBeh_Q3c79HBDYk6-0Q",
  },
  { label: "X (Twitter)", href: "https://x.com/ekpratishat" },
  { label: "Instagram", href: "https://www.instagram.com/ek_pratishat" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ek-pratishat-real-estate-pvt-ltd/?viewAsMember=true",
  },
];

const Footer = () => {
  return (
    <div className=" w-full bg-[#1D1D1D]  text-white">
      <footer className=" relative z-10 w-full bg-[#1D1D1D] mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
       <div className="max-w-7xl w-full mx-auto">
         <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Image
              src="/logo.png"
              width={100}
              height={100}
              alt="Ekpratishat Logo"
              className="w-14 h-14 object-contain"
            />
            <p className="text-sm leading-6 text-gray-400 max-w-[26ch]">
              Reach EkPratishat through the right channel.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#EBC044] mb-2">
                Call us
              </p>
              <p className="text-sm font-medium text-white">9712068341</p>
              <p className="text-sm font-medium text-white">9712068342</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#EBC044] mb-2">
                Get in touch
              </p>
              <p className="text-sm font-medium text-white break-all">
                hello@ekpratishat.com
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#EBC044] mb-2">
                Get the app
              </p>
              <div className="flex gap-2">
                <button className="border border-[#3A3226] rounded-lg overflow-hidden cursor-pointer w-24 shrink-0 hover:border-[#EBC044] transition-colors">
                  <Image
                    src="/playstore.png"
                    alt="Play Store"
                    width={130}
                    height={45}
                    className="object-contain w-full h-full"
                  />
                </button>
                <button className="border border-[#3A3226] rounded-lg overflow-hidden cursor-pointer w-24 shrink-0 hover:border-[#EBC044] transition-colors">
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

          {/* Social */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#EBC044] mb-1">
              Find us at
            </p>
            {socialLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm font-medium w-fit text-white hover:text-[#EBC044] transition-colors"
              >
                {label}
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            ))}
          </div>

          {/* Newsletter */}
          <NewsLetter />
        </div>

        {/* Privacy row */}
        <div className="mt-12 pt-4 border-t border-[#3A3226] flex justify-end">
          <Link
            href="#"
            className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gray-400 hover:text-[#EBC044] transition-colors"
          >
            Privacy
            <ArrowUpRight
              size={12}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="mt-4 pt-4 border-t border-[#3A3226] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} Ekpratishat. All rights reserved.</span>
          <div className="flex items-center gap-3 font-medium">
            <Link href="#" className="hover:text-[#EBC044] transition-colors">
              Terms
            </Link>
            <span>·</span>
            <Link href="#" className="hover:text-[#EBC044] transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
       </div>
      </footer>

      <section className="border-t sticky bottom-0 z-0 border-[#3A3226] bg-[#fffaf0] text-[#241D12]">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-10 border-b border-[#eadcb4]">
            <div className="max-w-xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9981A]">
                Real Estate Blog
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-[#241D12]">
                Stories, insights &amp; market wisdom.
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-6 text-[#6B5C3D]">
                Deep-dives, trends, and expert takes to help you understand real
                estate — before you make a move.
              </p>
            </div>

            <Link
              href="#list"
              className="group inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1D1D1D] px-6 py-3.5 text-sm font-bold text-[#EBC044] transition-colors hover:bg-[#302B24]"
            >
              Explore Our Blogs
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="pt-6 text-xs text-[#6B5C3D]">
            <p className="max-w-md leading-5">
              Ekpratishat Blog shares real estate knowledge, market trends, and
              buying tips — for informational purposes only.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;