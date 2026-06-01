import BlogHeroPng from '@/public/BlogHero.png'
import Image from 'next/image'
const BlogHero = () => {
  return (
    <div className="w-full h-100 shadow-md shadow-black relative">
            <div className="w-full h-full absolute bg-black/60 z-6" />
            <div className="w-full h-full absolute z-5 ">
                <Image src={BlogHeroPng} alt="Blog Hero" className="w-full h-full" />
            </div>
            <div className="absolute  z-10 bottom-5 text-white p-5 ">
                <h1 className="text-5xl  pr-50 leading-15">
                    Insights, Guides,<br /> and Trends in Real Estate
                </h1>
                <p className="text-lg italic pr-50 leading-none">
                    Stay informed with practical insights that help you make smarter property decisions.
                </p>
            </div>
    </div>
  )
}

export default BlogHero