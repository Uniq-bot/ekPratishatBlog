import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
const BlogCard = ({ blog }: { blog: any }) => {
  const router=useRouter()
  return (
    <div
      key={blog.id}
      className="w-full h-60 border-b pb-5  border-gray-400  flex gap-5 overflow-hidden  "
    >
      <div className="w-60 relative h-full shrink-0">
        <Image
          src={blog.image}
          alt={blog.title}
          width={160}
          height={160}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-4 left-0 bg-black text-white px-2 py-1">
          {blog.category}
        </span>
      </div>
      <div className="py-1 flex flex-col items-baseline">
        <span className="text-sm text-gray-600">
          {blog.createdAt} | {blog.updatedAt}
        </span>
        <div className="w-full h-full flex flex-col gap-2">
          <h1 className="text-2xl font-bold leading-none">{blog.title}</h1>
          <p>{blog.description}</p>
        </div>
        <Link
          href={`/blog/${blog.slug ?? blog.id}`}
          className="underline hover:text-purple-900 cursor-pointer transition-all text-purple-600"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
