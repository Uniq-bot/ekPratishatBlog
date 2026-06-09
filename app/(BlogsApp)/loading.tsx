const RootLoading = () => {
  return (
    <div className="min-h-[90vh] bg-[#F7F3EA] px-4 py-6 md:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl gap-8 lg:gap-10">

        {/* LEFT SECTION */}
        <div className="min-h-screen w-full lg:w-[100%] space-y-8">

          <div className="space-y-4  border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="h-4 w-24 l bg-neutral-200 animate-pulse" />
            <div className="h-10 w-3/4 bg-neutral-200 animate-pulse" />
            <div className="h-4 w-full l bg-neutral-200 animate-pulse" />
            <div className="h-4 w-5/6 l bg-neutral-200 animate-pulse" />
            <div className="h-4 w-2/3 l bg-neutral-200 animate-pulse" />
          </div>

          {/* LIST SKELETON */}
          <div className=" border border-neutral-200 bg-white p-4 shadow-sm space-y-3">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="space-y-3  border border-neutral-100 p-4"
              >
                <div className="h-4 w-20 l bg-neutral-200 animate-pulse" />
                <div className="h-10 w-full bg-neutral-200 animate-pulse" />
              </div>
            ))}
          </div>

          {/* CARDS */}
          <div className="space-y-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="flex gap-4  border border-neutral-200 bg-white p-4 shadow-sm"
              >
                <div className="h-40 w-40 shrink-0  bg-neutral-200 animate-pulse" />
                <div className="flex-1 space-y-3 py-1">
                  <div className="h-4 w-24 l bg-neutral-200 animate-pulse" />
                  <div className="h-8 w-3/4 bg-neutral-200 animate-pulse" />
                  <div className="h-4 w-full l bg-neutral-200 animate-pulse" />
                  <div className="h-4 w-5/6 l bg-neutral-200 animate-pulse" />
                  <div className="h-4 w-1/3 l bg-neutral-200 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
};

export default RootLoading;