"use client";
import { Trash } from "lucide-react";
import React from "react";

const Tag = ({ setTags, tags }: { setTags: React.Dispatch<React.SetStateAction<string[]>>; tags: string[] }) => {
  const [tagValue, setTagValue] = React.useState("");
  const [error, setError] = React.useState("");
  const handleAddTags = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tagValue.trim()) {
      setError("Tag name cannot be empty");
      return;
    }
    setError("");

    setTags((prev) => [...prev, tagValue.trim()]);
    localStorage.setItem("tags", JSON.stringify([...tags, tagValue.trim()]));
    setTagValue("");
  };
  setTimeout(() => {
    setError("");
  }, 2000);

  const handleDelete = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
    localStorage.setItem("tags", JSON.stringify(tags.filter((_, i) => i !== index)));
  };

  return (
    <div className="w-full h-auto bg-[#EBECD8] p-4 relative z-20">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Tags</h1>
        <span className="text-xs bg-black/10 px-2 py-1 rounded">
          total {tags.length}
        </span>
      </div>

      {/* Add Tag Box */}
      <form
        onSubmit={handleAddTags}
        className="border border-dashed border-gray-500 p-3 flex items-center gap-3 bg-transparent"
      >
       <div>
        
       </div>
         {error && <span className="text-red-500 text-sm">{error}</span>}
      </form>
       


      {/* Tags List */}
      <div className="mt-4 space-y-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-400 py-2 px-1"
          >
            <span className="font-medium">{tag}</span>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span>Total posts</span>

              <button
                onClick={() => handleDelete(index)}
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