const RecentModelsSkeleton = () => {
  return (
    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="group relative border-2 border-slate-200 dark:border-slate-800 flex w-full flex-col rounded-xl bg-white/95 dark:bg-slate-950/80 bg-clip-border shadow-lg"
        >
          <div className="skeleton relative mx-4 -mt-6 h-60 overflow-hidden rounded-xl bg-clip-border shadow-xl ">
            <div className="skeleton h-full w-full bg-slate-200 dark:bg-slate-800 selection:bg-slate-200 animate-pulse" />
          </div>
          <div className="p-6">
            <div className="skeleton mb-2 h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
            <div className="space-y-2 mb-3">
              <div className="skeleton h-3 w-full rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
              <div className="skeleton h-3 w-4/5 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
              <div className="skeleton h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
            </div>
            <div className="flex justify-center">
              <div className="skeleton h-8 w-32 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="skeleton h-12 w-full rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentModelsSkeleton;
