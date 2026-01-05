import { Link } from "react-router";
import { Cpu, Layers } from "lucide-react";

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
          <div className="h-10 w-10 rounded-xl bg-white dark:bg-primary/15 ring-2 ring-primary/30 grid place-items-center shadow-md group-hover:shadow-lg group-hover:ring-primary/50 group-hover:scale-105 transition-transform duration-300">
            <Layers
              className="h-5.5 w-5.5 text-primary group-hover:scale-110 transition-transform duration-400"
              strokeWidth={2.5}
            />
          </div>

          {/* AI spark icon*/}
          <div className="absolute -right-2 -top-2">
            <div className="relative h-6 w-6 rounded-full bg-warning/15 border border-warning/30 grid place-items-center group-hover:rotate-12 transition-transform duration-500 z-10">
              <Cpu className="h-4 w-4 text-warning/90" strokeWidth={2} />
            </div>
            <div className="absolute inset-0 rounded-full border border-warning group-hover:animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col">
          {/* Brand Name */}
          <div className="pl-1 font-heading leading-tight">
            <span className="text-2xl font-black tracking-widest text-slate-800 dark:text-slate-100 leading-0">
              aximo
              <span className="text-primary">AI</span>
            </span>
          </div>

          {/* Tagline */}
          <div className="relative overflow-hidden">
            <div className="relative bg-linear-to-br from-primary/10 via-primary/5 to-transparent px-1.5 py-1">
              <span className="absolute top-0 left-0.5 w-full h-0.5 bg-linear-to-r from-primary to-transparent " />
              <span className="absolute top-0 left-0 w-0.5 h-full bg-linear-to-b from-primary to-transparent " />
              <span className="text-xs font-title font-bold text-primary tracking-[0.0968em] block uppercase">
                AI Model Inventory
              </span>
            </div>

            {/* Animated background on hover */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Logo;
