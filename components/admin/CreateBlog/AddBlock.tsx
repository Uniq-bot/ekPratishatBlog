"use client";

import { useImageUpload } from "@/hooks/useAdminBlogs";
import React from "react";

const AddBlock = ({
  setBlocks,
  blockType,
  setBlockType,
  setLevel,
  setSetLevel,
  content,
  setContent,
  image,
  setImage,
  calloutTitle,
  setCalloutTitle,
  calloutDescription,
  setCalloutDescription,
}: {
  setBlocks: React.Dispatch<React.SetStateAction<any[]>>;
  blockType: string;
  setBlockType: React.Dispatch<React.SetStateAction<string>>;
  setLevel: number;
  setSetLevel: React.Dispatch<React.SetStateAction<number>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  calloutTitle: string;
setCalloutTitle: React.Dispatch<React.SetStateAction<string>>;
calloutDescription: string;
setCalloutDescription: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const headingLevels = [ 2, 3, 4, 5];

  const imageUpload = useImageUpload();
 const handleAddBlock = async (e: React.MouseEvent) => {
  e.preventDefault();

 if (blockType === "callout") {
  if (!calloutTitle.trim() && !calloutDescription.trim()) {
    return;
  }
} else if (
  blockType !== "separator" &&
  blockType !== "image" &&
  !content.trim()
) {
  return;
} else if (blockType === "image" && !image) {
  return;
}

  let imagePath = null;

  if (blockType === "image" && image) {
    const res = await imageUpload.mutateAsync(image);
    imagePath = res.imagePath;
  }

  const newBlock = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    type: blockType,

    ...(blockType === "heading" && {
      level: setLevel,
    }),

   content:
  blockType === "list"
    ? content
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
    : blockType === "image"
    ? imagePath
    : blockType === "separator"
    ? null
    : blockType === "callout"
    ? {
        title: calloutTitle,
        description: calloutDescription,
      }
    : content,
  };

  setBlocks((prev) => [...prev, newBlock]);
  setContent("");
  setImage(null);
  setCalloutTitle("");
setCalloutDescription("");
};

  return (
    <div className="w-full border p-3 lg:p-5 bg-[#F0EFE1]">
      <h2 className="text-sm lg:text-base font-semibold mb-3">
        Add Block
      </h2>

      {/* Block Type */}
      <div className="flex flex-col gap-1">
        <label className="text-xs lg:text-sm font-medium">
          Block Type
        </label>

        <select
          value={blockType}
          onChange={(e) => {
            setBlockType(e.target.value);
            setContent("");
          }}
          className="w-full border h-9 lg:h-10 outline-none px-2 text-xs lg:text-sm"
        >
          <option value="paragraph">Paragraph</option>
          <option value="heading">Heading</option>
          <option value="list">List</option>
          <option value="image">Image</option>
          <option value="quote">Quote</option>
          <option value="callout">Callout</option>
          <option value="separator">Divider</option>
        </select>
      </div>

      {/* Heading Level */}
      {blockType === "heading" && (
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-xs lg:text-sm font-medium">
            Heading Level
          </label>

          <div className="flex flex-wrap gap-2">
            {headingLevels.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSetLevel(level)}
                className={`border px-3 py-1 text-xs lg:text-sm transition ${
                  setLevel === level
                    ? "bg-[#d0d05d] border-yellow-500"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                H{level}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="w-full flex flex-col gap-2 mt-4">
        <label className="text-xs lg:text-sm font-medium">
          Content
        </label>

        {blockType === "paragraph" && (
          <textarea
            className="w-full h-24 outline-none p-2 border text-xs lg:text-sm resize-y"
            placeholder="Write paragraph..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}

        {blockType === "heading" && (
          <input
            className="w-full h-10 outline-none p-2 border text-xs lg:text-sm"
            placeholder={`Heading ${setLevel} content...`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}

        {blockType === "list" && (
          <textarea
            className="w-full h-24 outline-none p-2 border text-xs lg:text-sm resize-y"
            placeholder={`List item 1
List item 2
List item 3`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}

    {blockType === "image" && (
  <input
    type="file"
    accept="image/*"
    className="w-full h-10 outline-none p-2 border text-xs lg:text-sm"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setImage(file); 
    }}
  />
)}

        {blockType === "quote" && (
          <textarea
            className="w-full h-24 outline-none p-2 border italic text-xs lg:text-sm resize-y"
            placeholder="Enter quote..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}

       {blockType === "callout" && (
  <div className="flex flex-col gap-3">
    <input
      className="w-full h-10 outline-none p-2 border font-semibold text-xs lg:text-sm"
      placeholder="Bold title..."
      value={calloutTitle}
      onChange={(e) => setCalloutTitle(e.target.value)}
    />

    <textarea
      className="w-full h-24 outline-none p-2 border bg-yellow-50 text-xs lg:text-sm resize-y"
      placeholder="Description..."
      value={calloutDescription}
      onChange={(e) => setCalloutDescription(e.target.value)}
    />
  </div>
)}

        {blockType === "separator" && (
          <div className="border rounded p-4 text-center text-gray-400 text-sm">
            Divider will be inserted
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleAddBlock}
        className="mt-5 w-full sm:w-auto px-4 py-2 border bg-white hover:bg-gray-100 transition shadow text-xs lg:text-sm cursor-pointer"
      >
        Add Block
      </button>
    </div>
  );
};

export default AddBlock;