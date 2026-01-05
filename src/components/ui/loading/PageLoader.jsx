import React from "react";

import { motion } from "framer-motion";
import Logo from "@/components/shared/logo/Logo";

const PageLoader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50/90 dark:bg-slate-950/90 transition-colors duration-300">
      {/* Absolute Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
      </div>

      {/* Main Loader Container */}
      <div className="relative flex flex-col items-center gap-8">
        {/* Animated Rings */}
        <div className="relative flex items-center justify-center">
          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-8 rounded-full border border-dashed border-slate-300 dark:border-slate-700 opacity-40 w-48 h-48"
          />

          {/* Middle Rotating Gradient Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-t-2 border-primary border-r-2 w-full h-full opacity-80"
          />

          {/* Inner Reverse Rotating Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-b-2 border-primary/50 border-l-2 w-full h-full opacity-60"
          />

          {/* Logo Wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 p-6 bg-white/50 dark:bg-slate-900/50 rounded-full shadow-xl dark:shadow-primary/5 ring-1 ring-slate-200 dark:ring-slate-800"
          >
            <div className="pointer-events-none scale-110">
              <Logo />
            </div>
          </motion.div>
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-2 z-10"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-slate-400 dark:text-slate-500">
            System Processing
          </span>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 animate-pulse">
            {message}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PageLoader;
