"use client";

import {  useCurateBlog, useDeleteBlog, useGetAdminBlogs, useToggleArchiveBlog } from "@/hooks/useAdminBlogs";
import { Archive, ArchiveRestore, Edit } from "lucide-react";
import Link from "next/link";
import { TableSkeleton } from "@/components/admin/skeleton/TableSkeleton";
import { useState } from "react";

const ManageBlogs = () => {
  const { data: blogs, isLoading } = useGetAdminBlogs();
  const { mutate: ToggleArchiveBlog, isPending: isArchiving } = useToggleArchiveBlog();
  const [archivingId, setArchivingid] = useState<string | null>(null);
  const {mutateAsync:curateBlog}=useCurateBlog();
  const handleArchive = (id: string) => {
    if (!confirm(`Are you sure you want to ${blogs?.posts.find((b: any) => b.id === id)?.status === "ARCHIVED" ? "restore" : "archive"} this blog?`)) return;
    setArchivingid(id);
    ToggleArchiveBlog(id, { onSettled: () => setArchivingid(null) });
  };
  
  const handleCurate = (id: string) => {
    curateBlog(id);
  }
      
  return (
    <div className="bg-white relative z-20 shadow border overflow-hidden">
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[640px]">
            <thead className="bg-[#DBDBB8]">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Tags</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Views</th>
                <th className="px-4 py-3 text-center">Actions</th>
                <th className="px-4 py-3 text-center">Curate</th>
              </tr>
            </thead>
            <tbody>
              {blogs?.posts?.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-gray-400"
                  >
                    No blogs yet.
                  </td>
                </tr>
              )}
              {blogs?.posts?.map((blog: any, index: number) => (
                <tr
                  key={blog.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium text-sm">{blog.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5 truncate max-w-[220px]">
                      {blog.slug}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-blue-100 whitespace-nowrap">
                      {blog.category?.name ?? "—"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {blog.tags?.map((tag: any) => (
                        <span
                          key={tag.id}
                          className="px-2 py-0.5 rounded-full text-xs bg-green-100 whitespace-nowrap"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        blog.status === "PUBLISHED"
                          ? "bg-green-100"
                          : "bg-gray-100"
                      } whitespace-nowrap`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center text-sm">
                    {blog.viewCount ?? 0}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-2">
                      {/* Link instead of router.push */}
                      <Link
                        href={`/admin/edit/${blog.id}`}
                        className="p-2 bg-white border hover:bg-gray-100 transition-all"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </Link>
                     {
                      blog.status !== "ARCHIVED" ? (
                        <button
                          onClick={() => handleArchive(blog.id)}
                          className="p-2 bg-white cursor-pointer border hover:bg-gray-100 transition-all"
                          title="Archive"
                          disabled={isArchiving && archivingId === blog.id}
                        >
                          <Archive size={18} />
                        </button>
                      ):(
                         <button
                        onClick={() => handleArchive(blog.id)}
                        disabled={archivingId === blog.id || isArchiving  }
                        className="p-2 border bg-white cursor-pointer hover:bg-green-500 hover:text-white disabled:opacity-50 transition-all"
                        title="Restore"
                      >
                        <ArchiveRestore size={18} />
                      </button>
                      )
                     }
                    </div>
                  </td>
                  <td className="px-4 py-4">
                   <input checked={blog.isToggled} onChange={()=>handleCurate(blog.id)} type="checkbox" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;
