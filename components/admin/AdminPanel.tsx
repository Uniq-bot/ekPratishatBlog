"use client";
import AsideBar from "@/components/admin/AsideBar";
import BlogEditor from "@/components/admin/BlogEditor";
import ManageBlogs from "@/components/admin/ManageBlogs";
import TagNCategory from "@/components/admin/TagNCategory";
import { useAdminUI } from "@/context/AdminContext";
import { useGetCategory, useGetTags } from "@/hooks/useAdminBlogs";
import Image from "next/image";

const AdminPanel = () => {
  const { activeTab, setActiveTab, blocks, setBlocks, user } = useAdminUI();

  const { data: categories } = useGetCategory();
  const { data: tags } = useGetTags();

  const tabComponents = {
    "tag&category": <TagNCategory tags={tags ?? []} categories={categories ?? []} />,
    "create-blog": (
      <BlogEditor
        mode="create"
        tags={tags ?? []}
        user={user}
        categories={categories ?? []}
        setBlocks={setBlocks}
        blocks={blocks}
      />
    ),
    "manage-blogs": <ManageBlogs />,
  };

  return (
    <div className="w-full relative bg-[#F7F3EA] min-h-screen flex">
      <AsideBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="w-full lg:ml-2 p-4 lg:p-5 min-h-screen overflow-y-auto">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <Image src="/logo.png" alt="logo" width={500} height={400} />
        </div>

        <div className="relative z-10 pt-14 lg:pt-0">
          {tabComponents[activeTab] ?? null}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;