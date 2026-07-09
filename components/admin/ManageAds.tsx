// "use server"
"use client";

// import { prisma } from "@/libs/prisma";
import { Edit, Trash } from "lucide-react";
import { motion } from "framer-motion";
import { useDeleteAd, useUpdateAdStatus } from "@/hooks/useAdminAdvertisement";
import { useState } from "react";
import Link from "next/link";

function ManageAds({ advertisements }: { advertisements: any[] }) {
  
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const updateStatusMutation = useUpdateAdStatus();
  const deleteAdMutation = useDeleteAd();
  const handleAdStatusChange = async (adId: string, status: boolean) => {
    if(!confirm("Are you sure you want to change the status of this ad?")) return;
    try {
      const res = await updateStatusMutation.mutateAsync({ adId, status });
      setSuccess("Ad status updated successfully");
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Error updating ad status:", error);
      }
      setError("Error updating ad status");
    } finally {
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 2000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ad?")) return;

    try {
      await deleteAdMutation.mutateAsync(id);
      setSuccess("Ad deleted successfully");
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Error deleting ad:", error);
      }
      setError("Error deleting ad");
    } finally {
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 2000);
    }
  };

  return (
    <div className="bg-white relative z-20 shadow border overflow-hidden ">
      {error && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          className="mx-3 lg:mx-10 absolute right-0 -top-20 mt-4 px-3 lg:px-4 py-2 bg-red-100 border border-red-400 text-red-700 text-xs lg:text-sm"
        >
          {error}
        </motion.div>
      )}
      {success && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          className="mx-3 lg:mx-10 absolute right-0 -top-5 mt-4 px-3 lg:px-4 py-2 bg-green-100 border border-green-400 text-green-700 text-xs lg:text-sm"
        >
          {success}
        </motion.div>
      )}
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-160">
          <thead className="bg-[#DBDBB8]">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Ad Title</th>
              <th className="px-4 py-3 text-left">Ad Sponsor</th>
              <th className="px-4 py-3 text-left">Ad Type</th>

              <th className="px-4 py-3 text-center">Make it live</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {advertisements?.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  No advertisements yet.
                </td>
              </tr>
            )}
            {advertisements?.map((ad: any, index: number) => (
              <tr
                key={ad.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-4 text-sm text-gray-500">{index + 1}</td>
                <td className="px-4 py-4">
                  <div className="font-medium text-sm">{ad.AdTitle}</div>
                </td>
                <td className="px-4 py-4">{ad.AdSponsorName ?? "—"}</td>
                <td className="px-4 py-4">
                 {ad.AdType === "BANNER"
                    ? "Banner"
                    : ad.AdType === "ASIDE"
                    ? "Aside"
                    : ad.AdType === "POPUP"
                    ? "Popup"
                    : "—"}
                </td>

                <td className="px-4 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={ad.isAdRunning}
                    onChange={(e) =>
                      handleAdStatusChange(ad.id, e.target.checked)
                    }
                  />
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    {/* Link instead of router.push */}
                    <Link
                      href={`/admin/editAd/${ad.id}`}
                      className="p-2 bg-white border hover:bg-gray-100 transition-all"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(ad.id)}
                      disabled={deleteAdMutation.isPending}
                      className="p-2 border bg-white cursor-pointer hover:bg-red-500 hover:text-white disabled:opacity-50 transition-all"
                      title="Delete"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageAds;
