import Image from 'next/image';
import React, { useState } from 'react'
import { useRouter } from "next/navigation";

const RelatedBlogs = ({relatedBlogs}:{relatedBlogs:any}) => {
    const [isHovered, setIsHovered] = useState<number|null>(null)
      const router=useRouter();

  return (
     <div className="w-[35%] h-full ">
             <h1 className="text-2xl ">Related Blogs</h1>
             <div className="w-full flex flex-col gap-2 mt-5">
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
                               className="h-full w-full"
                             />
                           </div>
                           <div className="w-[calc(100%-120px)] h-full flex flex-col justify-between">
                             <div>
                               <h1>{blog.title}</h1>
                               {blog.tags.map((tag: string) => (
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
        </div>
  )
}

export default RelatedBlogs