"use client"

import { useAdminUI } from "@/context/AdminContext";
import BlogEditor from "../BlogEditor"
import { useEditableBlog, useGetCategory, useGetTags } from "@/hooks/useAdminBlogs";

const Editor = ({id}:{id:string}) => {
      const {activeTab, setActiveTab, blocks, setBlocks, user}=useAdminUI();
        const {tags}=useGetTags();
        const {categories}=useGetCategory();
        const {blog}=useEditableBlog(id);
        console.log("editable blog", blog)
    
    
  return (
    <div>
       <BlogEditor mode="edit" initialBlog={blog} blocks={blocks} setBlocks={setBlocks} user={user} tags={tags} categories={categories} />
    </div>
  )
}

export default Editor