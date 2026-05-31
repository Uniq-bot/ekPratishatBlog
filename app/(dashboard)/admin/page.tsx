"use client";

import AsideBar from "@/components/admin/AsideBar";
import CreateBlog from "@/components/admin/CreateBlog";
import ManageBlogs from "@/components/admin/ManageBlogs";
import ManageCategories from "@/components/admin/ManageCategories";
import ManageTags from "@/components/admin/ManageTags";
import { AdminProvider, useAdmin } from "@/context/AdminContext";

function AdminDashboard() {
  const { activeTab } = useAdmin();

  if (activeTab === "create-post") return <CreateBlog />;
  if (activeTab === "manage-posts") return <ManageBlogs />;
  if (activeTab === "categories") return <ManageCategories />;
  if (activeTab === "tags") return <ManageTags />;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-neutral-600 mt-2">Use the sidebar to manage your blog.</p>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminProvider>
      <div className="flex h-screen bg-[#FFFDF8]">
        <AsideBar />
        <main className="flex-1 overflow-auto">
          <AdminDashboard />
        </main>
      </div>
    </AdminProvider>
  );
}
