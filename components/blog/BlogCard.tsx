
import Link from "next/link";

interface BlogCardProps {
  id: string;
  title: string;
  content: string;
  createdAt: string | Date;
  category?: { name: string } | null;
  tags?: { id: string; name: string }[];
}

const BlogCard = ({ id, title, content, createdAt, category, tags = [] }: BlogCardProps) => {
  const plain = content.replace(/<[^>]*>/g, "").trim();
  const excerpt = plain.length > 160 ? `${plain.slice(0, 160)}...` : plain;
  const dateLabel = new Date(createdAt).toLocaleDateString();

  return (
    <Link href={`/blog/${id}`} className="group block h-full">
      <div className="h-full border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-400">
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span className="uppercase tracking-wide">{category?.name || "Uncategorized"}</span>
          <span>{dateLabel}</span>
        </div>

        <h3 className="mt-3 text-xl font-semibold text-neutral-900 group-hover:text-black">
          {title}
        </h3>

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-[#FFF3C4] px-2 py-1 text-xs font-medium text-neutral-800"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <p className="mt-3 text-sm text-neutral-600 leading-6">
          {excerpt || "No preview available."}
        </p>

        <div className="mt-4 text-xs font-semibold text-neutral-900">
          Read article →
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
