"use client"
import AsideBar from '@/components/admin/AsideBar'
import CreateBlog from '@/components/admin/CreateBlog';
import ManageBlogs from '@/components/admin/ManageBlogs';
import TagNCategory from '@/components/admin/TagNCategory';
import { useAdmin } from '@/context/AdminContext';
import Image from 'next/image';
import { useState } from 'react';




const AdminPanel  = () => {
  const {activeTab, setActiveTab, blocks, setBlocks, blogsData, setBlogsData}=useAdmin();
  const [isMount, setIsMount]=useState(false);

  useState(()=>{
    setIsMount(true);
  },[])

  if(!isMount) return null;
  console.log(activeTab)
  const tabComponents:any={
    "tag&category":<TagNCategory />,
    "create-blog":<CreateBlog blocks={blocks} setBlocks={setBlocks} blogsData={blogsData} setBlogsData={setBlogsData} />,
    "manage-blogs":<ManageBlogs blogsData={blogsData} />,
  }
  return (
    <div className="w-full relative bg-[#F7F3EA] min-h-screen flex">
      <AsideBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="w-[80%]  p-5 h-screen absolute right-0 bg-[#F7F3EA]">
        <div className="w-full h-full absolute top-0 right-0 left-0 bottom-0  flex items-center justify-center opacity-10">
          <Image src="/logo.png" alt="logo" width={500} height={400} className='object-contain' />
        </div>
        {
          tabComponents[activeTab]
          }
        
      </div>
    </div>
  )
}

export default AdminPanel