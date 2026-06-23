"use client";

import { useGetSubscribers } from "@/hooks/useGetSubscriber";


function Subscriber() {
    const {data:subscribers, isLoading:isSubscriberLoading}=useGetSubscribers();
    console.log(subscribers)
  return (
    <div className="bg-white relative z-20 shadow border overflow-hidden ">
     
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[640px]">
          <thead className="bg-[#DBDBB8]">
            <tr>
              <th className="px-4 py-3 ">#</th>
              <th className="px-4 py-3 ">Subscriber Email</th>
              <th className="px-4 py-3 ">Subscribed at</th>
             
            </tr>
          </thead>
          <tbody>
            {subscribers?.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  No subscribers yet.
                </td>
              </tr>
            )}
            {subscribers?.map((subscriber: any, index: number) => (
              <tr
                key={subscriber.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-4 text-sm text-center text-gray-500">{index + 1}</td>
                <td className="px-4 py-4">
                  <div className="font-medium text-center text-sm">{subscriber.email}</div>
                </td>
                <td className="px-4 text-center py-4">{subscriber.createdAt?.toLocaleDateString() ?? "—"}</td>
              </tr>
            ))} 
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Subscriber;
