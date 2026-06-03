const BlogLoading = () => {
  return (
    <div className="min-h-[90vh] bg-[#F7F3EA] px-4 py-6 md:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row">
        <div className="w-full lg:w-[65%] space-y-6">
          <div className="space-y-4  border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="h-4 w-28 l bg-neutral-200 animate-pulse" />
            <div className="h-10 w-4/5 bg-neutral-200 animate-pulse" />
            <div className="h-88 w-full  bg-neutral-200 animate-pulse" />
            <div className="flex flex-wrap gap-2 pt-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-6 w-20 l bg-neutral-200 animate-pulse" />
              ))}
            </div>
          </div>

          <div className="space-y-4  border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="h-24 w-full  bg-neutral-200 animate-pulse" />
            <div className="space-y-3">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="h-4 w-full l bg-neutral-200 animate-pulse" />
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-[35%] space-y-6">
          <div className=" border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="h-6 w-32 l bg-neutral-200 animate-pulse" />
            <div className="mt-5 space-y-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex gap-3  border border-neutral-100 p-3">
                  <div className="h-20 w-20 shrink-0 bg-neutral-200 animate-pulse" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-4/5 l bg-neutral-200 animate-pulse" />
                    <div className="h-3 w-3/5 l bg-neutral-200 animate-pulse" />
                    <div className="h-3 w-1/2 l bg-neutral-200 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogLoading;
