import Container from "@/components/ui/container/Container";

const UpdateModelSkeleton = () => {
  return (
    <Container className="py-10">
      {/* Header Skeleton */}
      <div className="flex flex-col items-center gap-4 max-w-3xl mx-auto text-center mb-8">
        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
        <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
        <div className="h-5 w-2/3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
      </div>

      {/* Form Skeleton */}
      <div className="max-w-4xl mx-auto bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="space-y-6">
          {/* Row 1 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-32 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
          </div>

          {/* Button */}
          <div className="pt-4 flex justify-end">
            <div className="h-11 w-40 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UpdateModelSkeleton;
