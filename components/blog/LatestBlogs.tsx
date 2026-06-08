
import Image from "next/image";
import Link from "next/link";

type BlogItem = {
  id: string;
  title: string;
  slug?: string;
  coverImage?: string;
  image?: string;
  createdAt?: string;
};

const normalizeBlog = (blog: BlogItem) => ({
  id: blog.id,
  title: blog.title ?? "",
  slug: blog.slug ?? blog.id,
  coverImage: blog.coverImage ?? blog.image ?? "/logo.png",
  createdAt: blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString()
    : "",
});

const LatestBlogs = ({ latestBlogs = [] }: { latestBlogs?: BlogItem[] }) => {



  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Latest Blogs</h1>

      {latestBlogs.length === 0 ? (
        <p className="text-sm text-gray-500">No latest blogs found.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {latestBlogs.slice(0, 3).map((blog) => {
            const b = normalizeBlog(blog);

            return (
              <Link 
              href={`/blog/${b.slug}`}
                key={b.id}
                
                className="flex gap-3 items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                <Image
                  src={b.coverImage}
                  alt={b.title}
                  width={60}
                  height={60}
                  className="w-14 h-14 object-cover rounded"
                />

                <div className="flex flex-col">
                  <h2 className="text-sm font-medium line-clamp-2">
                    {b.title}
                  </h2>
                  <span className="text-xs text-gray-500">
                    {b.createdAt}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LatestBlogs;