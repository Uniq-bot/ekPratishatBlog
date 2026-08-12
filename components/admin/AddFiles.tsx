"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { File, FileAudio, FolderOpen, Link2, Search, X } from "lucide-react";
import { useGetAdminBlogs } from "@/hooks/useAdminBlogs";
import { useUploadFile } from "@/hooks/useFiles";

const allowedAudioTypes = [
  "audio/mpeg",
  "audio/wav",
  "audio/x-wav",
  "audio/mp4",
  "audio/ogg",
  "audio/aac",
];

type SelectedBlog = {
  id: string;
  title: string;
};

type AddFilesProps = {
  preselectedBlog?: SelectedBlog | null;
  onClearPreselectedBlog?: () => void;
};

const AddFiles = ({ preselectedBlog, onClearPreselectedBlog }: AddFilesProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileTitle, setFileTitle] = useState("");
  const [selectedBlog, setSelectedBlog] = useState<SelectedBlog | null>(null);
  const [blogSearchQuery, setBlogSearchQuery] = useState("");
  const [isBlogSearchOpen, setIsBlogSearchOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const blogSearchRef = useRef<HTMLDivElement>(null);
  const { mutateAsync: uploadFile } = useUploadFile();
  const { data: blogs, isLoading: isBlogsLoading } = useGetAdminBlogs();
  const blogList = blogs?.posts ?? [];

  useEffect(() => {
    if (preselectedBlog) {
      setSelectedBlog(preselectedBlog);
      setBlogSearchQuery(preselectedBlog.title);
    }
  }, [preselectedBlog]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        blogSearchRef.current &&
        !blogSearchRef.current.contains(event.target as Node)
      ) {
        setIsBlogSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredBlogs = useMemo(() => {
    const query = blogSearchQuery.trim().toLowerCase();
    if (!query) return blogList;

    return blogList.filter((blog: { id: string; title: string; slug?: string }) => {
      const title = blog.title?.toLowerCase() ?? "";
      const slug = blog.slug?.toLowerCase() ?? "";
      return title.includes(query) || slug.includes(query);
    });
  }, [blogList, blogSearchQuery]);

  const handleFileChange = (file: File | undefined) => {
    setError("");
    if (!file) return;
    setSelectedFile(file);
  };

  const handleSelectBlog = (blog: SelectedBlog) => {
    setSelectedBlog(blog);
    setBlogSearchQuery(blog.title);
    setIsBlogSearchOpen(false);
  };

  const handleClearBlog = () => {
    setSelectedBlog(null);
    setBlogSearchQuery("");
    onClearPreselectedBlog?.();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }

    if (!fileTitle.trim()) {
      setError("Please enter a file title.");
      return;
    }

    try {
      setIsUploading(true);
      await uploadFile({
        fileTitle: fileTitle.trim(),
        file: selectedFile,
        blogId: selectedBlog?.id ?? null,
      });
      setSelectedFile(null);
      setFileTitle("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Something went wrong.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const SelectedFileIcon =
    selectedFile && allowedAudioTypes.includes(selectedFile.type) ? FileAudio : File;

  return (
    <div className="mx-auto w-full max-w-3xl bg-white relative z-20 shadow border overflow-hidden">
      <div className="border-b border-[#DBDBB8] bg-[#F2EFC8] px-6 py-5">
        <h2 className="text-xl font-semibold text-gray-900">Add File</h2>
        <p className="mt-1 text-sm text-gray-500">
          Upload a file and optionally link it to a blog post.
        </p>
        {selectedBlog && (
          <div className="mt-3 inline-flex items-center gap-2  bg-gray-50 px-3 py-2 text-sm text-gray-600">
            <Link2 size={16} className="shrink-0 text-gray-400" />
            <span className="font-medium text-gray-800">{selectedBlog.title}</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-2">
            <label htmlFor="blog-search" className="block text-sm font-medium text-gray-900">
              Link to Blog <span className="font-normal text-gray-500">(optional)</span>
            </label>

            {selectedBlog ? (
              <div className="flex items-center gap-2  border border-gray-300 bg-gray-50 px-4 py-3">
                <Link2 size={16} className="shrink-0 text-gray-400" />
                <span className="min-w-0 flex-1 truncate text-wrap text-sm text-gray-900">
                  {selectedBlog.title}
                </span>
                <button
                  type="button"
                  onClick={handleClearBlog}
                  className=" p-1 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900"
                  aria-label="Remove linked blog"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div ref={blogSearchRef} className="relative">
                <div className="relative">
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="blog-search"
                    type="text"
                    value={blogSearchQuery}
                    onChange={(e) => {
                      setBlogSearchQuery(e.target.value);
                      setIsBlogSearchOpen(true);
                    }}
                    onFocus={() => setIsBlogSearchOpen(true)}
                    disabled={isBlogsLoading}
                    placeholder="Search blogs by title or slug..."
                    className="w-full  border border-gray-300 py-3 pl-11 pr-4 text-sm outline-none focus:border-gray-500 disabled:cursor-not-allowed disabled:bg-gray-50"
                  />
                </div>

                {isBlogSearchOpen && (
                  <div className="absolute z-30 mt-2 max-h-60 w-full overflow-y-auto  border border-gray-200 bg-white shadow-lg">
                    {isBlogsLoading ? (
                      <p className="px-4 py-3 text-sm text-gray-500">Loading blogs...</p>
                    ) : filteredBlogs.length > 0 ? (
                      filteredBlogs.map((blog: { id: string; title: string; slug?: string }) => (
                        <button
                          key={blog.id}
                          type="button"
                          onClick={() => handleSelectBlog({ id: blog.id, title: blog.title })}
                          className="flex w-full flex-col items-start gap-0.5 border-b border-gray-100 px-4 py-3 text-left transition last:border-b-0 hover:bg-gray-50"
                        >
                          <span className="text-sm font-medium text-gray-900">{blog.title}</span>
                          {blog.slug && (
                            <span className="text-xs text-gray-500">{blog.slug}</span>
                          )}
                        </button>
                      ))
                    ) : (
                      <p className="px-4 py-3 text-sm text-gray-500">No blogs found.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <label htmlFor="file-title" className="block text-sm font-medium text-gray-900">
              File Title
            </label>
            <input
              id="file-title"
              type="text"
              value={fileTitle}
              onChange={(e) => setFileTitle(e.target.value)}
              placeholder="Enter file title"
              className="w-full  border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500"
            />
          </div>

          <div className="grid gap-2">
            <label className="block text-sm font-medium text-gray-900">File</label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full flex-col items-center justify-center  border-2 border-dashed border-gray-300 px-6 py-10 transition hover:border-gray-400 hover:bg-gray-50"
            >
              <div className="mb-3 flex h-14 w-14 items-center justify-center  bg-gray-100">
                <FolderOpen size={28} className="text-gray-500" />
              </div>
              <p className="text-sm font-medium text-gray-900">
                {selectedFile ? "Choose a different file" : "Choose a file"}
              </p>
              <p className="mt-1 text-xs text-gray-500">Click here to browse your files</p>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="*/*"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files?.[0])}
            />
          </div>

          {selectedFile && (
            <div className="flex items-center gap-3  border border-gray-200 bg-gray-50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center  bg-white shadow-sm">
                <SelectedFileIcon size={20} className="text-gray-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {selectedFile.name}
                </p>
                <p className="mt-0.5 text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className=" p-1 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900"
                aria-label="Remove file"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {error && (
            <div className=" border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!selectedFile || !fileTitle.trim() || isUploading}
            className="w-full  bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUploading ? "Uploading File..." : "Upload File"}
          </button>
        </form>
      </div>
    </div>
  );
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const units = ["Bytes", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${units[index]}`;
};

export default AddFiles;
