import { Dot } from 'lucide-react'
import React from 'react'

const PreviewBlog = ({blocks}:{blocks: any[]}) => {
  return (
    <div className="w-full border min-h-1/2 bg-[#EBECD8]/50 py-3 lg:py-5">
        <p className="text-sm lg:text-base border-r border border-l-0 bg-[#DBDBB8] w-fit px-4 lg:px-10 py-2">
            Preview of Blog Post
        </p>
      {blocks?.map((block) => (
        <div key={block.id} className="w-full p-2 lg:p-3 flex flex-col">
          {block.type === "paragraph" && <p className="text-xs lg:text-sm leading-relaxed">{block.content}</p>}
          {block.type === "heading" && (
            <h1 className={`font-bold ${
              block.level === 1 ? 'text-xl lg:text-2xl' :
              block.level === 2 ? 'text-lg lg:text-xl' :
              'text-base lg:text-lg'
            }`}>{block.content}</h1>
          )}
        
          {block.type === "list" && (
            <ul className="flex flex-col gap-1">
              {block.content.map((item: string, index: number) => (
               <div key={index} className="flex items-start gap-2 text-xs lg:text-sm">
               <Dot size={16} className="shrink-0 mt-0.5" /> <li>{item}</li>
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