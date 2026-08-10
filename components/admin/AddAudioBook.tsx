"use client";

import { useUploadAudio, useUploadAudioForBlog } from "@/hooks/useAudioPost";
import React, { useRef, useState } from "react";

const AddAudioBook = ({
  audioSlug,
}: {
  audioSlug: string | null;
}) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { mutateAsync: uploadAudioForBlog } = useUploadAudioForBlog();
  const { mutateAsync: uploadIndependentAudio } = useUploadAudio();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | undefined) => {
    setMessage("");
    setError("");

    if (!file) return;

    const allowedTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/x-wav",
      "audio/mp4",
      "audio/ogg",
      "audio/aac",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a valid audio file.");
      return;
    }

    setAudioFile(file);
  };

  const handleBlogAudioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!audioSlug) {
      setError("No blog was selected.");
      return;
    }

    if (!audioFile) {
      setError("Please select an audio file.");
      return;
    }

    try {
      setIsUploading(true);
      await uploadAudioForBlog({ slug: audioSlug, file: audioFile });
      setMessage("Audio book uploaded successfully.");
      setAudioFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Something went wrong."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleIndependentAudioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!audioFile) {
      setError("Please select an audio file.");
      return;
    }

    try {
      setIsUploading(true);
      await uploadIndependentAudio({ file: audioFile });
      setMessage("Audio book uploaded successfully.");
      setAudioFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Something went wrong."
      );
    } finally {
      setIsUploading(false);
    }
  };

  if (!audioSlug) {
    return (
      <div className="mx-auto w-full max-w-3xl bg-white relative z-20 shadow border overflow-hidden">
        <div className="border-b border-[#DBDBB8] bg-[#F2EFC8] px-6 py-5">
          <h2 className="text-xl font-semibold text-gray-900">
            Add Independent Audio Book
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Upload an audio book without connecting it to a blog post.
          </p>
        </div>

        <div className="p-6">
          <form
            onSubmit={handleIndependentAudioSubmit}
            className="space-y-6 "
          >
            <div className="grid gap-6">
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Audio File
              </label>
              <p className="mb-4 text-xs text-gray-500">
                Supported formats: MP3, WAV, M4A, OGG and AAC.
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 py-10 transition hover:border-gray-400 hover:bg-gray-50"
              >
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
                  🎧
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {audioFile ? "Choose a different audio file" : "Choose an audio file"}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Click here to browse your files
                </p>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".mp3,.wav,.m4a,.ogg,.aac,audio/*"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0])}
              />
            </div>

            {audioFile && (
              <div className="mb-5 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                  🎵
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {audioFile.name}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {formatFileSize(audioFile.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAudioFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="rounded-lg px-2 py-1 text-sm text-gray-500 transition hover:bg-gray-200 hover:text-gray-900"
                >
                  Remove
                </button>
              </div>
            )}

            {message && (
              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {message}
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!audioFile || isUploading}
              className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUploading ? "Uploading Audio..." : "Upload Independent Audio"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl bg-white relative z-20 shadow border overflow-hidden">
      <div className="border-b border-[#DBDBB8] bg-[#F2EFC8] px-6 py-5">
        <h2 className="text-xl font-semibold text-gray-900">Add Audio Book</h2>
        <p className="mt-1 text-sm text-gray-500">Upload an audio file for this blog post.</p>
        <div className="mt-3 inline-flex items-center rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600">
          <span className="mr-2">🔗</span>
          <span className="truncate">{audioSlug}</span>
        </div>
      </div>

      <div className="p-6">
        <form
          onSubmit={handleBlogAudioSubmit}
          className="space-y-6   "
        >
          <div className="grid gap-6">
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Audio File
            </label>
            <p className="mb-4 text-xs text-gray-500">
              Supported formats: MP3, WAV, M4A, OGG and AAC.
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 py-10 transition hover:border-gray-400 hover:bg-gray-50"
            >
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
                🎧
              </div>
              <p className="text-sm font-medium text-gray-900">
                {audioFile ? "Choose a different audio file" : "Choose an audio file"}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Click here to browse your files
              </p>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".mp3,.wav,.m4a,.ogg,.aac,audio/*"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files?.[0])}
            />
          </div>

          {audioFile && (
            <div className="mb-5 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                🎵
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {audioFile.name}
                </p>
                <p className="mt-0.5 text-xs text-gray-500">
                  {formatFileSize(audioFile.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAudioFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="rounded-lg px-2 py-1 text-sm text-gray-500 transition hover:bg-gray-200 hover:text-gray-900"
              >
                Remove
              </button>
            </div>
          )}

          {message && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!audioFile || isUploading}
            className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUploading ? "Uploading Audio..." : "Upload Audio Book"}
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

export default AddAudioBook;
