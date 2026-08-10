import { useDeleteAudio, useGetAudio } from "@/hooks/useAudioPost";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import React, { useState } from "react";

const ManageAudioBooks = () => {
  const { data: audioBooks, isLoading, error } = useGetAudio();
  const { mutateAsync: deleteAudio, isPending: isDeleting } = useDeleteAudio();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<{
    id: string;
    filename: string;
  } | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const handleDeleteClick = (id: string, filename: string) => {
    setSelectedAudio({ id, filename });
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedAudio) return;

    try {
      await deleteAudio(selectedAudio.id);
    } catch (error) {
      console.error(error);
    } finally {
      setDialogOpen(false);
      setSelectedAudio(null);
    }
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
    setSelectedAudio(null);
  };

  const togglePlay = (id: string) => {
    setPlayingAudioId((current) => (current === id ? null : id));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10 text-sm text-gray-500">
        Loading audio books...
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
        <h2 className="text-xl font-semibold text-gray-900">
          Manage Audio Books
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Play, delete, and manage your uploaded audio files.
        </p>
      </div>

      <div className="overflow-x-auto ">
        <table className="w-full min-w-full border-collapse text-left">
          <thead className="bg-[#DBDBB8]">
            <tr>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-900">
                Audio Book
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
          {audioBooks?.length ? (

            audioBooks.map((audio) => (
              <tr
                key={audio.id}
                className="transition hover:bg-gray-50"
              >
                {/* Audio */}
                <td className="px-5 py-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-lg">
                        🎧
                      </div>

                      <div className="min-w-0">
                        <p className="max-w-[260px] truncate text-sm font-medium text-gray-900">
                          {audio.audioFile?.split("/").pop()}
                        </p>

                        <p className="text-xs text-gray-500">
                          Audio Book
                        </p>
                      </div>
                    </div>

                    {playingAudioId === audio.id && (
                      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3">
                        <audio
                          controls
                          preload="none"
                          className="w-full"
                          src={`http://localhost:80${audio.audioFile}`}
                        />
                      </div>
                    )}
                  </div>
                </td>

                {/* Type */}
                <td className="px-5 py-4">
                  {audio.blogSlug ? (
                    <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                      Blog Linked
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-700">
                      Independent
                    </span>
                  )}
                </td>

                {/* Linked Blog */}
                <td className="px-5 py-4">
                  {audio.blogSlug ? (
                    <div className="max-w-[280px]">
                      <p className="truncate text-sm font-medium text-gray-800">
                        {audio.blogSlug}
                      </p>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>

                {/* Date */}
                <td className="px-5 py-4 text-sm text-gray-500">
                  {new Date(audio.createdAt).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => togglePlay(audio.id)}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm transition hover:bg-gray-100"
                      title={playingAudioId === audio.id ? "Hide player" : "Play audio"}
                    >
                      ▶
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteClick(audio.id, audio.audioFile?.split("/").pop() ?? "audio")}
                      className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-500 transition hover:bg-red-50"
                      title="Delete"
                    >
                      🗑
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="px-5 py-12 text-center text-sm text-gray-500"
              >
                No audio books found.
              </td>
            </tr>
          )}
        </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={dialogOpen}
        title="Delete Audio Book"
        message={`Are you sure you want to delete ${selectedAudio?.filename ?? "this audio"}? This action cannot be undone.`}
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        variant="warning"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ManageAudioBooks;