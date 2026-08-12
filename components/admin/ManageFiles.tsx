"use client";

import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { useDeleteFile, useGetFiles } from "@/hooks/useFiles";
import { ExternalLink, File, FileAudio, Trash2 } from "lucide-react";
import React, { useState } from "react";

const ManageFiles = () => {
  const { data: files, isLoading, error } = useGetFiles();
  const { mutateAsync: deleteFile, isPending: isDeleting } = useDeleteFile();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ id: string; filename: string } | null>(null);

  const handleDeleteClick = (id: string, filename: string) => {
    setSelectedFile({ id, filename });
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedFile) return;

    try {
      await deleteFile(selectedFile.id);
    } catch (deleteError) {
      console.error(deleteError);
    } finally {
      setDialogOpen(false);
      setSelectedFile(null);
    }
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
    setSelectedFile(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10 text-sm text-gray-500">
        Loading files...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="bg-white relative z-20 shadow border overflow-hidden">
      <div className="border-b border-[#DBDBB8] bg-[#F2EFC8] px-6 py-5">
        <h2 className="text-xl font-semibold text-gray-900">Manage Files</h2>
        <p className="mt-1 text-sm text-gray-500">
          View, download, and delete your uploaded files.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-full border-collapse text-left">
          <thead className="bg-[#DBDBB8]">
            <tr>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-900">
                File
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-900">
                Type
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-900">
                Linked Blog
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-900">
                Uploaded
              </th>
              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-900">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {files?.length ? (
              files.map((file) => (
                <tr key={file.id} className="transition hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                        {file.fileType === "AUDIO" ? (
                          <FileAudio size={20} className="text-gray-600" />
                        ) : (
                          <File size={20} className="text-gray-600" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="max-w-65 truncate text-sm font-medium text-gray-900">
                          {file.originalName || file.fileName}
                        </p>
                        <p className="text-xs text-gray-500">{file.fileType}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                      {file.fileType || "file"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    {file.blogPost?.translations?.length ? (
                      <div className="max-w-70">
                        <p className="truncate text-sm font-medium text-gray-800">
                          {file.blogPost.translations[0]?.title || "Linked blog"}
                        </p>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-500">
                    {new Date(file.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm transition hover:bg-gray-100"
                        title="Open file"
                      >
                        <ExternalLink size={16} />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(file.id, file.originalName || file.fileName)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-500 transition hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-sm text-gray-500">
                  No files found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={dialogOpen}
        title="Delete File"
        message={`Are you sure you want to delete ${selectedFile?.filename ?? "this file"}? This action cannot be undone.`}
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        variant="warning"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ManageFiles