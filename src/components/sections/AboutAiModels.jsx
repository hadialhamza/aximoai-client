import React from "react";
import { Link } from "react-router";

const AboutAiModels = () => {
  return (
    <section className="section-container">
      <div className="bg-white/95 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 shadow-[0_1px_15px_rgba(0,0,0,0.15)] p-5 md:p-6 lg:p-8 rounded-2xl">
        <span className="small-title">- About AI Models -</span>
        <h2 className="section-title">
          About{" "}
          <span className="text-emerald-700 dark:text-emerald-400">
            AI Models
          </span>
        </h2>
        <div className="flex flex-col gap-6 md:gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex-1 space-y-4">
            <p className="section-subtitle text-slate-700 dark:text-slate-300">
              AI models are reusable intelligence blocks that learn patterns
              from data to classify, detect, generate, and forecast. From{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                NLP
              </span>{" "}
              and{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                Computer Vision
              </span>{" "}
              to{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                Time Series
              </span>
              , each model is trained on specific datasets and optimized for a
              particular use case.
            </p>
            <p className="section-subtitle text-slate-700 dark:text-slate-300">
              In{" "}
              <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                AximoAI
              </span>
              , every model is stored with consistent metadata—framework, use
              case, dataset, creator, and created date—making discovery and
              reuse easier across teams and projects.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-200 dark:border-emerald-700/70 bg-emerald-50 dark:bg-emerald-950/40 p-4 shadow-sm hover:shadow-md transition">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-800 dark:text-emerald-200">
                  Why AI models matter
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-emerald-900 dark:text-emerald-100">
                  <li>• Automate decisions and predictions</li>
                  <li>• Reduce manual effort and human error</li>
                  <li>• Reuse proven intelligence across products</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-emerald-200 dark:border-emerald-700/70 bg-emerald-50 dark:bg-emerald-950/40 p-4 shadow-sm hover:shadow-md transition">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-800 dark:text-emerald-200">
                  How AximoAI helps
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-emerald-900 dark:text-emerald-100">
                  <li>• Centralized catalog with rich metadata</li>
                  <li>• Filter by framework, use case & dataset</li>
                  <li>• Popularity via purchase counts</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative rounded-3xl border border-emerald-200 dark:border-emerald-700/70 bg-linear-to-br from-emerald-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-950 dark:to-emerald-950/20 p-6 shadow-[0_18px_50px_rgba(16,185,129,0.12)]">
              <div className="pointer-events-none absolute -top-10 right-[-30px] h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />

              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-800 dark:text-emerald-300">
                Model overview
              </p>

              <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-50">
                A structured view of your AI assets
              </h3>

              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                Each model entry in AximoAI contains:
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-800 dark:text-slate-200">
                <li>• Name & short description</li>
                <li>• Framework, use case & dataset</li>
                <li>• Creator email & created date</li>
                <li>• Purchase count for popularity signals</li>
              </ul>

              <div className="mt-5 flex items-center justify-between gap-3 text-xs">
                <div>
                  <p className="uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Frameworks
                  </p>
                  <p className="text-slate-800 dark:text-slate-200">
                    TensorFlow · PyTorch · Keras
                  </p>
                </div>
                <div className="rounded-full border border-emerald-200 dark:border-emerald-700/70 bg-white dark:bg-slate-950 px-3 py-2 text-center">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                    Use cases
                  </p>
                  <p className="text-slate-800 dark:text-slate-200">
                    NLP · Vision · Forecasting
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-emerald-200 dark:border-emerald-800 pt-3 text-[11px] text-slate-600 dark:text-slate-400">
                This is a{" "}
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  static section
                </span>{" "}
                to explain what AI models are and how they are managed in our
                application.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm hover:shadow-md transition">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              Quick Glossary
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  Framework:
                </span>{" "}
                The toolkit used to build/train (e.g., PyTorch).
              </li>
              <li>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  Use Case:
                </span>{" "}
                The problem category (e.g., NLP).
              </li>
              <li>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  Dataset:
                </span>{" "}
                The data used for training (e.g., COCO).
              </li>
              <li>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  Purchase:
                </span>{" "}
                A signal of trust/popularity in the app.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm hover:shadow-md transition">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              Model Lifecycle in App
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-300">
              <li>Add model with metadata & preview image.</li>
              <li>Model appears in All Models & Recent Models.</li>
              <li>Users filter by framework/use case & view details.</li>
              <li>Purchases increase popularity count.</li>
              <li>
                Creators see items under “My Models”; buyers under “My
                Purchases”.
              </li>
            </ol>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm hover:shadow-md transition">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              Why not ad-hoc files?
            </p>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
              Scattered notebooks and scripts lack structure. AximoAI
              centralizes metadata, improves searchability, and encourages reuse
              of proven models.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-1 text-slate-700 dark:text-slate-300">
                Consistent metadata
              </span>
              <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-1 text-slate-700 dark:text-slate-300">
                Faster discovery
              </span>
              <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-1 text-slate-700 dark:text-slate-300">
                Popularity signals
              </span>
            </div>
            <div className="mt-5">
              <Link
                to="/models"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-500"
              >
                Browse Models
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-5 py-4 text-sm text-slate-700 dark:text-slate-300">
          Tips: If you want to learn more about AI models, login to our website
          and check out the pages.
        </div>
      </div>
    </section>
  );
};

export default AboutAiModels;
