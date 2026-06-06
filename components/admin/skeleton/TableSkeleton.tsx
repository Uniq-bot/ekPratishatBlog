export const TableSkeleton = () => (
  <div className="w-full p-4 space-y-3">
    <div className="h-10 w-full bg-gray-200 animate-pulse" />
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-12 w-full bg-gray-100 animate-pulse" />
    ))}
  </div>
);
