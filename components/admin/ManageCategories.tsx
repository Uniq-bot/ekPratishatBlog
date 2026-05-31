"use client";

import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";

const ManageCategories = () => {
  const { categories, loading, addCategory } = useAdmin();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await addCategory(name, description);
      setName("");
      setDescription("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <section className="bg-white border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Create Category</h2>
        {error && <p className="mb-4 text-sm text-red-700">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            className="w-full border border-neutral-300 px-3 py-2"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            rows={3}
            className="w-full border border-neutral-300 px-3 py-2"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 bg-[#F5CB3B] font-semibold disabled:opacity-70"
          >
            {submitting ? "Creating..." : "Create Category"}
          </button>
        </form>
      </section>

      <section className="lg:col-span-2 bg-white border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold mb-4">All Categories</h2>
        {loading ? (
          <p className="text-neutral-500">Loading...</p>
        ) : categories.length === 0 ? (
          <p className="text-neutral-500">No categories yet.</p>
        ) : (
          <div className="space-y-2">
            {categories.map((cat) => (
              <div key={cat.id} className="border border-neutral-200 p-4">
                <h3 className="font-medium">{cat.name}</h3>
                {cat.description && <p className="text-sm text-neutral-600 mt-1">{cat.description}</p>}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ManageCategories;
