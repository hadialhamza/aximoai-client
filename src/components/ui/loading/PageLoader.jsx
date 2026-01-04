import React from "react";

const PageLoader = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <span className="h-10 w-10 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
        <p className="text-sm text-slate-300">{message}</p>
      </div>
    </div>
  );
};

export default PageLoader;
