"use client";

import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";

const ManageTags = () => {
  const { tags, loading, addTag } = useAdmin();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Tag name is required");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await addTag(name);
      setName("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <section className="bg-white border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Create Tag</h2>
        {error && <p className="mb-4 text-sm text-red-700">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tag name"
            className="w-full border border-neutral-300 px-3 py-2"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 bg-[#F5CB3B] font-semibold disabled:opacity-70"
          >
            {submitting ? "Creating..." : "Create Tag"}
          </button>
        </form>
      </section>

      <section className="lg:col-span-2 bg-white border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold mb-4">All Tags</h2>
        {loading ? (
          <p className="text-neutral-500">Loading...</p>
        ) : tags.length === 0 ? (
          <p className="text-neutral-500">No tags yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag.id} className="px-3 py-1 bg-[#FFF3C4] text-sm">
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ManageTags;
