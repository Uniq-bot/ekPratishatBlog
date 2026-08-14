import EMICalculator from "@/components/calculator/EMICalculator";
import { prisma } from "@/libs/prisma";

const Page = async () => {
  const ads = await prisma.advertisement.findMany({
    where: {
      AdType: "ASIDE",
      isAdRunning: true,
    },
  });

  return (
    <main className="min-h-screen bg-[#f6f7f9] px-4 pb-12 pt-28 sm:px-6 lg:px-10 xl:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center  bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
            PROPERTY FINANCE
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Home Loan EMI Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Estimate your monthly home loan payments, total interest,
            and total repayment based on your loan amount, interest rate,
            and tenure.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">

          {/* Calculator */}
          <section className="min-w-0">
            <EMICalculator />
          </section>

          {/* Advertisement Sidebar */}
          <aside className="space-y-5">

            {/* Advertisement heading */}
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-800">
                Sponsored
              </h2>

              <span className="text-xs text-slate-400">
                Advertisements
              </span>
            </div>

            {ads.length > 0 ? (
              ads.map((ad: any) => (
                <div
                  key={ad.id}
                  className="group overflow-hidden  bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="aspect-4/5 overflow-hidden">
                    <img
                      src={ad.AdPoster}
                      alt={ad.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  {ad.title && (
                    <div className="px-4 py-3">
                      <p className="line-clamp-2 text-sm font-medium text-slate-800">
                        {ad.title}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="flex min-h-[250px] items-center justify-center  border border-dashed border-slate-300 bg-white">
                <p className="text-sm text-slate-400">
                  Advertisement space
                </p>
              </div>
            )}

            {/* Small information card */}
            <div className=" bg-slate-900 p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Tip
              </p>

              <h3 className="mt-2 text-base font-semibold">
                Keep your EMI affordable
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                A longer loan tenure can reduce your monthly EMI, but
                it usually increases the total interest you pay.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Page;