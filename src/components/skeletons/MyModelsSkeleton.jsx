const MyModelsSkeleton = () => {
  return (
    <div className="bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-4 md:p-6 shadow-xl dark:shadow-emerald-900/25 overflow-x-auto">
      <table className="min-w-full text-sm text-left align-middle">
        <thead>
          <tr className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 border-b border-slate-200/80 dark:border-slate-800/80">
            <th className="py-3 pr-3 font-medium">Model</th>
            <th className="py-3 pr-3 font-medium">Framework</th>
            <th className="py-3 pr-3 font-medium">Use Case</th>
            <th className="py-3 pr-3 font-medium hidden md:table-cell">
              Dataset
            </th>
            <th className="py-3 pr-3 font-medium hidden md:table-cell">
              Added On
            </th>
            <th className="py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/60">
          {Array.from({ length: 5 }).map((_, idx) => (
            <tr key={idx}>
              <td className="py-3 pr-3">
                <div className="flex items-center gap-3">
                  <div className="hidden sm:block w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse shrink-0" />
                  <div className="space-y-2 w-full max-w-[150px]">
                    <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                    <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                  </div>
                </div>
              </td>
              <td className="py-3 pr-3">
                <div className="flex items-center gap-2">
                  <div className="h-3.5 w-3.5 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
                  <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                </div>
              </td>
              <td className="py-3 pr-3">
                <div className="flex items-center gap-2">
                  <div className="h-3.5 w-3.5 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
                  <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                </div>
              </td>
              <td className="py-3 pr-3 hidden md:table-cell">
                <div className="flex items-center gap-2">
                  <div className="h-3.5 w-3.5 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
                  <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                </div>
              </td>
              <td className="py-3 pr-3 hidden md:table-cell">
                <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              </td>
              <td className="py-3 pl-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <div className="h-7 w-20 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
                  <div className="h-7 w-20 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyModelsSkeleton;
