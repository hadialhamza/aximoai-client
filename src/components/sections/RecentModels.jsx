import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxios from "@/hooks/useAxios";
import RecentModelCard from "@/components/ui/cards/RecentModelCard";

const RecentModels = () => {
  const api = useAxios();
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useState([]);

  useEffect(() => {
    setLoading(true);
    api
      .get("models/recent")
      .then((res) => {
        setModels(res?.data?.result);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [api]);

  return (
    <section>
      <div className="section-container">
        <div className="bg-white/95 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end sm:justify-between rounded-2xl shadow-[0_1px_15px_rgba(0,0,0,0.15)] p-5 md:p-6 lg:p-8">
          <div>
            <span className="inline-flex items-center rounded-full border border-emerald-400 dark:border-emerald-500 bg-emerald-100 dark:bg-emerald-950/40 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-200 mb-5">
              - Latest Models -
            </span>
            <h2 className="section-title">
              Latest{" "}
              <span className="text-emerald-700 dark:text-emerald-400">
                AI Models
              </span>
            </h2>
            <p className="section-subtitle text-slate-700 dark:text-slate-300">
              Explore the latest AI models added to AximoAI. Recently
              created models appear here automatically.
            </p>
          </div>
          <div className="md:w-1/2 text-center md:text-end">
            <Link
              to="/all-models"
              className="text-sm md:text-base lg:text-lg font-semibold rounded-full border-2 border-emerald-300 dark:border-emerald-500 bg-emerald-100 dark:bg-emerald-950/40 px-4 md:px-6 py-2 text-emerald-700 dark:text-emerald-200 hover:text-emerald-900 dark:hover:text-emerald-100 transition-colors"
            >
              View all models →
            </Link>
          </div>
        </div>

        {loading && (
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="group relative border-2 border-slate-200 dark:border-slate-800 flex w-full flex-col rounded-xl bg-white/95 dark:bg-slate-950/80 bg-clip-border shadow-lg"
              >
                <div className="skeleton relative mx-4 -mt-6 h-60 overflow-hidden rounded-xl bg-clip-border shadow-xl ">
                  <div className="skeleton h-full w-full bg-slate-200 dark:bg-slate-800 selection:bg-slate-200" />
                </div>
                <div className="p-6">
                  <div className="skeleton mb-2 h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="space-y-2 mb-3">
                    <div className="skeleton h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="skeleton h-3 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="skeleton h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="flex justify-center">
                    <div className="skeleton h-8 w-32 rounded-full bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="skeleton h-12 w-full rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && models.length > 0 && (
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {models?.map((model) => (
              <RecentModelCard key={model._id} model={model} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentModels;
