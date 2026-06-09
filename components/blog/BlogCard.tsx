import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
const BlogCard = ({ blog }: { blog: any }) => {
  const router = useRouter();
  return (
    <div
      key={blog?.id}
      className="w-full border pb-5  flex flex-col p-5 md:flex-row border-[#D2C5AB] bg-white/30  gap-5 overflow-hidden"
    >
      <div className="w-full md:w-60 relative h-48 md:h-full shrink-0">
        <Image
          src={blog?.coverImage ?? "/logo.png"}
          alt={blog?.title}
          width={320}
          height={320}
          className="w-full h-full object-cover"
          style={{ width: "auto", height: "auto" }}
        />
        <span className="absolute top-4 left-0 bg-black text-white px-2 py-1">
          {blog?.category?.name}
        </span>
      </div>
      <div className="py-1 flex flex-col items-start flex-1">
        <span className="text-sm mb-1 text-gray-600">
          {new Date(blog?.createdAt).toLocaleDateString()} |{" "}
          {new Date(blog?.updatedAt).toLocaleDateString()}
        </span>
        <div className="w-full h-full flex flex-col gap-2">
          <h1 className="text-2xl font-bold leading-none">{blog?.title}</h1>
          
        </div>
        <Link
          href={`/blog/${blog?.slug ?? blog?.id}`}
          className="underline hover:text-purple-900 mt-2 cursor-pointer transition-all text-purple-600"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
