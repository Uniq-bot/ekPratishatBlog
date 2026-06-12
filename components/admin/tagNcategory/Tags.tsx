"use client";
import { useCreateTag, useDeleteTag } from "@/hooks/useAdminBlogs";
import { Trash } from "lucide-react";
import React from "react";

const Tag = ({ tags }: { tags: any[] }) => {
  const [tagValue, setTagValue] = React.useState("");
  const { mutateAsync: createTag, isPending: isCreating } = useCreateTag();
  const { mutate: deleteTag, isPending: isDeleting } = useDeleteTag();

  const handleAddTags = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagValue.trim()) return;
    try {
      await createTag({ name: tagValue.trim() });
      setTagValue("");
    } catch (err: any) {
      alert(err.message || "Failed to create tag");
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this tag?")) return;
    deleteTag(id);
  };

  return (
    <div className="w-full h-auto bg-[#EBECD8] p-4 relative z-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Tags</h1>
        <span className="text-xs bg-black/10 px-2 py-1 rounded">
          total {tags?.length ?? 0}
        </span>
      </div>

      <form
        onSubmit={handleAddTags}
        className="border border-dashed flex flex-col lg:flex-row p-2 items-center gap-3 bg-transparent"
      >
        <input
          type="text"
          placeholder="Tag name"
          value={tagValue}
          onChange={(e) => setTagValue(e.target.value)}
          className="flex-1  bg-transparent outline-none border border-gray-400 px-2 py-1"
          required
        />
        <button
          type="submit"
          disabled={isCreating}
          className="bg-black w-full lg:w-auto text-white px-4 py-1 text-sm disabled:opacity-50"
        >
          {isCreating ? "Adding..." : "Add +"}
        </button>
      </form>

      <div className="mt-4 space-y-2">
        {tags?.map((tag) => (
          <div
            key={tag.id}
            className="flex justify-between items-center border-b border-gray-400 py-2 px-1"
          >
            <span className="font-medium">{tag.name}</span>
            <button
              onClick={() => handleDelete(tag.id)}
              disabled={isDeleting}
              className="text-red-500 hover:text-red-700 disabled:opacity-50"
              title="Delete tag"
            >
              <Trash size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tag;
