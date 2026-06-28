"use client";

import {
  useCurateBlog,
  useDeleteBlog,
  useGetAdminBlogs,
  useToggleArchiveBlog,
} from "@/hooks/useAdminBlogs";
import { Archive, ArchiveRestore, Edit } from "lucide-react";
import Link from "next/link";
import { TableSkeleton } from "@/components/admin/skeleton/TableSkeleton";
import { useState } from "react";

const ManageBlogs = () => {
  const { data: blogs, isLoading } = useGetAdminBlogs();
  const { mutate: ToggleArchiveBlog, isPending: isArchiving } =
    useToggleArchiveBlog();
  const [actionId, setActionId] = useState<string | null>(null);
  const { mutateAsync: curateBlog } = useCurateBlog();
  const handleArchive = (id: string) => {
    if (
      !confirm(
        `Are you sure you want to ${
          blogs?.posts.find((b: any) => b.id === id)?.status === "ARCHIVED"
            ? "restore"
            : "archive"
        } this blog?`,
      )
    )
      return;

    setActionId(id);

    ToggleArchiveBlog(id, {
      onSettled: () => setActionId(null),
    });
  };

  const handleCurate = async (id: string) => {
    if (!confirm("Are you sure you want to toggle the curated status of this blog?")) {
      return;
    }
    try {
      setActionId(id);
      await curateBlog(id);
    } finally {
      setActionId(null);
    }
  };


  return (
    <div className="bg-white relative z-20 shadow border overflow-hidden">
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-160">
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
              {blogs?.posts?.map((blog: any, index: number) => {
  const isRowDisabled = actionId === blog.id;

  return(
                
                <tr
                  key={blog.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium text-sm">{blog.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5 truncate max-w-55">
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
                        href={isRowDisabled ? "#" : `/admin/edit/${blog.id}`}
                        onClick={(e) => {
                          if (isRowDisabled) e.preventDefault();
                        }}
                        className={`p-2 border transition-all ${
                          isRowDisabled
                            ? "pointer-events-none opacity-50"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <Edit />
                      </Link>
                      {blog.status !== "ARCHIVED" ? (
                        <button
                          disabled={isArchiving && isRowDisabled}
                          onClick={() => handleArchive(blog.id)}
                          title="Archive"
                        >
                          <Archive size={18} />
                        </button>
                      ) : (
                        <button
                          title="Restore"
                          disabled={isArchiving && isRowDisabled}
                          onClick={() => handleArchive(blog.id)}
                        >
                          <ArchiveRestore size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={blog.isToggled}
                      disabled={isRowDisabled}
                      onChange={() => handleCurate(blog.id)}
                    />
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;
