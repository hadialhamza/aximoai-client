import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";
import {
  User,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Bell,
  Search,
  Settings,
  Menu,
  CreditCard,
  HelpCircle,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useSecureAxios from "@/hooks/useSecureAxios";
import ThemeToggle from "../shared/navbar/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

const TopNavbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const axiosSecure = useSecureAxios();
  const [role, setRole] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        setRole(res.data?.role);
      });
    }
  }, [user, axiosSecure]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Helper: Generate Breadcrumbs from path
  const getBreadcrumbs = () => {
    const path = location.pathname.split("/").filter((x) => x);
    return path.map((segment, index) => (
      <span key={index} className="flex items-center">
        <span className="capitalize text-muted-foreground/60">
          {segment.replace("-", " ")}
        </span>
        {index < path.length - 1 && (
          <span className="mx-2 text-muted-foreground/40">/</span>
        )}
      </span>
    ));
  };

  // Helper: Get Initials
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <header className="h-16 bg-white/80 dark:bg-base-100/80 backdrop-blur-md border-b border-border sticky top-0 z-40 transition-all duration-300">
      <div className="h-full px-4 md:px-8 flex items-center justify-between">
        {/* Left: Mobile Menu & Breadcrumbs */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Trigger (Optional if you have a sidebar) */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-base-200 rounded-lg text-muted transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumbs (Hidden on very small screens) */}
          <div className="hidden md:flex items-center text-sm font-medium">
            <span className="text-muted-foreground/40 mr-2">Pages</span>
            <span className="mx-2 text-muted-foreground/40">/</span>
            {getBreadcrumbs().length > 0 ? getBreadcrumbs() : "Dashboard"}
          </div>
        </div>

        {/* Right: Actions & User */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Global Search Trigger */}
          <button className="p-2 text-muted hover:text-primary hover:bg-primary/10 rounded-full transition-colors relative group">
            <Search className="w-5 h-5" />
            <span className="absolute top-10 right-0 bg-base-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Search (Cmd+K)
            </span>
          </button>

          {/* Notifications */}
          <button className="p-2 text-muted hover:text-primary hover:bg-primary/10 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-white dark:border-base-100"></span>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          {/* Vertical Separator */}
          <div className="h-8 w-px bg-border mx-1"></div>

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-3 pl-2 pr-1 py-1 rounded-full border border-transparent hover:border-border hover:bg-base-200/50 transition-all duration-200 ${
                isOpen ? "bg-base-200/50 border-border" : ""
              }`}
            >
              {/* User Info (Desktop) */}
              <div className="text-right hidden md:block leading-tight mr-1">
                <p className="text-sm font-semibold text-foreground">
                  {user?.displayName?.split(" ")[0]}
                </p>
                <p className="text-[10px] uppercase font-bold tracking-wider text-muted">
                  {/* Dynamic Role or Default */}
                  {role || "User"}
                </p>
              </div>

              {/* Avatar */}
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-primary text-primary-content flex items-center justify-center overflow-hidden border-2 border-white dark:border-base-300 shadow-sm">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user?.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-bold">
                      {getInitials(user?.displayName)}
                    </span>
                  )}
                </div>
                {/* Online Status Dot */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-base-100 rounded-full"></span>
              </div>

              <ChevronDown
                className={`w-4 h-4 text-muted transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-base-100 rounded-2xl shadow-xl border border-border/60 py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50 overflow-hidden ring-1 ring-black/5">
                {/* Mobile User Header inside Dropdown */}
                <div className="px-5 py-3 border-b border-border md:hidden bg-base-200/30">
                  <p className="text-sm font-semibold text-foreground">
                    {user?.displayName}
                  </p>
                  <p className="text-xs text-muted truncate">{user?.email}</p>
                </div>

                {/* Menu Items */}
                <div className="p-2 space-y-1">
                  <DropdownItem
                    to="/dashboard"
                    icon={LayoutDashboard}
                    label="Dashboard"
                    onClick={() => setIsOpen(false)}
                  />
                  <DropdownItem
                    to="/dashboard/profile"
                    icon={User}
                    label="My Profile"
                    onClick={() => setIsOpen(false)}
                  />
                  <DropdownItem
                    to="/dashboard/billing"
                    icon={CreditCard}
                    label="Billing"
                    onClick={() => setIsOpen(false)}
                  />
                  <DropdownItem
                    to="/dashboard/settings"
                    icon={Settings}
                    label="Settings"
                    onClick={() => setIsOpen(false)}
                  />
                </div>

                <div className="border-t border-border mx-2 my-1"></div>

                <div className="p-2">
                  <DropdownItem
                    to="/help"
                    icon={HelpCircle}
                    label="Help Center"
                    onClick={() => setIsOpen(false)}
                  />
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-error hover:bg-error/10 rounded-xl transition-colors group"
                  >
                    <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Helper Component for consistent dropdown items
const DropdownItem = ({ to, icon: Icon, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-all group"
  >
    <Icon className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
    {label}
  </Link>
);

export default TopNavbar;
