import React, { useState } from "react";
import AddBlock from "./CreateBlog/AddBlock";
import BlogForm from "./CreateBlog/BlogForm";
import PreviewBlog from "./CreateBlog/PreviewBlog";

const CreateBlog = ({
  blocks,
  setBlocks,
  blogsData,
  setBlogsData
}: {
  blocks: {
    id: number;
    type: "paragraph" | "heading" | "image";
    content: string;
  }[];
 
  blogsData: any[];
  setBlogsData: React.Dispatch<React.SetStateAction<any[]>>;
  setBlocks: React.Dispatch<
    React.SetStateAction<
      { id: number; type: "paragraph" | "heading" | "image"; content: string }[]
    >
  >;
}) => {
  const [title, setTitle] =useState("");
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<any[]>([]);

  // blockss
  const [blockType, setBlockType] = React.useState("heading");
const [setLevel, setSetLevel] = React.useState(1);
  const [content, setContent] = React.useState("");
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const newBlog = {
    title,
    slug: slug,
    category,
    tags,
    content: blocks,
  };

  console.log("newBlog", newBlog);
  console.log("blogsData before", blogsData)
  setBlogsData((prev) => [...prev, newBlog]);
  localStorage.setItem("blogs", JSON.stringify(blogsData));
  setTitle("")
  setCategory("")
  setTags([])
  setBlocks([])
  setBlockType("heading")
  setSetLevel(1)
  setContent("")
  console.log("blogDataas", blogsData)
};
  return (
   <div className="w-full min-h-full relative flex  gap-5" >
    <div className="w-full transition-all min-h-[calc(100%-5px)] border shadow shadow-black py-5 bg-[#EBECD8]/50 relative z-20 ">
      <h1 className="text-xl border-r border border-l-0 bg-[#DBDBB8] w-fit  px-10 py-2">
        Create Blog
      </h1>
      <form className="w-[90%] m-auto px-20 " onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-2 my-5">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-full pl-2 border h-10 outline-none text-lg"
          />
        </div>
        <div className="w-full flex flex-col gap-2 my-5">
          <label>Slug</label>
          <input
            value={slug}
            disabled
            type="text"
            className="w-full border pl-2 text-gray-500 h-10 outline-none text-lg"
          />
        </div>{" "}
        <div className="w-full flex flex-col  gap-2 my-5">
          <label>Tags</label>
         <div className="w-full flex flex-wrap gap-2">
           {
            ["React","JavaScript","Web Development"].map((level) => (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (tags.includes(level)) {
                      setTags(tags.filter((tag) => tag !== level));
                    } else {    
                        setTags([...tags, level]);
                    }
                  }}
                  className={`bg-[#DBDBB8]/60 border ${tags.includes(level) ? "bg-[#e3e37b]" : ""} hover:bg-[#CFCFC0] hover:cursor-pointer py-1 px-3`}
                  key={level}
                >
                  {level}
                </button>
              ))
          }
         </div>
        </div>{" "}
        <div className="w-full flex flex-col gap-2 my-5">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border pl-2 text-gray-500 h-10 outline-none text-lg"
          >
            <option value="">Select Category</option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="travel">Travel</option>
            <option value="food">Food</option>
          </select>
        </div>{" "}
      <BlogForm blocks={blocks} setBlocks={setBlocks} />
        <button className="px-4 py-2 bg-white border shadow shadow-black">
          Post Blog
        </button>
      </form>
    </div>
    <div className="w-[40%] flex flex-col gap-5 ">
      <AddBlock setBlocks={setBlocks} setBlockType={setBlockType} blockType={blockType} setLevel={setLevel} setSetLevel={setSetLevel} content={content} setContent={setContent} />
      <PreviewBlog blocks={blocks} />
    </div>
    </div>
  );
};

export default CreateBlog;
