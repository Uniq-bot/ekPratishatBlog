import { useGetAdminBlogs } from "@/hooks/useAdminBlogs";
import { Edit, Trash } from "lucide-react";
import { redirect } from "next/navigation";

const ManageBlogs = () => {
  const { data:blogs, isLoading } = useGetAdminBlogs();
  return (
    <div className="bg-white relative z-20  shadow overflow-hidden border">
      <table className="w-full">
        <thead className="bg-[#DBDBB8]">
          <tr>
            <th className="px-4 py-3 text-left">Id</th>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Tags</th>
            <th className="px-4 py-3 text-center">Views</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {blogs?.posts?.map((blog, index) => (
            <tr
              key={index}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-4">{index + 1}</td>

              <td className="px-4 py-4">
                <div className="font-medium">{blog.title}</div>
              </td>

              <td className="px-4 py-4">
                <span className="px-3 py-1 rounded-full text-sm bg-blue-100">
                  {blog.category.name}
                </span>
              </td>

              <td className="px-4 py-4">
                <div className="flex flex-wrap gap-2">
                  {blog.tags?.map((tag: string, index: number) => (
                    <span key={index} className="px-3 py-1 rounded-full text-sm bg-green-100">
                      {tag.name}
                    </span>
                  ))}
                </div>
              </td>

              <td className="px-4 py-4 text-center">{blog.views ?? 0}</td>

              <td className="px-4 py-4">
                <div className="flex justify-center gap-2">
                  <button onClick={()=>redirect(`/admin/edit/${blog.id}`)} className="p-2  bg-white transition-all cursor-pointer  border hover:bg-gray-100">
                    <Edit size={18} />
                  </button>
                  <button className="p-2  border bg-white transition-all cursor-pointer hover:bg-red-500">
                    <Trash size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBlogs;
