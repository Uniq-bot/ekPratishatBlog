const RootLoading = () => {
  return (
    <div className="min-h-[90vh] bg-[#FFFDF8] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="border-b border-neutral-200 pb-8">
          <div className="h-3 w-32 bg-neutral-200 animate-pulse" />
          <div className="mt-4 h-10 w-64 bg-neutral-200 animate-pulse" />
          <div className="mt-3 h-3 w-80 bg-neutral-200 animate-pulse" />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="border border-neutral-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <div className="h-3 w-24 bg-neutral-200 animate-pulse" />
                <div className="h-3 w-20 bg-neutral-200 animate-pulse" />
              </div>
              <div className="mt-4 h-5 w-40 bg-neutral-200 animate-pulse" />
              <div className="mt-3 h-3 w-full bg-neutral-200 animate-pulse" />
              <div className="mt-2 h-3 w-5/6 bg-neutral-200 animate-pulse" />
              <div className="mt-4 h-3 w-20 bg-neutral-200 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RootLoading;
