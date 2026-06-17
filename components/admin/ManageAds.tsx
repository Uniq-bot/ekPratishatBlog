// "use server"
import { prisma } from "@/libs/prisma";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import { TableSkeleton } from "./skeleton/TableSkeleton";

function ManageAds({ advertisements }: { advertisements: any[] }) {
  console.log(advertisements);
  return (
    <div className="bg-white relative z-20 shadow border overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[640px]">
          <thead className="bg-[#DBDBB8]">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Ad Title</th>
              <th className="px-4 py-3 text-left">Ad Sponsor</th>
              <th className="px-4 py-3 text-left">Ad Type</th>

              <th className="px-4 py-3 text-center">Make it live</th>
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
                    <select defaultValue={ad.AdType} className="border p-1">
                        <option value="BANNER">BANNER</option>
                        <option value="ASIDE">ASIDE</option>
                        <option value="POPUP">POPUP</option>
                    </select>
                </td>

                <td className="px-4 py-4 text-center">
                    <input type="checkbox" defaultChecked={ad.isAdRunning} />
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
