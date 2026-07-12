import React from 'react'

const TranslationComponent = ({
    setEnglishTitle,
    setNepaliTitle,
    englishTitle,
    nepaliTitle,
    setEnglishDescription,
    setNepaliDescription,
    englishDescription,
    nepaliDescription,
    englishBlocks,
    nepaliValues,
    updateEnglishBlock,
    updateNepaliValue,
    updateNepaliCallout,
    addEnglishListItem,
    removeEnglishListItem,
    updateEnglishListItem,
    handleNepaliListTextChange,
    getNepaliListText,
    handleImageReplace,
    fileInputRefs,
    handleTranslationSave,
    BlockIcon,
    ImageIcon
}: {
    setEnglishTitle: (title: string) => void;
    setNepaliTitle: (title: string) => void;
    englishTitle: string;
    nepaliTitle: string;
    setEnglishDescription: (description: string) => void;
    setNepaliDescription: (description: string) => void;
    englishDescription: string;
    nepaliDescription: string;
    englishBlocks: any[];
    nepaliValues: any[];
    updateEnglishBlock: (index: number, updatedBlock: any) => void;
    updateNepaliValue: (index: number, value: any) => void;
    updateNepaliCallout: (index: number, updatedCallout: any) => void;
    addEnglishListItem: (blockIndex: number) => void;
    removeEnglishListItem: (blockIndex: number, itemIndex: number) => void;
    updateEnglishListItem: (blockIndex: number, itemIndex: number, value: string) => void;
    handleNepaliListTextChange: (blockIndex: number, textValue: string) => void;
    getNepaliListText: (nepaliValue: any) => string;
    handleImageReplace: (blockIndex: number, file: File) => void;
    fileInputRefs: React.MutableRefObject<{ [key: string]: HTMLInputElement | null }>;
    handleTranslationSave: () => void;
    BlockIcon: React.ComponentType<{ type: string }>;
    ImageIcon: React.ComponentType<{ size: number }>;
}) => {
  return (
      <div className="w-full px-3 lg:px-6 py-4 lg:py-6 space-y-4 lg:space-y-6">
            {/* Title row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
              <div className="flex flex-col gap-2 border shadow shadow-black bg-white p-3 lg:p-4">
                <label className="text-xs lg:text-sm font-medium">Title</label>
                <input
                  value={englishTitle}
                  onChange={(e) => setEnglishTitle(e.target.value)}
                  placeholder="English title"
                  className="h-9 lg:h-10 w-full border pl-2 outline-none text-xs lg:text-sm"
                />
              </div>
              <div className="flex flex-col gap-2 border shadow shadow-black bg-white p-3 lg:p-4">
                <label className="text-xs lg:text-sm font-medium">Title (Nepali)</label>
                <input
                  value={nepaliTitle}
                  onChange={(e) => setNepaliTitle(e.target.value)}
                  placeholder="Write Nepali title here"
                  className="h-9 lg:h-10 w-full border pl-2 outline-none text-xs lg:text-sm"
                />
              </div>
            </div>

            {/* Description row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
              <div className="flex flex-col gap-2 border shadow shadow-black bg-white p-3 lg:p-4">
                <label className="text-xs lg:text-sm font-medium">Description</label>
                <textarea
                  value={englishDescription}
                  onChange={(e) => setEnglishDescription(e.target.value)}
                  rows={4}
                  className="min-h-15 lg:min-h-20 w-full resize-y border p-2 outline-none text-xs lg:text-sm"
                />
              </div>
              <div className="flex flex-col gap-2 border shadow shadow-black bg-white p-3 lg:p-4">
                <label className="text-xs lg:text-sm font-medium">Description (Nepali)</label>
                <textarea
                  value={nepaliDescription}
                  onChange={(e) => setNepaliDescription(e.target.value)}
                  placeholder="Write Nepali description here"
                  rows={4}
                  className="min-h-15 lg:min-h-20 w-full resize-y border p-2 outline-none text-xs lg:text-sm"
                />
              </div>
            </div>

            {/* Content blocks */}
            <div className="flex flex-col gap-2">
              <div className="w-full flex items-center justify-between border shadow shadow-black bg-[#DBDBB8]/60 px-3 py-2">
                <label className="text-xs lg:text-sm font-medium">Content Blocks</label>
                <span className="text-xs text-gray-500">
                  {englishBlocks.length} block{englishBlocks.length !== 1 ? "s" : ""}
                </span>
              </div>

              {englishBlocks.length === 0 ? (
                <p className="text-xs lg:text-sm text-gray-400 text-center py-6">
                  No content blocks available.
                </p>
              ) : (
                <div className="flex flex-col gap-2 lg:gap-3">
                  {englishBlocks.map((block, index) => {
                    const nepaliValue = nepaliValues[index];

                    return (
                      <div key={block.id} className="border shadow shadow-black bg-white p-3 lg:p-4">
                        <div className="mb-3 flex items-center gap-1 text-xs lg:text-sm text-gray-600">
                          <BlockIcon type={block.type} />
                          <span className="capitalize">
                            {block.type === "heading" ? `H${block.level ?? 1}` : block.type}
                          </span>
                        </div>

                        {/* HEADING */}
                        {block.type === "heading" && (
                          <>
                            <div className="flex gap-1 flex-wrap mb-2">
                              {[1, 2, 3, 4, 5].map((l) => (
                                <button
                                  key={l}
                                  type="button"
                                  onClick={() => updateEnglishBlock(index, { level: l })}
                                  className={`text-xs px-2 py-0.5 border transition-colors ${
                                    block.level === l ? "bg-[#e3e37b] border-yellow-500" : "bg-[#DBDBB8]/60 hover:bg-[#CFCFC0]"
                                  }`}
                                >
                                  H{l}
                                </button>
                              ))}
                            </div>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                              <input
                                className="w-full border p-2 outline-none text-xs lg:text-sm"
                                placeholder={`Heading ${block.level ?? 1} (English)`}
                                value={block.content ?? ""}
                                onChange={(e) => updateEnglishBlock(index, { content: e.target.value })}
                              />
                              <input
                                className="w-full border p-2 outline-none text-xs lg:text-sm"
                                placeholder={`Heading ${block.level ?? 1} (Nepali)`}
                                value={(nepaliValue as string) ?? ""}
                                onChange={(e) => updateNepaliValue(index, e.target.value)}
                              />
                            </div>
                          </>
                        )}

                        {/* PARAGRAPH */}
                        {block.type === "paragraph" && (
                          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            <textarea
                              className="min-h-16 w-full resize-y border p-2 outline-none text-xs lg:text-sm"
                              placeholder="Paragraph (English)"
                              value={block.content ?? ""}
                              onChange={(e) => updateEnglishBlock(index, { content: e.target.value })}
                            />
                            <textarea
                              className="min-h-16 w-full resize-y border p-2 outline-none text-xs lg:text-sm"
                              placeholder="Paragraph (Nepali)"
                              value={(nepaliValue as string) ?? ""}
                              onChange={(e) => updateNepaliValue(index, e.target.value)}
                            />
                          </div>
                        )}

                        {/* QUOTE */}
                        {block.type === "quote" && (
                          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            <textarea
                              className="min-h-20 w-full resize-y border p-2 italic outline-none text-xs lg:text-sm"
                              placeholder="Quote (English)"
                              value={block.content ?? ""}
                              onChange={(e) => updateEnglishBlock(index, { content: e.target.value })}
                            />
                            <textarea
                              className="min-h-20 w-full resize-y border p-2 italic outline-none text-xs lg:text-sm"
                              placeholder="Quote (Nepali)"
                              value={(nepaliValue as string) ?? ""}
                              onChange={(e) => updateNepaliValue(index, e.target.value)}
                            />
                          </div>
                        )}

                        {/* CALLOUT */}
                        {block.type === "callout" && (
                          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            <div className="border bg-[#EBECD8]/50 p-3">
                              <input
                                className="w-full font-bold outline-none bg-transparent mb-2 text-xs lg:text-sm"
                                value={block.content?.title ?? ""}
                                placeholder="Callout title (English)"
                                onChange={(e) =>
                                  updateEnglishBlock(index, {
                                    content: { ...block.content, title: e.target.value },
                                  })
                                }
                              />
                              <textarea
                                className="w-full outline-none bg-transparent resize-none text-xs lg:text-sm"
                                value={block.content?.description ?? ""}
                                placeholder="Callout description (English)"
                                onChange={(e) =>
                                  updateEnglishBlock(index, {
                                    content: { ...block.content, description: e.target.value },
                                  })
                                }
                              />
                            </div>
                            <div className="border bg-[#EBECD8]/50 p-3">
                              <input
                                className="mb-2 w-full bg-transparent text-xs lg:text-sm font-bold outline-none"
                                value={(nepaliValue as any)?.title ?? ""}
                                placeholder="Callout title (Nepali)"
                                onChange={(e) => updateNepaliCallout(index, { title: e.target.value })}
                              />
                              <textarea
                                className="w-full outline-none bg-transparent resize-none text-xs lg:text-sm"
                                value={(nepaliValue as any)?.description ?? ""}
                                placeholder="Callout description (Nepali)"
                                onChange={(e) =>
                                  updateNepaliCallout(index, { description: e.target.value })
                                }
                              />
                            </div>
                          </div>
                        )}

                        {/* LIST */}
                        {block.type === "list" && (
                          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2 border bg-[#EBECD8]/50 p-2">
                              {(Array.isArray(block.content) ? block.content : []).map(
                                (item: string, i: number) => (
                                  <div key={i} className="flex gap-1 items-center">
                                    <span className="text-gray-400 text-xs shrink-0">{i + 1}.</span>
                                    <input
                                      className="flex-1 outline-none p-1 border bg-white text-xs lg:text-sm"
                                      value={item}
                                      placeholder={`English item ${i + 1}`}
                                      onChange={(e) => updateEnglishListItem(index, i, e.target.value)}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removeEnglishListItem(index, i)}
                                      className="text-gray-400 hover:text-red-500 px-1 shrink-0"
                                    >
                                      ×
                                    </button>
                                  </div>
                                )
                              )}
                              <button
                                type="button"
                                onClick={() => addEnglishListItem(index)}
                                className="self-start mt-1 text-xs font-medium text-gray-700 underline hover:text-gray-900"
                              >
                                + Add item
                              </button>
                            </div>

                            <div className="flex flex-col gap-2 border bg-[#EBECD8]/50 p-2">
                              <textarea
                                className="min-h-24 w-full resize-y border bg-white p-2 text-xs lg:text-sm outline-none"
                                placeholder="One item per line. Press Enter to add another."
                                value={getNepaliListText(nepaliValue)}
                                onChange={(e) => handleNepaliListTextChange(index, e.target.value)}
                              />
                              <p className="text-[11px] text-gray-500">
                                Each new line becomes a new Nepali list item.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* IMAGE (shared across languages — not per-language text) */}
                        {block.type === "image" && (
                          <div className="flex items-start gap-3">
                            <div
                              onClick={() => fileInputRefs.current[block.id]?.click()}
                              className="relative group w-24 h-24 sm:w-28 sm:h-28 shrink-0 border overflow-hidden cursor-pointer bg-gray-50"
                              title="Click to replace image"
                            >
                              {block.content ? (
                                <img
                                  src={block.content}
                                  alt="Block preview"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                  <ImageIcon size={20} />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-[10px] font-medium px-1">
                                  Click to replace
                                </span>
                              </div>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={(el) => {
                                  fileInputRefs.current[block.id] = el;
                                }}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleImageReplace(index, file);
                                  e.target.value = "";
                                }}
                              />
                            </div>
                            <p className="text-xs text-gray-400 pt-2">
                              Images are shared across languages — no separate translation needed.
                            </p>
                          </div>
                        )}

                        {/* SEPARATOR */}
                        {block.type === "separator" && (
                          <div className="py-2">
                            <hr />
                            <p className="text-xs text-gray-400 mt-1">
                              Divider — structural only, no translation needed.
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          
          </div>
  )
}

export default TranslationComponent