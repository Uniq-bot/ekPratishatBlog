"use client"
import AsideBar from '@/components/admin/AsideBar'
import BlogEditor from '@/components/admin/BlogEditor';
import CreateBlog from '@/components/admin/BlogEditor';
import ManageBlogs from '@/components/admin/ManageBlogs';
import TagNCategory from '@/components/admin/TagNCategory';
import { useAdminUI } from '@/context/AdminContext';
import { useGetCategory, useGetTags } from '@/hooks/useAdminBlogs';
import Image from 'next/image';
import { SetStateAction, useEffect, useState } from 'react';




const AdminPanel  = () => {
  const {activeTab, setActiveTab, blocks, setBlocks, user}=useAdminUI();
  const [isMount, setIsMount]=useState(false);
  const {categories}=useGetCategory();
  useEffect(()=>{
    setIsMount(true);
  },[])

  const {tags}=useGetTags();

  if(!isMount) return null;
  console.log(activeTab)
  const tabComponents:any={
    "tag&category":<TagNCategory tags={tags} categories={categories} />,
    "create-blog":<BlogEditor mode="create" tags={tags} user={user} categories={categories} setBlocks={setBlocks} blocks={blocks} setBlogsData={function (value: SetStateAction<any[]>): void {
      throw new Error('Function not implemented.');
    } } />,
    "manage-blogs":<ManageBlogs />,
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