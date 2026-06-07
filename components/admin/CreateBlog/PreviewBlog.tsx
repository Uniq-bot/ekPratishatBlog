import { Dot } from 'lucide-react'
import React from 'react'

const PreviewBlog = ({blocks}:{blocks: any[]}) => {
  return (
    <div className="w-full border min-h-1/2 bg-[#EBECD8]/50 py-5">
        <p className="text-md border-r border border-l-0 bg-[#DBDBB8] w-fit  px-10 py-2">
            Preview of Blog Post
        </p>
      {blocks?.map((block) => (
        <div key={block.id} className="w-full p-2 flex">
          {block.type === "paragraph" && <p>{block.content}</p>}
          {block.type === "heading" && <h1 className={`font-bold text-${block.level===1 ? 'xl' : block.level===2 ? 'lg' : 'md'}`}>{block.content}</h1>}
          {block.type === "image" && <img src={block.content} alt="Blog post" />}
          {block.type === "list" && (
            <ul>
              {block.content.map((item: string, index: number) => (
               <div key={index} className="flex items-start gap-2">
               <Dot /> <li>{item}</li>
               </div>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

export default PreviewBlog