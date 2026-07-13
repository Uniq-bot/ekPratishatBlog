"use client";
import { useCreateTag, useUpdateTag } from "@/hooks/useAdminBlogs";
import { Tag as TagP } from "@/types/blog";
import React from "react";

const Tag = ({ tags, isLoading }: { tags?: TagP[]; isLoading: boolean }) => {
  const [tagValue, setTagValue] = React.useState("");
  const [tagValueNep, setTagValueNep] = React.useState("");
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editName, setEditName] = React.useState("");
  const [editNameNp, setEditNameNp] = React.useState("");

  const { mutateAsync: createTag, isPending: isCreating } = useCreateTag();
  const { mutateAsync: updateTag, isPending: isUpdating } = useUpdateTag();

  const handleAddTags = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagValue.trim()) return;
    try {
      await createTag({ name: tagValue.trim(), nameNp: tagValueNep.trim() });
      setTagValue("");
      setTagValueNep("");
    } catch {
      // Error toast handled by useCreateTag
    }
  };

  const startEditing = (tag: TagP) => {
    setEditingId(tag.id);
    const englishName = tag.translations?.find((item: any) => item.language === "en")?.name ?? tag.name ?? "";
    const nepaliName = tag.translations?.find((item: any) => item.language === "ne")?.name ?? "";
    setEditName(englishName);
    setEditNameNp(nepaliName);
  };

  const handleUpdateTag = async (tagId: string) => {
    if (!editName.trim()) return;
    try {
      await updateTag({ id: tagId, name: editName.trim(), nameNp: editNameNp.trim() });
      setEditingId(null);
      setEditName("");
      setEditNameNp("");
    } catch {
      // Error toast handled by useUpdateTag
    }
  };

  return (
    <div className="w-full h-auto transition-all bg-[#EBECD8] p-4 relative z-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Tags</h1>
        <span className="text-xs bg-black/10 px-2 py-1 rounded">total {tags?.length ?? 0}</span>
      </div>

      <form onSubmit={handleAddTags} className="border border-dashed flex flex-col lg:flex-row p-2 items-center gap-3 bg-transparent">
        <input
          type="text"
          placeholder="Tag name (English) *"
          value={tagValue}
          onChange={(e) => setTagValue(e.target.value)}
          className="flex-1 w-full bg-transparent outline-none border border-gray-400 px-2 py-1"
          required
        />
        <input
          type="text"
          placeholder="Tag name (Nepali)"
          value={tagValueNep}
          onChange={(e) => setTagValueNep(e.target.value)}
          className="flex-1 w-full bg-transparent outline-none border border-gray-400 px-2 py-1"
          required
        />
        <button type="submit" disabled={isCreating} className="bg-black w-full lg:w-auto text-white px-4 py-1 text-sm disabled:opacity-50">
          {isCreating ? "Adding..." : "Add +"}
        </button>
      </form>

      {isLoading ? (
        <p className="text-sm text-gray-500 mt-3">Loading tags...</p>
      ) : (
        <div className="mt-4 space-y-2">
          {tags?.map((tag: TagP) => {
            const isEditing = editingId === tag.id;
            const englishName = tag.translations?.find((item: any) => item.language === "en")?.name ?? tag.name ?? "";
            const nepaliName = tag.translations?.find((item: any) => item.language === "ne")?.name ?? "";

            return (
              <div key={tag.id} className="border-b border-gray-400 py-2 px-1">
                {isEditing ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-transparent outline-none border border-gray-400 px-2 py-1"
                      placeholder="English name"
                    />
                    <input
                      type="text"
                      value={editNameNp}
                      onChange={(e) => setEditNameNp(e.target.value)}
                      className="w-full bg-transparent outline-none border border-gray-400 px-2 py-1"
                      placeholder="Nepali name"
                    />
                    <div className="flex gap-2">
                      <button type="button" onClick={() => handleUpdateTag(tag.id)} disabled={isUpdating} className="bg-black text-white px-3 py-1 text-sm disabled:opacity-50">
                        {isUpdating ? "Saving..." : "Save"}
                      </button>
                      <button type="button" onClick={() => setEditingId(null)} className="border border-gray-500 px-3 py-1 text-sm">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center gap-3">
                    <span className="font-medium">{englishName}{nepaliName ? ` / ${nepaliName}` : ""}</span>
                    <button type="button" onClick={() => startEditing(tag)} className="text-sm text-black underline">
                      Edit
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Tag;
