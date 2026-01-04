import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { Mail, Menu, Sun, Moon, User, X, ShoppingBag } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import Logo from "../logo/Logo";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

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

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = () => setProfileOpen(false);
    if (profileOpen) {
      window.addEventListener("click", closeDropdown);
    }
    return () => window.removeEventListener("click", closeDropdown);
  }, [profileOpen]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleSetMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logoutUser = () => {
    logout();
  };

  const linkBase =
    "text-sm font-medium w-full md:w-auto px-4 py-2 md:px-3 md:py-1.5 rounded-full transition-all duration-300 flex items-center gap-2";
  const getLinkClass = ({ isActive }) =>
    `${linkBase} ${
      isActive
        ? "bg-emerald-50/80 text-emerald-600 border border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-400/30"
        : "text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 border border-transparent"
    }`;

  const navLinks = (
    <>
      <NavLink to="/" className={getLinkClass}>
        Home
      </NavLink>

      <NavLink to="/models" className={getLinkClass}>
        All Models
      </NavLink>
      <NavLink to="/add-model" className={getLinkClass}>
        Add Model
      </NavLink>

      {user && (
        <>
          <NavLink to="/my-models" className={getLinkClass}>
            My Models
          </NavLink>
          <NavLink to="/my-purchase" className={getLinkClass}>
            My Purchase
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <>
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="shrink-0">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-1 items-center justify-center px-8">
              <nav className="flex space-x-1">{navLinks}</nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:text-slate-400 dark:hover:text-emerald-400 dark:hover:bg-emerald-500/10 transition-all border border-transparent hover:border-emerald-200 dark:hover:border-emerald-500/20"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </button>

              {/* Auth Status */}
              {loading ? (
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse border border-slate-300/50 dark:border-slate-700/50" />
              ) : user ? (
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className={`relative p-0.5 rounded-full transition-all duration-200 ${
                      profileOpen
                        ? "ring-2 ring-emerald-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                        : "hover:ring-2 hover:ring-emerald-500/50 hover:ring-offset-1 hover:ring-offset-white dark:hover:ring-offset-slate-950"
                    }`}
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-emerald-500/20 bg-slate-100 dark:bg-slate-800">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user?.displayName || "User"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-full h-full p-2 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {/* Profile Dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-72 origin-top-right rounded-2xl bg-white dark:bg-slate-950 shadow-xl ring-1 ring-black/5 dark:ring-white/10 border border-slate-100 dark:border-slate-800/80 focus:outline-none transform opacity-100 scale-100 transition-all duration-200">
                      <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden">
                            {user?.photoURL ? (
                              <img
                                src={user.photoURL}
                                alt={user?.displayName || "User"}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="w-full h-full p-2 text-slate-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                              {user.displayName || "User"}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
                              <Mail className="h-3 w-3" /> {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2 space-y-1">
                        <NavLink
                          to="/my-models"
                          className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 text-sm rounded-xl transition-colors ${
                              isActive
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                            }`
                          }
                          onClick={() => setProfileOpen(false)}
                        >
                          <User className="h-4 w-4" /> My Models
                        </NavLink>
                        <NavLink
                          to="/my-purchase"
                          className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 text-sm rounded-xl transition-colors ${
                              isActive
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                            }`
                          }
                          onClick={() => setProfileOpen(false)}
                        >
                          <ShoppingBag className="h-4 w-4" /> My Purchases
                        </NavLink>
                      </div>

                      <div className="p-2 border-t border-slate-100 dark:border-slate-800">
                        <button
                          onClick={logoutUser}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
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
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 bottom-0 left-0 z-50 w-[280px] bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="px-5 h-16 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
            <Logo />
            <button
              onClick={() => setMenuOpen(false)}
              className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6">
            <nav className="space-y-2 flex flex-col gap-1">
              {user ? (
                <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 px-2 mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-500/20 overflow-hidden">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user?.displayName || "User"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-full h-full p-2 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {user.displayName}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  {navLinks}
                </div>
              ) : (
                <div className="flex flex-col gap-2 mb-6">{navLinks}</div>
              )}
            </nav>
          </div>

          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            {user ? (
              <button
                onClick={logoutUser}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 transition-all"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 shadow-lg shadow-emerald-500/25 transition-all"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
