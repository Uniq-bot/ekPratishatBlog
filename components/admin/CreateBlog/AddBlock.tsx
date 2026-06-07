"use client";
import React from "react";

const AddBlock = ({
  setBlocks,
  blockType,
  setBlockType,
  setLevel,
  setSetLevel,
  content,
  setContent,
}: {
  setBlocks: React.Dispatch<React.SetStateAction<any[]>>;
  blockType: string;
  setBlockType: React.Dispatch<React.SetStateAction<string>>;
  setLevel: number;
  setSetLevel: React.Dispatch<React.SetStateAction<number>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const headingLevels = [1, 2, 3, 4, 5];

  const handleAddBlock = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!content.trim() && blockType !== "list") return;

    const newBlock = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      type: blockType,
      ...(blockType === "heading" && { level: setLevel }),
      content: blockType === "list"
        ? content.split("\n").map((s) => s.trim()).filter(Boolean)
        : content,
    };

    setBlocks((prev: any[]) => [...prev, newBlock]);
    setContent("");
    // Keep block type and level — user likely wants to add more of the same
  };

  return (
    <div className="w-full py-3 lg:py-5 border bg-[#EBECD8]/50">
      <h1 className="text-sm lg:text-base border-r border border-l-0 bg-[#DBDBB8] w-fit px-4 lg:px-10 py-2">
        Add Block
      </h1>
      <div className="px-3 lg:px-5 mt-2">
        {/* Block type selector */}
        <div>
          <label className="text-xs lg:text-sm font-medium">Block Type</label>
          <select
            value={blockType}
            onChange={(e) => setBlockType(e.target.value)}
            className="w-full border h-8 lg:h-10 outline-none text-xs lg:text-sm ml-0 lg:ml-2 mt-1"
          >
            <option value="paragraph">Paragraph</option>
            <option value="heading">Heading</option>
            <option value="list">List</option>
          </select>
        </div>

        {/* Heading level picker */}
        {blockType === "heading" && (
          <div className="w-full flex flex-wrap flex-col gap-2 mt-2">
            <label className="text-xs lg:text-sm font-medium">Heading Level</label>
            <div className="flex flex-wrap gap-1.5 lg:gap-2 ml-0 lg:ml-2">
              {headingLevels.map((level) => (
                <button
                  type="button"
                  onClick={() => setSetLevel(level)}
                  className={`border text-xs lg:text-sm ${setLevel === level ? "bg-[#d0d05d] border-yellow-500" : "bg-[#DBDBB8]/60 hover:bg-[#CFCFC0]"} cursor-pointer py-1 px-2 lg:px-3`}
                  key={level}
                >
                  H{level}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content input */}
        <div className="w-full flex flex-col gap-2 mt-3 lg:mt-5">
          <p className="text-xs lg:text-sm font-medium">Content</p>
          {blockType === "paragraph" ? (
            <textarea
              className="w-full focus:border-b transition-all h-16 lg:h-20 outline-none p-2 border text-xs lg:text-sm"
              placeholder="Paragraph content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : blockType === "heading" ? (
            <input
              className="w-full h-8 lg:h-10 focus:border-b transition-all outline-none p-2 border text-xs lg:text-sm"
              placeholder={`Heading ${setLevel} content...`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : blockType === "list" ? (
            <textarea
              className="w-full h-16 lg:h-20 outline-none p-2 border text-xs lg:text-sm"
              placeholder={"List item 1\nList item 2\nList item 3"}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : null}
        </div>

        <button
          type="button"
          className="px-3 lg:px-4 py-2 hover:bg-gray-200 transition-all cursor-pointer bg-white border shadow shadow-black mt-3 lg:mt-5 text-xs lg:text-sm w-full sm:w-auto"
          onClick={handleAddBlock}
        >
          Add Block
        </button>
      </div>
    </div>
  );
};

export default AddBlock;
