"use client";
import { useCreateTag, useGetTags } from "@/hooks/useAdminBlogs";
import { Tag as TagP } from "@/types/blog";
import { Trash } from "lucide-react";
import React from "react";


interface TagProp {
  initialTags?: TagP[]
}

const Tag = ({ tags, isLoading }: { tags?: TagP[]; isLoading: boolean }) => {
  const [tagValue, setTagValue] = React.useState("");
  const { mutateAsync: createTag, isPending: isCreating } = useCreateTag();
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

  return (
    <div className="w-full h-auto transition-all bg-[#EBECD8] p-4 relative z-20">
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

      {
        isLoading ? (
          <p className="text-sm text-gray-500 mt-3">Loading tags...</p>
        ) : (<div className="mt-4 space-y-2">
        {tags?.map((tag : TagP) => (
          <div
            key={tag.id}
            className="flex justify-between items-center border-b border-gray-400 py-2 px-1"
          >
            <span className="font-medium">{tag.name}</span>
          
          </div>
        ))}
      </div>)
      }
    </div>
  );
};

export default Tag;
