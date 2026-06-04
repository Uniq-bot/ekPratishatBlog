import React from 'react'
import { List, Pilcrow, Trash, Type } from "lucide-react";

const BlogForm = ({blocks,setBlocks}:{blocks: any, setBlocks: React.Dispatch<React.SetStateAction<any[]>>}) => {
  return (
      <div className="w-full p-2 flex border border-dashed flex-col gap-2 my-5">
          <div className="w-full flex items-center justify-between">
            <label>Content</label>
           
          </div>
          <div className="w-full  p-2  flex flex-col gap-2">
            {blocks.map((block: any, index:number) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <div key={index} className="flex border justify-between p-2 gap-2 items-center">
                      <span className="flex items-center  gap-1 ">
                        <Pilcrow size={20} /> <p>Paragraph</p>
                      </span>
                      <textarea
                        key={block.id}
                        className=" h-20 w-1/2  outline-none p-2"
                        placeholder="Paragraph content..."
                        value={block.content}
                        onChange={(e) => {
                          const newBlocks = [...blocks];
                          const index = newBlocks.findIndex(
                            (b) => b.id === block.id,
                          );
                          if (index !== -1) {
                            newBlocks[index] = {
                              ...newBlocks[index],
                              content: e.target.value,
                            };
                            setBlocks(newBlocks);
                          }
                        }}
                      ></textarea>
                     <div>
                        <button onClick={(e)=>e.preventDefault()} className="px-2 py-1">
                          <Trash size={20} />
                        </button>
                      </div>
                    </div>
                  );
                case "heading":
                  return (
                    <div className="flex w-full border justify-between p-2 gap-2 items-center">
                      <span className="flex items-center gap-1 ">
                        <Type size={20} /> <p>Heading</p>
                      </span>
                      <input
                        key={block.id}
                        value={block.content}
                        onChange={(e) => {
                          const newBlocks = [...blocks];
                          const index = newBlocks.findIndex(
                            (b) => b.id === block.id,
                          );
                          if (index !== -1) {
                            newBlocks[index] = {
                              ...newBlocks[index],
                              content: e.target.value,
                            };
                            setBlocks(newBlocks);
                          }
                        }}
                        className=" h-20 w-1/2  outline-none p-2"
                        placeholder="Heading content..."
                      ></input>
                      <div>
                        <button onClick={(e)=>e.preventDefault()} className="px-2 py-1">
                          <Trash size={20} />
                        </button>
                      </div>
                    </div>
                  );
                case "list":
                  return (
                    <div className="flex border justify-between items-center p-2 gap-2 items-start">
                      <span className="flex items-center gap-1">
                        <List size={20} /> <p>List</p>
                      </span>

                  <div className=" flex w-1/2  flex-col gap-2">
                      {
                      block?.content?.map((item:string,index:number) => (
                        <input
                        key={index}
                        value={"*" + item} />
                      ))
                    }
                    </div>

                      <div>
                        <button onClick={(e)=>e.preventDefault()} className="px-2 py-1">
                          <Trash size={20} />
                        </button>
                      </div>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
  )
}

export default BlogForm