"use client";

import { motion } from "framer-motion";

interface BlogTag {
  id: string;
  name: string;
}

interface BlogCategory {
  name: string;
}

interface BlogDetailClientProps {
  title: string;
  content: string;
  createdAt: string;
  category?: BlogCategory | null;
  tags: BlogTag[];
}

const BlogDetailClient = ({ title, content, createdAt, category, tags }: BlogDetailClientProps) => {
  return (
    <motion.article
      className="mt-8 border border-neutral-200 bg-white p-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <span className="uppercase tracking-wide">
          {category?.name || "Uncategorized"}
        </span>
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>

      <h1 className="mt-4 text-3xl font-semibold text-neutral-900">{title}</h1>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="border border-neutral-200 bg-[#FFF3C4] px-2 py-1 text-xs font-semibold text-neutral-800"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      <div className="mt-8 space-y-5 text-sm leading-7 text-neutral-700 whitespace-pre-line">
        {content}
      </div>
    </motion.article>
  );
};

export default BlogDetailClient;
