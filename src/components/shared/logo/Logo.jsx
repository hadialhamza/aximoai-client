import { Link } from "react-router";
import { Layers } from "lucide-react";

const Logo = () => {
  return (
    <Link
      to="/"
      aria-label="Aximo AI — AI model inventory"
      className="block w-51 group"
    >
      <div className="inline-flex items-center gap-3 select-none py-1">
        {/* Logo icon */}
        <div className="relative">
          <div className="absolute inset-0 rounded-xl border border-primary group-hover:animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 h-9.5 w-9.5 rounded-xl bg-white dark:bg-primary/15 ring-2 ring-primary/30 grid place-items-center shadow-md group-hover:shadow-lg group-hover:ring-primary/50 group-hover:scale-105 transition-transform duration-300">
            <Layers
              className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-400"
              strokeWidth={2.5}
            />
          </div>

          {/* AI spark icon*/}
          {/* <div className="absolute -right-2 -top-2">
            <div className="relative h-6 w-6 rounded-full bg-warning/15 border border-warning/30 grid place-items-center group-hover:rotate-12 transition-transform duration-500 z-10">
              <Cpu className="h-4 w-4 text-warning/90" strokeWidth={2} />
            </div>
            <div className="absolute inset-0 rounded-full border border-warning group-hover:animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div> */}
        </div>

        {/* Brand Name */}
        <div className="relative overflow-hidden">
          <div className="relative bg-linear-to-br from-primary/50 via-primary/5 to-transparent pl-2 pt-2 pb-1">
            {/* Decorative Lines */}
            <span className="absolute top-0 left-0.5 w-full h-0.5 bg-linear-to-r from-primary to-transparent " />
            <span className="absolute top-0 left-0 w-0.5 h-full bg-linear-to-b from-primary to-transparent " />

            {/* Brand Text */}
            <div className="font-heading leading-tight relative z-10">
              <span className="text-2xl font-black tracking-widest text-slate-800 dark:text-slate-100 leading-0">
                aximo
                <span className="text-primary">AI</span>
              </span>
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1s_infinite] bg-linear-to-r from-transparent via-primary/40 dark:via-white/30 to-transparent z-0" />
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Logo;
