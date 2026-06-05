"use client";
import { useCreateTag } from "@/hooks/useAdminBlogs";
import { Trash } from "lucide-react";
import React from "react";

const Tag = ({ tags }: { tags: { name: string }[] }) => {
  const [tagValue, setTagValue] = React.useState("");
  const { mutateAsync } = useCreateTag();
 const handleAddTags = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!tagValue.trim()) return;

  await mutateAsync({ name: tagValue }); // ✅ FIXED

  setTagValue("");
};

  const handleDelete = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
  };

  return (
    <div className="w-full h-auto bg-[#EBECD8] p-4 relative z-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Tags</h1>
        <span className="text-xs bg-black/10 px-2 py-1 rounded">
          total {tags?.length}
        </span>
      </div>

      {/* Add Tag Box */}
    <form
        onSubmit={handleAddTags}
        className="border border-dashed border-gray-500 p-3 flex items-center gap-3 bg-transparent"
      >
        <input
          type="text"
          placeholder="tag name"
          value={tagValue}
          onChange={(e) => setTagValue(e.target.value)}
          className="flex-1 bg-transparent outline-none border border-gray-400 px-2 py-1"
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-1 text-sm"
        >
          Add +
        </button>
      </form>

      {/* Tags List */}
      <div className="mt-4 space-y-2">
        {tags?.map((tag, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-400 py-2 px-1"
          >
            <span className="font-medium">{tag?.name}</span>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span>Total posts</span>

              <button
                onClick={(e) => handleDelete(index, e)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tag;
