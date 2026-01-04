import { Link } from "react-router";
import { Layers, Sparkles } from "lucide-react";

export default function Logo({ showTagline = false, className = "" }) {
  return (
    <Link
      to="/"
      aria-label="Aximo AI — AI model inventory"
      className={`block w-fit ${className}`}
    >
      <div className="inline-flex items-center gap-3 select-none">
        {/* Mark */}
        <div className="relative">
          <div className="h-10 w-10 rounded-xl dark:bg-primary/15 ring-1 ring-primary/20 dark:ring-primary/25 grid place-items-center shadow-sm dark:shadow-none">
            <div className="animate-float">
              <Layers className="h-6 w-6 text-primary" strokeWidth={2.4} />
            </div>
          </div>

          {/* AI spark */}
          <div className="absolute -right-1 -top-1 animate-pulse-scale">
            <div className="h-5 w-5 rounded-full bg-white dark:bg-primary/20 ring-1 ring-primary/30 grid place-items-center shadow-sm dark:shadow-none">
              <Sparkles className="h-3 w-3 text-primary" strokeWidth={2.6} />
            </div>
          </div>
        </div>

        <div className="leading-tight">
          <div className="flex items-baseline gap-2 font-orbitron">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              Aximo
            </span>
            <span className="text-sm font-bold text-primary">AI</span>
          </div>

          {showTagline && (
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              AI model inventory
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
