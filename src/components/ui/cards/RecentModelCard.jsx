import React from "react";
import { MoveRight } from "lucide-react";
import { Link } from "react-router";

const RecentModelCard = ({ model }) => {
  const { _id, name, image, framework, useCase, description } = model || {};

  return (
    <div className="group relative border-2 border-slate-200 dark:border-slate-700 flex w-full flex-col rounded-xl bg-white dark:bg-slate-900 bg-clip-border text-gray-700 dark:text-slate-100 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-[0_4px_18px_rgba(0,0,0,0.25)]">
      <div className="relative mx-4 -mt-6 h-60 overflow-hidden rounded-xl bg-clip-border shadow-xl">
        <img
          src={image || "/placeholder-image.jpg"}
          alt={name || "Model image"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 via-slate-900/20 to-transparent" />
      </div>

      <div
        className="text-center absolute left-1/2 top-48 -translate-x-1/2
          rounded-full border border-emerald-400 dark:border-emerald-300 bg-emerald-500/90 dark:bg-emerald-500 px-3 py-2 text-sm font-semibold text-white
          opacity-0 shadow-lg
          transition-all duration-300 ease-out
          group-hover:-translate-y-2 group-hover:opacity-100 z-10"
      >
        {useCase || 'General'}
      </div>

      <div className="p-6">
        <h5 className="mb-2 block text-xl font-semibold leading-snug text-gray-900 dark:text-slate-100 transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
          {name || 'Untitled Model'}
        </h5>
        <p className="text-sm font-light leading-relaxed text-gray-700 dark:text-slate-300 mb-3 line-clamp-2">
          {description || 'No description available'}
        </p>

        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center rounded-full border border-emerald-300 dark:border-emerald-500/40 bg-emerald-100 dark:bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-800 dark:text-emerald-300">
            {framework || 'Unknown'} Framework
          </span>
        </div>

        <div className="pt-0">
          {_id ? (
            <Link
              to={`/models/${_id}`}
              className="group/button relative inline-flex w-full items-center justify-center rounded-full bg-emerald-500 dark:bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:shadow-emerald-500/40"
            >
              <span className="relative flex items-center gap-3">
                View Details
                <MoveRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </span>
            </Link>
          ) : (
            <button
              disabled
              className="relative inline-flex w-full items-center justify-center rounded-full bg-gray-400 px-6 py-3 text-sm font-bold text-white cursor-not-allowed"
            >
              <span className="relative flex items-center gap-3">
                View Details
                <MoveRight className="w-4 h-4" />
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentModelCard;
