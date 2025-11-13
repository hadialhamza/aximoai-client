import React from "react";
import { Link, useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Bot, AlertTriangle, Home } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl w-full bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-8 shadow-xl dark:shadow-2xl dark:shadow-emerald-900/40 text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-900/90 border border-emerald-500/50 flex items-center justify-center">
              <Bot className="h-9 w-9 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-2xl bg-amber-400/10 dark:bg-amber-500/10 border border-amber-400/70 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-amber-500 dark:text-amber-400" />
            </div>
          </div>
        </div>

        <p className="text-xs tracking-[0.2em] uppercase text-emerald-600 dark:text-emerald-300 mb-2">
          404 – Model not found
        </p>

        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50 mb-3">
          Oops! This AI model doesn&apos;t exist.
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          The model you&apos;re looking for may have been removed, renamed, or
          never existed in the ModelMatrix AI inventory. Let&apos;s get you back
          to a known universe.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-emerald-500 to-emerald-400 text-slate-950 text-sm font-medium px-5 py-2.5 shadow-lg shadow-emerald-900/40 hover:from-emerald-400 hover:to-emerald-300 transition-all"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </button>

          <Link
            to="/models"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700/80 px-5 py-2.5 text-sm text-slate-800 dark:text-slate-200 hover:border-emerald-400/70 hover:text-emerald-700 dark:hover:text-emerald-200 transition-all"
          >
            Browse models
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
