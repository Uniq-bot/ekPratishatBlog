"use client";

import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import BlogFilters from "@/components/shared/BlogFilters";
import Pagination from "@/components/shared/Pagination";
import { useDebounce } from "@/hooks/useDebounce";
import { filterBlogs, paginate } from "@/libs/filterBlogs";
import type { Blog } from "@/types/blog";

const PER_PAGE = 8;

const ManageBlogs = () => {
  const { blogs, categories, tags, loading, updateBlog, deleteBlog } = useAdmin();

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [dateSort, setDateSort] = useState("newest");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, categoryFilter, tagFilter]);

  const filtered = filterBlogs(blogs, categoryFilter, tagFilter, debouncedSearch, dateSort);
  const { pagedItems: paged, totalPages, currentPage } = paginate(filtered, page, PER_PAGE);

  function resetFilters() {
    setCategoryFilter("all");
    setTagFilter("all");
    setDateSort("newest");
    setSearch("");
    setPage(1);
  }

  function openEdit(blog: Blog) {
    setEditingBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
    setCategoryId(blog.categoryID);
    setError(null);
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editingBlog) return;

    setSaving(true);
    setError(null);
    try {
      await updateBlog(editingBlog.id, { title, content, categoryId });
      setEditingBlog(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this post?")) return;
    setSaving(true);
    try {
      await deleteBlog(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="p-10 text-neutral-500">Loading posts...</p>;

  return (
    <div className="space-y-6 p-6">
      {error && !editingBlog && <p className="text-sm text-red-700">{error}</p>}

      {editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={handleUpdate} className="w-full max-w-xl bg-white border p-4 space-y-3">
            <h2 className="font-semibold">Edit Post</h2>
            {error && <p className="text-sm text-red-700">{error}</p>}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 text-sm"
              placeholder="Title"
            />
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border px-3 py-2 text-sm"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full border px-3 py-2 text-sm"
            />
            <div className="flex gap-2">
              <button type="submit" disabled={saving} className="px-4 py-2 bg-[#F5CB3B] text-sm font-semibold">
                {saving ? "Saving..." : "Update"}
              </button>
              <button type="button" onClick={() => setEditingBlog(null)} className="px-4 py-2 border text-sm">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <BlogFilters
        categories={categories}
        tags={tags}
        categoryFilter={categoryFilter}
        tagFilter={tagFilter}
        dateSort={dateSort}
        search={search}
        resultCount={filtered.length}
        onCategoryChange={setCategoryFilter}
        onTagChange={setTagFilter}
        onDateSortChange={setDateSort}
        onSearchChange={setSearch}
        onReset={resetFilters}
      />

      {paged.length === 0 ? (
        <p className="text-center text-neutral-500 py-8">No posts found.</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-[#FFFDF8]">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {paged.map((blog) => (
              <tr key={blog.id}>
                <td className="px-4 py-3 font-medium">{blog.title}</td>
                <td className="px-4 py-3">{blog.category?.name || "Uncategorized"}</td>
                <td className="px-4 py-3">{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <button onClick={() => openEdit(blog)} className="text-xs mr-3">Edit</button>
                  <button onClick={() => handleDelete(blog.id)} className="text-xs text-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ManageBlogs;
