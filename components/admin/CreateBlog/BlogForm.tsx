"use client";
import React, { useRef } from "react";
import {
  List,
  Pilcrow,
  Trash,
  Type,
  GripVertical,
  Image as ImageIcon,
  Quote,
  Minus,
  Info,
} from "lucide-react";
import { useDeleteImage } from "@/hooks/useAdminBlogs";
interface Block {
  id: string | number;
  type:
    | "paragraph"
    | "heading"
    | "list"
    | "image"
    | "quote"
    | "callout"
    | "separator";

  content: any;
  level?: number;
}

const BlockIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "paragraph":
      return <Pilcrow size={14} />;
    case "heading":
      return <Type size={14} />;
    case "list":
      return <List size={14} />;
    case "image":
      return <ImageIcon size={14} />;
    case "quote":
      return <Quote size={14} />;
    case "callout":
      return <Info size={14} />;
    case "separator":
      return <Minus size={14} />;
    default:
      return null;
  }
};

const BlogForm = ({
  blocks,
  setBlocks,
}: {
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}) => {
  const dragIndex = useRef<number | null>(null);
  const dragOverIndex = useRef<number | null>(null);

  // ── Drag handlers ────────────────────────────────────────────────
  const handleDragStart = (e: React.DragEvent, index: number) => {
    dragIndex.current = index;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    dragOverIndex.current = index;
  };

  const handleDrop = () => {
    const from = dragIndex.current;
    const to = dragOverIndex.current;
    if (from === null || to === null || from === to) return;

    setBlocks((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
    dragIndex.current = null;
    dragOverIndex.current = null;
  };

  const updateBlock = (id: string | number, patch: Partial<Block>) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    );
  };
  const deleteImage = useDeleteImage();

  const removeBlock = async (block: Block) => {
    if (
      block.type === "image" &&
      typeof block.content === "string" &&
      block.content.startsWith("/uploads/")
    ) {
      await deleteImage.mutateAsync(block.content);
    }

    setBlocks((prev) => prev.filter((b) => b.id !== block.id));
  };

  const updateListItem = (
    blockId: string | number,
    itemIndex: number,
    value: string,
  ) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id !== blockId) return b;
        const items = [...(Array.isArray(b.content) ? b.content : [])];
        items[itemIndex] = value;
        return { ...b, content: items };
      }),
    );
  };

  const addListItem = (blockId: string | number) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id !== blockId) return b;
        return { ...b, content: [...(b.content ?? []), ""] };
      }),
    );
  };

  const removeListItem = (blockId: string | number, itemIndex: number) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id !== blockId) return b;
        const items = (b.content ?? []).filter(
          (_: any, i: number) => i !== itemIndex,
        );
        return { ...b, content: items };
      }),
    );
  };

  return (
    <div className="w-full p-2 lg:p-3 flex border border-dashed flex-col gap-2 my-3 lg:my-5">
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0">
        <label className="text-xs lg:text-sm font-medium text-gray-700">
          Content Blocks
        </label>
        <span className="text-xs text-gray-400">
          {blocks.length} block{blocks.length !== 1 ? "s" : ""} -- drag to
          reorder
        </span>
      </div>

      <div className="w-full flex flex-col gap-2 lg:gap-3">
        {blocks?.map((block, index) => (
          <div
            key={block.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={handleDrop}
            className="flex border justify-between p-2 gap-2 lg:gap-3 items-start bg-white hover:border-gray-400 transition-colors flex-col sm:flex-row"
          >
            <div
              className="shrink-0 cursor-grab active:cursor-grabbing mt-1 text-gray-300 hover:text-gray-500 hidden sm:block"
              title="Drag to reorder"
            >
              <GripVertical size={16} />
            </div>

            {/* Block icon + label */}
            <span className="flex items-center gap-1 mt-1 w-auto sm:w-24 shrink-0 text-xs lg:text-sm">
              <BlockIcon type={block.type} />
              <p className="text-xs capitalize text-gray-600">
                {block.type === "heading" ? `H${block.level ?? 1}` : block.type}
              </p>
            </span>

            <div className="flex-1 w-full">
              {block.type === "paragraph" && (
                <textarea
                  className="w-full min-h-16 lg:min-h-20 outline-none p-2 border text-xs lg:text-sm resize-y"
                  placeholder="Paragraph content..."
                  value={block.content ?? ""}
                  onChange={(e) =>
                    updateBlock(block.id, { content: e.target.value })
                  }
                />
              )}

              {block.type === "heading" && (
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1 flex-wrap mb-1">
                    {[1, 2, 3, 4, 5].map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => updateBlock(block.id, { level: l })}
                        className={`text-xs px-2 py-0.5 border ${block.level === l ? "bg-[#d0d05d] border-yellow-500" : "bg-gray-100"}`}
                      >
                        H{l}
                      </button>
                    ))}
                  </div>
                  <input
                    className="w-full outline-none p-2 border text-xs lg:text-sm"
                    placeholder={`Heading ${block.level ?? 1} content...`}
                    value={block.content ?? ""}
                    onChange={(e) =>
                      updateBlock(block.id, { content: e.target.value })
                    }
                  />
                </div>
              )}
              {block.type === "quote" && (
                <textarea
                  className="w-full min-h-[80px] outline-none p-2 border text-xs lg:text-sm italic"
                  placeholder="Quote..."
                  value={block.content ?? ""}
                  onChange={(e) =>
                    updateBlock(block.id, {
                      content: e.target.value,
                    })
                  }
                />
              )}
              {block.type === "callout" && (
                <textarea
                  className="w-full min-h-[80px] outline-none p-2 border bg-yellow-50 text-xs lg:text-sm"
                  placeholder="Important tip..."
                  value={block.content ?? ""}
                  onChange={(e) =>
                    updateBlock(block.id, {
                      content: e.target.value,
                    })
                  }
                />
              )}
              {block.type === "separator" && (
                <div className="py-3">
                  <hr />
                </div>
              )}

              {block.type === "list" && (
                <div className="flex flex-col gap-1">
                  {(Array.isArray(block.content) ? block.content : []).map(
                    (item: string, i: number) => (
                      <div key={i} className="flex gap-1 items-center">
                        <span className="text-gray-400 text-xs shrink-0">
                          {i + 1}.
                        </span>
                        <input
                          className="flex-1 outline-none p-1 border text-xs lg:text-sm"
                          value={item}
                          placeholder={`List item ${i + 1}`}
                          onChange={(e) =>
                            updateListItem(block.id, i, e.target.value)
                          }
                        />
                        <button
                          type="button"
                          onClick={() => removeListItem(block.id, i)}
                          className="text-gray-400 hover:text-red-500 px-1 shrink-0"
                        >
                          ×
                        </button>
                      </div>
                    ),
                  )}
                  <button
                    type="button"
                    onClick={() => addListItem(block.id)}
                    className="text-xs text-gray-500 hover:text-black self-start mt-1 underline"
                  >
                    + Add item
                  </button>
                </div>
              )}
            </div>

            {/* Delete block */}
            <button
              type="button"
              onClick={() => removeBlock(block)}
              className="shrink-0 p-1 hover:text-red-500 transition-colors"
              title="Remove block"
            >
              <Trash size={16} />
            </button>
          </div>
        ))}

        {blocks.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-6">
            No blocks yet. Use the &ldquo;Add Block&rdquo; panel to add content.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogForm;
