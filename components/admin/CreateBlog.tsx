"use client";

import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";

const CreateBlog = () => {
  const { categories, tags, createBlog } = useAdmin();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !content.trim() || !categoryId) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await createBlog({ title, content, categoryId, tags: selectedTags });
      setSuccess(true);
      setTitle("");
      setContent("");
      setCategoryId("");
      setSelectedTags([]);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-10">
      {error && <p className="bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {success && <p className="bg-green-50 px-4 py-3 text-sm text-green-700">Post created!</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-neutral-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category *</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border border-neutral-300 px-3 py-2"
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Content *</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full border border-neutral-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tags</label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <label key={tag.id} className="flex items-center gap-2 border px-3 py-1 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag.id)}
                onChange={() =>
                  setSelectedTags((prev) =>
                    prev.includes(tag.id)
                      ? prev.filter((id) => id !== tag.id)
                      : [...prev, tag.id]
                  )
                }
              />
              {tag.name}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-[#F5CB3B] font-semibold disabled:opacity-70"
      >
        {loading ? "Publishing..." : "Publish Post"}
      </button>
    </form>
  );
};

export default CreateBlog;
