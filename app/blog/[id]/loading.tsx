const BlogLoading = () => {
  return (
    <div className="min-h-[90vh] bg-[#FFFDF8] px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="h-3 w-40 bg-neutral-200 animate-pulse" />
        <div className="mt-8 border border-neutral-200 bg-white p-8">
          <div className="flex items-center justify-between">
            <div className="h-3 w-24 bg-neutral-200 animate-pulse" />
            <div className="h-3 w-20 bg-neutral-200 animate-pulse" />
          </div>
          <div className="mt-4 h-8 w-3/4 bg-neutral-200 animate-pulse" />
          <div className="mt-6 flex gap-2">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-6 w-16 bg-neutral-200 animate-pulse" />
            ))}
          </div>
          <div className="mt-8 space-y-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="h-3 w-full bg-neutral-200 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogLoading;
