import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import Logo from "../logo/Logo";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import ProfileDropdown from "./ProfileDropdown";
import MobileMenu from "./MobileMenu";
import Container from "@/components/ui/container/Container";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleSetMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/90 dark:bg-background/90 shadow-md backdrop-blur-xs border-b border-border py-2.5">
      <Container className={"flex items-center justify-between"}>
        {/* Logo */}
        <div className="shrink-0 flex-1 ">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <div className=" hidden md:block">
          <NavLinks
            user={user}
            className="flex flex-wrap items-center justify-center"
          />
        </div>

        {/* Right Side Actions */}
        <div className=" flex-1 flex items-center justify-end gap-3">
          {/* Theme Toggle */}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          {/* Auth Status */}
          {loading ? (
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse border border-slate-300/50 dark:border-slate-700/50" />
          ) : user ? (
            <ProfileDropdown user={user} logout={logout} />
          ) : (
            <div className="hidden md:block">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white transition-all bg-emerald-500 rounded-full hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-lg shadow-emerald-500/30"
              >
                Login
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={handleSetMenu}
            className="md:hidden ml-1 p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open menu"
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </Container>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        user={user}
        logout={logout}
      />
    </nav>
  );
};

export default Navbar;
