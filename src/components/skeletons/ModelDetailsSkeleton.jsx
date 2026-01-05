const ModelDetailsSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Back Button Skeleton */}
      <div className="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse mb-2" />

      {/* Top Section: Image + Info */}
      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        {/* Image Skeleton */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800/80 bg-slate-200 dark:bg-slate-800 h-80 animate-pulse shadow-xl" />

        {/* Info Side Skeleton */}
        <div className="bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 md:p-6 shadow-xl flex flex-col h-full">
          {/* Title & Subtitle */}
          <div className="space-y-3 mb-6">
            <div className="h-8 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          </div>

          {/* Metadata Rows */}
          <div className="space-y-4 flex-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-5 w-5 rounded bg-slate-200 dark:bg-slate-800 animate-pulse shrink-0" />
                <div className="space-y-2 w-full">
                  <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          {/* Action Area */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/70 flex items-center justify-between gap-4">
            <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Description Skeleton */}
      <div className="bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 md:p-6 shadow-xl space-y-4">
        <div className="h-5 w-40 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ModelDetailsSkeleton;
