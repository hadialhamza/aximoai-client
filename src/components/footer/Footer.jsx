// src/components/layout/Footer.jsx
import React from "react";
import { Link, NavLink } from "react-router";
import SocialTooltip from "../buttons/sociallink";

const Footer = () => {
  return (
    <footer className="bg-slate-50 text-slate-800 border-t border-slate-200 dark:bg-slate-950 dark:text-slate-200 dark:border-slate-800">
      <div className="section-container px-4 py-10 md:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-400/60 dark:border-emerald-400/40">
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-300">
                  MM
                </span>
              </div>
              <div className="leading-tight">
                <p className="text-base font-semibold text-slate-900 dark:text-slate-50">
                  ModelMatrix AI
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Centralized AI model management platform
                </p>
              </div>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
              ModelMatrix AI helps you add, explore and purchase AI models with
              structured metadata like framework, use case and dataset. Built as
              part of an educational assignment to practice full-stack
              development.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Navigation
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `transition-colors hover:text-emerald-600 dark:hover:text-emerald-300 ${
                      isActive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-slate-700 dark:text-slate-300"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/models"
                  className={({ isActive }) =>
                    `transition-colors hover:text-emerald-600 dark:hover:text-emerald-300 ${
                      isActive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-slate-700 dark:text-slate-300"
                    }`
                  }
                >
                  All Models
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add-model"
                  className={({ isActive }) =>
                    `transition-colors hover:text-emerald-600 dark:hover:text-emerald-300 ${
                      isActive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-slate-700 dark:text-slate-300"
                    }`
                  }
                >
                  Add Model
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-models"
                  className={({ isActive }) =>
                    `transition-colors hover:text-emerald-600 dark:hover:text-emerald-300 ${
                      isActive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-slate-700 dark:text-slate-300"
                    }`
                  }
                >
                  My Models
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-purchase"
                  className={({ isActive }) =>
                    `transition-colors hover:text-emerald-600 dark:hover:text-emerald-300 ${
                      isActive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-slate-700 dark:text-slate-300"
                    }`
                  }
                >
                  My Purchases
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Get started
            </h3>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-md shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-400"
              >
                Create an account
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full border border-emerald-500/60 bg-slate-50 px-4 py-2 text-xs font-semibold text-emerald-700 transition-all duration-200 hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-800 dark:border-emerald-400/70 dark:bg-slate-950 dark:text-emerald-200 dark:hover:bg-slate-900 dark:hover:border-emerald-300 dark:hover:text-emerald-100"
              >
                Log in
              </Link>
            </div>

            <div className="mt-4 space-y-1 text-xs text-slate-600 dark:text-slate-400">
              <p className="font-semibold text-slate-800 dark:text-slate-300">
                Contact
              </p>
              <p>
                Email:{" "}
                <span className="text-emerald-600 dark:text-emerald-300">
                  support@modelmatrix.ai
                </span>
              </p>
              <p>Purpose: Assignment project – AI model marketplace</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-slate-500">
              Follow ModelMatrix AI
            </span>
            <SocialTooltip />
          </div>

          <div className="text-xs text-slate-500 text-left md:text-right">
            <p>
              © {new Date().getFullYear()} ModelMatrix AI. All rights reserved.
            </p>
            <p>
              This footer is designed as part of an assignment to demonstrate
              layout, routing and static sections.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
