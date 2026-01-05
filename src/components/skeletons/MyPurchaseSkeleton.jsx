const MyPurchaseSkeleton = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="group bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-md dark:shadow-emerald-900/20 flex flex-col h-full"
        >
          {/* Image Skeleton */}
          <div className="relative h-40 bg-slate-200 dark:bg-slate-800 animate-pulse" />

          {/* Content Skeleton */}
          <div className="p-4 space-y-3 flex-1 flex flex-col">
            {/* Title */}
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4 animate-pulse" />

            {/* Framework & UseCase */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="h-3.5 w-3.5 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2 animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3.5 w-3.5 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-2/3 animate-pulse" />
              </div>
            </div>

            {/* User Info (Created/Purchased) */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800/70 space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-3.5 w-3.5 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3.5 w-3.5 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full animate-pulse" />
              </div>
            </div>

            {/* Footer */}
            <div className="pt-2 flex justify-between items-center mt-auto">
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/4 animate-pulse" />
              <div className="h-7 w-24 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPurchaseSkeleton;
