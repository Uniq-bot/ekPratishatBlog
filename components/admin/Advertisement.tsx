"use client";

import {
  useAddAdvertisement,
  useUpdateAd,
} from "@/hooks/useAdminAdvertisement";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { notify } from "@/libs/notify";

export default function Advertisement({ editAd }: { editAd?: any }) {
  const router = useRouter();
  const [adType, setAdType] = useState("BANNER");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sponsorName, setSponsorName] = useState("");
  const [adLink, setAdLink] = useState("");
  // Existing image URL when editing — adjust the field name below to match
  // whatever your API returns (AdImage / image / imageUrl, etc).
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const createAdMutate = useAddAdvertisement();
  const { mutateAsync: updateAdMutate, isPending } = useUpdateAd();
  const mode = editAd ? "edit" : "create";
  const isSubmitting = mode === "edit" ? isPending : createAdMutate.isPending;

  useEffect(() => {
    if (!editAd) return;

    setTitle(editAd.AdTitle || "");
    setDescription(editAd.AdDescription || "");
    setSponsorName(editAd.AdSponsorName || "");
    setAdLink(editAd.AdLink || "");
    setAdType(editAd.AdType || "BANNER");
    setExistingImageUrl(editAd.AdImage || editAd.image || null);
    setImage(null);
  }, [editAd]);

  const resetForm = () => {
    setAdType("BANNER");
    setTitle("");
    setDescription("");
    setSponsorName("");
    setAdLink("");
    setImage(null);
    setExistingImageUrl(null);

    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (mode === "edit") {
      const formData = new FormData();

      formData.append("id", editAd.id);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("AdSponsorName", sponsorName);
      formData.append("AdLink", adLink);
      formData.append("AdType", adType);

      if (image) {
        formData.append("image", image);
      }
      try {
        await updateAdMutate(formData);
        setSuccessMsg("Advertisement updated successfully!");
        router.push("/admin");
      } catch (error) {
        setSubmitError("We could not update the advertisement right now.");
      }
      return;
    }

    try {
      await createAdMutate.mutateAsync(formData);
      setSuccessMsg("Advertisement created successfully!");
      form.reset();
      resetForm();
    } catch (error: any) {
      setSubmitError("We could not create the advertisement right now.");
    } finally {
      setTimeout(() => {
        setSubmitError(null);
        setSuccessMsg(null);
      }, 3000);
    }
  };

  const handleDelete = () => {
    if (!editAd) return;
    const confirmed = confirm(
      `Delete advertisement "${title}"? This cannot be undone.`,
    );
    if (!confirmed) return;
    // No delete mutation wired up yet.
    notify.info("Delete advertisement", `Delete action is not wired up for ${editAd.id ?? title} yet.`);
  };

  return (
    <div className=" border w-fit m-auto  h-full flex flex-col py-10  bg-[#F0F0E0]">
      <h1 className="text-lg lg:text-xl border-r border border-l-0 bg-[#DBDBB8]  w-fit px-4 lg:px-10 py-2">
        {mode === "edit" ? "Edit" : "Create"} Advertisement
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl p-5 py-5 ">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Advertisement Title"
          className="w-full p-2 border "
          required
        />

        <textarea
          name="description"
          placeholder="Advertisement Description"
          className="w-full p-2 border "
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="text"
          name="AdSponsorName"
          value={sponsorName}
          onChange={(e) => setSponsorName(e.target.value)}
          placeholder="Sponsor Name"
          className="w-full p-2 border "
          required
        />

        <input
          type="url"
          name="AdLink"
          value={adLink}
          onChange={(e) => setAdLink(e.target.value)}
          placeholder="https://example.com"
          className="w-full p-2 border "
          required
        />

        {image ? (
          <div className="relative w-1/2 border bg-gray-50 overflow-hidden">
            <img
              src={URL.createObjectURL(image)}
              alt="New image preview"
              className="w-full h-32 sm:h-40 lg:h-60 object-cover"
            />
            <button
              type="button"
              onClick={() => {
                setImage(null);
                if (imageRef.current) imageRef.current.value = "";
              }}
              className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 hover:bg-black/80 transition-colors"
            >
              Remove
            </button>
          </div>
        ) : existingImageUrl ? (
          <div className="relative w-1/2 border bg-gray-50 overflow-hidden">
            <img
              src={existingImageUrl}
              alt="Current advertisement image"
              className="w-full h-32 sm:h-40 lg:h-60 object-cover"
            />
            <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1">
              Current image
            </span>
          </div>
        ) : null}

        <input
          ref={imageRef}
          type="file"
          name="image"
          accept="image/*"
          className={`w-full p-2 border ${image ? "hidden" : ""}`}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage(e.target.files[0]);
            }
          }}
          required={mode === "create" && !image}
        />
        <select
          name="AdType"
          value={adType}
          onChange={(e) => setAdType(e.target.value)}
          className="w-full p-2 border "
        >
          <option value="BANNER">Banner</option>
          <option value="ASIDE">Aside</option>
          <option value="POPUP">Popup</option>
        </select>

        {submitError && (
          <div className="mb-4 px-4 py-2 bg-red-100 border border-red-400 text-red-700">
            {submitError}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 px-4 py-2 bg-green-100 border border-green-400 text-green-700">
            {successMsg}
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white  disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}

            {isSubmitting
              ? mode === "edit"
                ? "Saving Changes..."
                : "Creating Advertisement..."
              : mode === "edit"
                ? "Save Changes"
                : "Create Advertisement"}
          </button>

          {mode === "edit" && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white"
            >
              Delete Advertisement
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
