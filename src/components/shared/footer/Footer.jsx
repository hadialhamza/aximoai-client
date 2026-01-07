import { Link, NavLink } from "react-router";
import SocialTooltip from "@/components/ui/buttons/sociallink";
import Container from "@/components/ui/container/Container";
import MyBtn from "@/components/ui/buttons/MyBtn";
import Logo from "../logo/Logo";

const Footer = () => {
  const getNavLinkClassName = ({ isActive }) =>
    `transition-colors hover:text-primary dark:hover:text-primary ${
      isActive
        ? "text-primary dark:text-primary font-medium"
        : "text-slate-700 dark:text-slate-300"
    }`;

  return (
    <footer className="bg-slate-50 text-slate-800 border-t border-slate-200 dark:bg-slate-950 dark:text-slate-200 dark:border-slate-800">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <div className="scale-100 origin-left">
              <Logo />
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              AximoAI helps you add, explore and purchase AI models with
              structured metadata like framework, use case and dataset. Built as
              part of an educational assignment to practice full-stack
              development.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm">
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
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <NavLink to="/dashboard" className={getNavLinkClassName}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={getNavLinkClassName}>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={getNavLinkClassName}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
              Get started
            </h3>
            <div className="flex flex-col gap-2.5 text-sm mb-6">
              <Link to="/register">
                <MyBtn
                  variant="primary"
                  className="w-full justify-center text-xs py-2.5 h-auto shadow-emerald-500/20"
                >
                  Create an account
                </MyBtn>
              </Link>
              <Link to="/login">
                <MyBtn
                  variant="outline"
                  className="w-full justify-center text-xs py-2.5 h-auto text-primary border-primary/30 hover:bg-primary/5 hover:border-primary hover:text-primary"
                >
                  Log in
                </MyBtn>
              </Link>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <h4 className="font-semibold text-slate-800 dark:text-slate-300">
                Contact Support
              </h4>
              <p>
                Email:{" "}
                <a
                  href="mailto:support@aximo.ai"
                  className="text-primary hover:underline"
                >
                  support@aximo.ai
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-slate-500">
              Follow Us
            </span>
            <SocialTooltip />
          </div>

          <div className="text-xs text-slate-500 text-left md:text-right">
            <p>© {new Date().getFullYear()} AximoAI. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
