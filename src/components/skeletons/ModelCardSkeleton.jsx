const ModelCardSkeleton = () => {
  return (
    <div className="bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full">
      {/* Image Skeleton */}
      <div className="relative h-40 bg-slate-200 dark:bg-slate-800 animate-pulse" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-4 flex-1 flex flex-col">
        {/* Title Row */}
        <div className="flex items-center justify-between gap-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3 animate-pulse" />
        </div>

        {/* Details Rows (Framework, UseCase, Dataset) */}
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-3.5 w-3.5 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2 animate-pulse" />
            </div>
          ))}
        </div>

        {/* Description Lines */}
        <div className="space-y-1.5 pt-1">
          <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded w-full animate-pulse" />
          <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded w-full animate-pulse" />
          <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded w-3/4 animate-pulse" />
        </div>

        {/* Footer Row (Date + Button) */}
        <div className="pt-3 flex items-center justify-between mt-auto">
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/4 animate-pulse" />
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/4 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ModelCardSkeleton;
