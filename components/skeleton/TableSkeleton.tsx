export const TableSkeleton = () => {
  return (
    <table className="w-full">
      <thead className="bg-[#DBDBB8]">
        <tr>
          <th className="px-4 py-3 text-left">Id</th>
          <th className="px-4 py-3 text-left">Title</th>
          <th className="px-4 py-3 text-left">Category</th>
          <th className="px-4 py-3 text-left">Tags</th>
          <th className="px-4 py-3 text-center">Views</th>
          <th className="px-4 py-3 text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        {[...Array(5)].map((_, index) => (
          <tr key={index} className="border-t">
            <td className="px-4 py-4">
              <div className="h-4 w-6 bg-gray-200 animate-pulse" />
            </td>

            <td className="px-4 py-4">
              <div className="h-4 w-48 bg-gray-200 animate-pulse" />
            </td>

            <td className="px-4 py-4">
              <div className="h-6 w-24 bg-gray-200 animate-pulse" />
            </td>

            <td className="px-4 py-4">
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-gray-200 animate-pulse" />
                <div className="h-6 w-20 bg-gray-200 animate-pulse" />
              </div>
            </td>

            <td className="px-4 py-4 text-center">
              <div className="h-4 w-10 bg-gray-200 animate-pulse mx-auto" />
            </td>

            <td className="px-4 py-4">
              <div className="flex justify-center gap-2">
                <div className="h-9 w-9 bg-gray-200 animate-pulse" />
                <div className="h-9 w-9 bg-gray-200 animate-pulse" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};