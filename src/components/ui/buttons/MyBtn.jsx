import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

const MyBtn = ({
  children,
  className,
  variant = "primary", // primary | outline | ghost | danger
  size = "md", // sm | md | lg
  icon: Icon,
  iconPlacement = "right",
  isLoading = false,
  disabled,
  ...props
}) => {
  // --- 1. Base Styles ---
  const baseStyles =
    "relative inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none active:scale-95 group overflow-hidden cursor-pointer";

  // --- 2. Variants ---
  const variants = {
    primary:
      "bg-primary text-background border border-transparent shadow-lg hover:shadow-primary/30 hover:brightness-110",
    outline:
      "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white hover:border-transparent",
    ghost:
      "bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800",
    danger:
      "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-red-500/30",
    white:
      "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-sm",
  };

  // --- 3. Sizes ---
  const sizes = {
    sm: "h-9 px-4 text-xs",
    md: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-base",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Loading Spinner */}
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}

      {/* Left Icon (if not loading) */}
      {!isLoading && Icon && iconPlacement === "left" && (
        <Icon className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
      )}

      {/* Button Text */}
      <span className="relative z-10">{children}</span>

      {/* Right Icon (if not loading) */}
      {!isLoading && Icon && iconPlacement === "right" && (
        <Icon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
      )}

      {/* Optional: Shine Effect for Primary Buttons */}
      {variant === "primary" && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent z-0" />
      )}
    </button>
  );
};

export default MyBtn;
