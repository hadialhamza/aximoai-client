import React from "react";
import { Link } from "react-router";
import { UserPlus, LogIn } from "lucide-react";
import Container from "@/components/ui/container/Container";
import SectionHeading from "@/components/ui/sectionHeading/SectionHeading";
import MyBtn from "@/components/ui/buttons/MyBtn";

const GetStarted = () => {
  return (
    <section className="mb-20">
      <Container>
        <div className="bg-white/95 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 shadow-[0_1px_15px_rgba(0,0,0,0.15)] dark:shadow-2xl dark:shadow-black/30 p-5 md:p-6 lg:p-8 rounded-2xl">
          <div className="flex flex-col gap-4 md:gap-8 lg:gap-4 lg:flex-row lg:items-end md:justify-between">
            <div className="lg:w-2/3">
              <SectionHeading
                badge="Get Started"
                title={
                  <>
                    Get Started with{" "}
                    <span className="text-primary">AximoAI</span>
                  </>
                }
                description="Create an account or log in to begin adding, exploring and purchasing AI models. Your dashboard keeps everything organized—frameworks, datasets, use cases, and history."
                align="left"
                className="items-start text-left mx-0"
              />
            </div>
            <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
              <Link to="/register">
                <MyBtn variant="primary" icon={UserPlus}>
                  Create an account
                </MyBtn>
              </Link>
              <Link to="/login">
                <MyBtn variant="outline" icon={LogIn}>
                  Log in
                </MyBtn>
              </Link>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Centralized Catalog",
                subtitle: "All models, one place",
                desc: "Store model name, framework, use case, dataset, description, creator, and created date. Search and filter without hunting across repos.",
                points: [
                  "Framework & use-case filters",
                  "Consistent metadata",
                  "Faster discovery",
                ],
              },
              {
                title: "Team-ready",
                subtitle: "Share & reuse safely",
                desc: "Track ownership and popularity via purchases. Know what’s proven before adopting it in production.",
                points: [
                  "“My Models” & “My Purchases” pages",
                  "Purchase counts for trust",
                  "Clear creator attribution",
                ],
              },
              {
                title: "Simple & Practical",
                subtitle: "Built for assignments",
                desc: "Clean UI, straightforward APIs, Firebase auth, and MongoDB—everything required for your coursework.",
                points: [
                  "Register / Login flow",
                  "Add / Browse / Purchase models",
                  "Recent models on homepage",
                ],
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition dark:border-slate-800 dark:bg-slate-900/50 hover:border-primary/30 dark:hover:border-primary/30"
              >
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                  {card.title}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {card.subtitle}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {card.desc}
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                  {card.points.map((pt, i) => (
                    <li key={i}>• {pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 3 Steps Section */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              3 Simple Steps
            </p>
            <div className="mt-4 grid gap-5 md:grid-cols-3">
              {[
                {
                  step: 1,
                  title: "Register or log in",
                  desc: "Create your account or access your workspace using email auth (Firebase).",
                },
                {
                  step: 2,
                  title: "Add or explore models",
                  desc: "Publish your own models or browse existing ones by framework, dataset, and use case.",
                },
                {
                  step: 3,
                  title: "Purchase & manage",
                  desc: "Purchase models you like and track them under “My Purchases”—popularity increases automatically.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/20">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "No credit card required",
                "Educational project friendly",
                "Clean, minimal UI",
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                q: "Do I need an account to browse models?",
                a: "You can view public lists, but you’ll need to register/login to add models or purchase them, and to access “My Models” & “My Purchases”.",
              },
              {
                q: "What information is required to add a model?",
                a: "Name, framework, use case, dataset, a short description, preview image URL, and your email. The created date is stored automatically.",
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 open:border-primary/30 dark:open:border-primary/30 transition-colors"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {faq.q}
                  </span>
                  <span className="ml-3 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600 transition group-open:bg-primary/10 group-open:text-primary group-open:border-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                    Toggle
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          {/* Final CTA */}
          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-6 shadow-sm lg:flex-row lg:items-center">
            <div>
              <p className="text-lg font-semibold text-primary/90 dark:text-primary">
                Ready to manage your AI models the clean way?
              </p>
              <p className="text-sm text-primary/80 dark:text-primary/70">
                Register or log in to start adding, exploring and purchasing
                models in minutes.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/register">
                <MyBtn variant="primary" icon={UserPlus}>
                  Create an account
                </MyBtn>
              </Link>
              <Link to="/login">
                <MyBtn
                  variant="outline"
                  icon={LogIn}
                  className="bg-white dark:bg-slate-900"
                >
                  Log in
                </MyBtn>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GetStarted;
