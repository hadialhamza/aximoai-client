import { Link, NavLink } from "react-router";
import SocialTooltip from "@/components/ui/buttons/sociallink";
import Container from "@/components/ui/container/Container";
import MyBtn from "@/components/ui/buttons/MyBtn";

const Footer = () => {
  const getNavLinkClassName = ({ isActive }) =>
    `transition-colors hover:text-primary dark:hover:text-primary ${isActive
      ? "text-primary dark:text-primary"
      : "text-slate-700 dark:text-slate-300"
    }`;

  return (
    <footer className="bg-slate-50 text-slate-800 border-t border-slate-200 dark:bg-slate-950 dark:text-slate-200 dark:border-slate-800">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/40 dark:border-primary/40">
                <span className="text-sm font-bold text-primary">MM</span>
              </div>
              <div className="leading-tight">
                <p className="text-base font-semibold text-slate-900 dark:text-slate-50">
                  AximoAI
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Centralized AI model management platform
                </p>
              </div>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
              AximoAI helps you add, explore and purchase AI models with
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
                <NavLink to="/" className={getNavLinkClassName}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/models" className={getNavLinkClassName}>
                  All Models
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-model" className={getNavLinkClassName}>
                  Add Model
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-models" className={getNavLinkClassName}>
                  My Models
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-purchase" className={getNavLinkClassName}>
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
              <Link to="/register">
                <MyBtn variant="primary" className="w-full justify-center text-xs py-2 h-auto">
                  Create an account
                </MyBtn>
              </Link>
              <Link to="/login">
                <MyBtn
                  variant="outline"
                  className="w-full justify-center text-xs py-2 h-auto text-primary border-primary/60 hover:bg-primary/5 hover:border-primary hover:text-primary dark:text-primary dark:border-primary/40 dark:hover:bg-primary/10"
                >
                  Log in
                </MyBtn>
              </Link>
            </div>

            <div className="mt-4 space-y-1 text-xs text-slate-600 dark:text-slate-400">
              <p className="font-semibold text-slate-800 dark:text-slate-300">
                Contact
              </p>
              <p>
                Email:{" "}
                <span className="text-primary">support@aximo.ai</span>
              </p>
              <p>Purpose: Assignment project – AI model marketplace</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-slate-500">Follow AximoAI</span>
            <SocialTooltip />
          </div>

          <div className="text-xs text-slate-500 text-left md:text-right">
            <p>© {new Date().getFullYear()} AximoAI. All rights reserved.</p>
            <p>
              This footer is designed as part of an assignment to demonstrate
              layout, routing and static sections.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
