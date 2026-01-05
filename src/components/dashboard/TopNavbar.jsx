import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import ThemeToggle from "../shared/navbar/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

const TopNavbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="h-16 bg-white dark:bg-base-100 border-b border-border flex items-center justify-end px-4 md:px-8 gap-4 sticky top-0 z-30">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      {/* User Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-base-200 transition-colors"
        >
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-foreground">
              {user?.displayName}
            </p>
            <p className="text-xs text-muted">User</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-border">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user?.displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-primary" />
            )}
          </div>
          <ChevronDown
            className={`w-4 h-4 text-muted transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-base-100 rounded-xl shadow-lg border border-border py-2 animate-in fade-in zoom-in-95 duration-200 z-50">
            <div className="px-4 py-2 border-b border-border md:hidden">
              <p className="text-sm font-medium text-foreground">
                {user?.displayName}
              </p>
              <p className="text-xs text-muted">{user?.email}</p>
            </div>

            <div className="p-1">
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard Home
              </Link>
              <Link
                to="/dashboard/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
            </div>

            <div className="border-t border-border mt-1 p-1">
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-error hover:bg-error/10 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNavbar;
