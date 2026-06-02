import Image from 'next/image';
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";

const RelatedBlogs = ({relatedBlogs}:{relatedBlogs:any}) => {
    const [isHovered, setIsHovered] = useState<number|null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const router=useRouter();

    // lock body scroll when mobile panel open
    useEffect(() => {
      const original = typeof document !== 'undefined' ? document.body.style.overflow : '';
      if (isOpen) {
        if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';
      } else {
        if (typeof document !== 'undefined') document.body.style.overflow = original || '';
      }
      return () => {
        if (typeof document !== 'undefined') document.body.style.overflow = original || '';
      };
    }, [isOpen]);

  return (
     <div className="w-full md:w-[35%] h-full">
             {/* Mobile toggle button */}
             <button
               aria-label={isOpen ? 'Close related' : 'Open related'}
               onClick={() => setIsOpen(s => !s)}
               className="fixed top-4 right-2 z-50 p-2  bg-white border shadow-md md:hidden"
             >
               {isOpen ? '✕' : '☰'}
             </button>

             <h1 className="text-2xl ">Related Blogs</h1>
             <div className="w-full flex flex-col gap-2 mt-5 hidden md:flex">
                     {relatedBlogs.length > 0 ? relatedBlogs.slice(0, 3).map((blog:any) => {
                       return (
                         <div
                          onClick={()=>router.push(`/blog/${blog.slug ?? blog.id}`)}
                         onMouseEnter={()=>setIsHovered(blog.id)}
                         onMouseLeave={()=>setIsHovered(null)}
                           key={blog.id}
                           className={`w-full h-30 transition-all cursor-pointer ${isHovered === blog.id ? 'bg-amber-200' : 'bg-white'}  flex items-center gap-2 p-2 justify-between`}
                         >
                           <div className="w-30 h-full">
                             <Image
                               src={blog.image}
                               alt={blog.title}
                               width={120}
                               height={120}
                               className="h-full w-full object-cover"
                               style={{ width: 'auto', height: 'auto' }}
                             />
                           </div>
                           <div className="w-[calc(100%-120px)] h-full flex flex-col justify-between">
                             <div>
                               <h1>{blog.title}</h1>
                               {Array.isArray(blog.tags) && blog.tags.map((tag: string) => (
                                 <span
                                   key={tag}
                                   className={`text-sm ${isHovered===blog.id?"bg-white":"bg-amber-200"}  px-2 py-0.5 text-gray-600 mr-2`}
                                 >
                                   {tag}
                                 </span>
                               ))}
                             </div>
                             <span className="text-sm text-gray-600">{blog.createdAt}</span>
                           </div>
                         </div>
                       );
                     }):<p>No related blogs found.</p>}
                   </div>

      {/* Mobile sliding panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden" onClick={() => setIsOpen(false)} />
      )}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white z-40 transform transition-transform duration-300 shadow-lg md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4">
          <h1 className="text-2xl mb-4">Related Blogs</h1>
          <div className="w-full flex flex-col gap-2">
            {relatedBlogs.length > 0 ? relatedBlogs.slice(0, 6).map((blog:any) => (
              <div
                key={blog.id}
                onClick={() => { router.push(`/blog/${blog.slug ?? blog.id}`); setIsOpen(false); }}
                onMouseEnter={() => setIsHovered(blog.id)}
                onMouseLeave={() => setIsHovered(null)}
                className={`w-full h-30 transition-all cursor-pointer ${isHovered === blog.id ? 'bg-amber-200' : 'bg-white'}  flex items-center gap-2 p-2 justify-between`}
              >
                <div className="w-20 h-full">
                  <Image src={blog.image} alt={blog.title} width={80} height={80} className="h-full w-full object-cover" style={{ width: 'auto', height: 'auto' }} />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h1 className="text-base font-semibold">{blog.title}</h1>
                  </div>
                  <span className="text-xs text-gray-600">{blog.createdAt}</span>
                </div>
              </div>
            )) : <p>No related blogs found.</p>}
          </div>
        </div>
      </div>
        </div>
  )
}

export default RelatedBlogs