"use client";

import { useAddAdvertisement } from "@/hooks/useAdminAdvertisement";
import { useRef, useState } from "react";

export default function Advertisement() {
  const [adType, setAdType] = useState("BANNER");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setAdType("BANNER");

    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  const createAdMutate = useAddAdvertisement();
  ``;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    console.log(form);
    const formData = new FormData(form);
    console.log("form data of frontend: ", [...formData.entries()]);

    try {
      await createAdMutate.mutateAsync(formData);

      setSuccessMsg("Advertisement created successfully!");
    } catch (error: any) {
      setSubmitError(error?.message || "Failed to create advertisement");
    } finally {
      form.reset();
      resetForm();
      setTimeout(() => {
        setSubmitError(null);

        setSuccessMsg(null);
        setImage(null);
      }, 3000);
    }
  };
  return (
    <div className=" border w-fit m-auto  h-full flex flex-col py-10  bg-[#F0F0E0]">
      <h1 className="text-lg lg:text-xl border-r border border-l-0 bg-[#DBDBB8]  w-fit px-4 lg:px-10 py-2">
        Create Advertisement
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl p-5 py-5 ">
        <input
          type="text"
          name="title"
          placeholder="Advertisement Title"
          className="w-full p-2 border "
          required
        />

        <textarea
          name="description"
          placeholder="Advertisement Description"
          className="w-full p-2 border "
          rows={4}
          required
        />

        <input
          type="text"
          name="AdSponsorName"
          placeholder="Sponsor Name"
          className="w-full p-2 border "
          required
        />

        <input
          type="url"
          name="AdLink"
          placeholder="https://example.com"
          className="w-full p-2 border "
          required
        />

        {image && (
          <div className="relative w-1/2 border bg-gray-50 overflow-hidden">
            <img
              src={URL.createObjectURL(image)}
              alt="Cover preview"
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
        )}

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
          required={!image}
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

        <label className="flex items-center gap-2">
          <input type="checkbox" name="isAdRunning" defaultChecked />
          Activate Advertisement
        </label>
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
        <button
          type="submit"
          disabled={createAdMutate.isPending}
          className="px-4 py-2 bg-blue-500 text-white  disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {createAdMutate.isPending && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent -full animate-spin" />
          )}

          {createAdMutate.isPending
            ? "Creating Advertisement..."
            : "Create Advertisement"}
        </button>
      </form>
    </div>
  );
}
