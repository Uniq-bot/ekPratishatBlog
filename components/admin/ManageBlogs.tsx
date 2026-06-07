"use client";
import { useDeleteBlog, useGetAdminBlogs } from "@/hooks/useAdminBlogs";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { TableSkeleton } from "./skeleton/TableSkeleton";
import { useState } from "react";

const ManageBlogs = () => {
  const { data: blogs, isLoading } = useGetAdminBlogs();
  const { mutate: deleteBlog, isPending: isDeleting } = useDeleteBlog();
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    setDeletingId(id);
    deleteBlog(id, { onSettled: () => setDeletingId(null) });
  };

  return (
    <div className="bg-white relative z-20 shadow border overflow-hidden">
      {isLoading ? (
        <TableSkeleton />
      ) : (
        // Horizontal scroll wrapper for mobile
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[640px]">
            <thead className="bg-[#DBDBB8]">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Tags</th>
                <th className="px-4 py-3 text-center">Views</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs?.posts?.map((blog: any, index: number) => (
                <tr key={blog.id} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4">
                    <div className="font-medium">{blog.title}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 whitespace-nowrap">
                      {blog.category?.name ?? "—"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {blog.tags?.map((tag: any) => (
                        <span key={tag.id} className="px-2 py-1 rounded-full text-sm bg-green-100 whitespace-nowrap">
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">{blog.viewCount ?? 0}</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => router.push(`/admin/edit/${blog.id}`)}
                        className="p-2 bg-white border cursor-pointer hover:bg-gray-100 transition-all"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        disabled={deletingId === blog.id}
                        className="p-2 border bg-white cursor-pointer hover:bg-red-500 hover:text-white disabled:opacity-50 transition-all"
                        title="Delete"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
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