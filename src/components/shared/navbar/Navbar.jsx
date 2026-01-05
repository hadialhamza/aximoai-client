import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Menu, X, LogIn } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import Logo from "../logo/Logo";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import ProfileDropdown from "./ProfileDropdown";
import MobileMenu from "./MobileMenu";
import Container from "@/components/ui/container/Container";
import MyBtn from "@/components/ui/buttons/MyBtn";

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
        <div className=" flex-1 flex items-center justify-end gap-2">
          {/* Theme Toggle */}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          {/* Auth Status */}
          {loading ? (
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse border border-slate-300/50 dark:border-slate-700/50" />
          ) : user ? (
            <ProfileDropdown user={user} logout={logout} />
          ) : (
            <div className="hidden md:block">
              <Link to="/login">
                <MyBtn icon={LogIn}>Login</MyBtn>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <MyBtn
            variant="ghost"
            onClick={handleSetMenu}
            className="md:hidden p-1.5 h-auto w-auto rounded-lg text-primary hover:bg-primary/10 hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            <div
              className={`transition-transform duration-300 ease-in-out ${
                menuOpen ? "rotate-90" : "rotate-0"
              }`}
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </div>
          </MyBtn>
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
