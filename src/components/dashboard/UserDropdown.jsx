import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import {
  User,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Settings,
  Shield,
  Bell,
  CreditCard,
  HelpCircle,
} from "lucide-react";

const UserDropdown = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      badge: null,
    },
    {
      label: "Profile",
      icon: User,
      path: "/dashboard/profile",
      badge: null,
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
      badge: null,
    },
    {
      label: "Billing",
      icon: CreditCard,
      path: "/dashboard/billing",
      badge: "Pro",
    },
    {
      label: "Notifications",
      icon: Bell,
      path: "/dashboard/notifications",
      badge: "3",
    },
    {
      label: "Security",
      icon: Shield,
      path: "/dashboard/security",
      badge: null,
    },
    {
      label: "Help & Support",
      icon: HelpCircle,
      path: "/help",
      badge: null,
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-base-200/80 dark:hover:bg-base-300 transition-all duration-200 active:scale-95 group"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        {/* Desktop User Info */}
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
            {user?.displayName || "Guest"}
          </p>
          <p className="text-xs text-muted group-hover:text-primary/80 transition-colors">
            {user?.email ? "User" : "Not signed in"}
          </p>
        </div>

        {/* Avatar */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-border dark:border-primary/20 flex items-center justify-center overflow-hidden group-hover:border-primary/40 transition-colors">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user?.displayName || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200">
                <User className="w-5 h-5 text-primary" />
              </div>
            )}
          </div>

          {/* Online Status Indicator */}
          {user && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-success border-2 border-background"></div>
          )}
        </div>

        {/* Chevron Icon */}
        <ChevronDown
          className={`w-4 h-4 text-muted group-hover:text-primary transition-all duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-2 w-64 bg-base-100 dark:bg-base-200 rounded-xl shadow-lg border border-border dark:border-base-300 overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50 ${
          isOpen ? "block" : "hidden"
        }`}
        role="menu"
      >
        {/* Header - Mobile only */}
        <div className="px-4 py-3 border-b border-border dark:border-base-300 md:hidden bg-gradient-to-r from-primary/5 to-transparent">
          <p className="text-sm font-semibold text-foreground truncate">
            {user?.displayName || "Guest"}
          </p>
          <p className="text-xs text-muted truncate">
            {user?.email || "Sign in to access features"}
          </p>
        </div>

        {/* User Info - Desktop */}
        <div className="hidden md:block px-4 py-3 border-b border-border dark:border-base-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user?.displayName || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-primary" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {user?.displayName || "Guest User"}
              </p>
              <p className="text-xs text-muted truncate">
                {user?.email || "Not signed in"}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2 max-h-64 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground/90 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-200 group/item"
                role="menuitem"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-base-200 dark:bg-base-300 flex items-center justify-center group-hover/item:bg-primary/10 transition-colors">
                    <Icon className="w-4 h-4 text-muted group-hover/item:text-primary transition-colors" />
                  </div>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      item.badge === "Pro"
                        ? "bg-gradient-to-r from-primary to-emerald-500 text-primary-content font-medium"
                        : "bg-error/10 text-error"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Logout/Sign In Section */}
        <div className="border-t border-border dark:border-base-300 p-2">
          {user ? (
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error/10 rounded-lg transition-all duration-200 group/btn"
              role="menuitem"
            >
              <div className="w-8 h-8 rounded-lg bg-error/10 flex items-center justify-center">
                <LogOut className="w-4 h-4 text-error" />
              </div>
              <span className="font-medium">Sign Out</span>
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm bg-gradient-to-r from-primary to-primary/90 text-primary-content hover:from-primary/90 hover:to-primary rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow"
              role="menuitem"
            >
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <LogOut className="w-4 h-4 text-white" />
              </div>
              <span>Sign In</span>
            </Link>
          )}
        </div>

        {/* Version/Footer */}
        <div className="px-4 py-2 border-t border-border dark:border-base-300">
          <p className="text-xs text-center text-muted/60">
            v1.0.0 • {user ? "Connected" : "Guest mode"}
          </p>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: var(--color-muted) transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: var(--color-muted);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: var(--color-primary);
        }
      `}</style>
    </div>
  );
};

export default UserDropdown;
