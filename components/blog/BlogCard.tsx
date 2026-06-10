import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
const BlogCard = ({ blog }: { blog: any }) => {
  return (
    <div
      key={blog?.id}
      className="w-full border-b-2 pb-5  text-white cursor-pointer group   flex flex-col p-5 md:flex-row border-[#C9981A] gap-5 overflow-hidden"
    >
      <div className="w-full md:w-60 relative h-48 md:h-full overflow-hidden shrink-0">
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
        <span className="text-[12px] font-semibold mb-1 bg-[rgba(154,106,0,0.07)] p-1 px-3 rounded-2xl text-[#d69406]">
          {new Date(blog?.createdAt).toLocaleDateString()} |{" "}
          {new Date(blog?.updatedAt).toLocaleDateString()}
        </span>
        <div className="w-full h-full flex flex-col gap-2">
          <h1 className="text-2xl group-hover:text-[#d69406] transition-all leading-none">{blog?.title}</h1>
        </div>
        <Link
          href={`/blog/${blog?.slug ?? blog?.id}`}
          className="underline hover:text-[#d69406] mt-2 cursor-pointer transition-all text-[#d69406]"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
