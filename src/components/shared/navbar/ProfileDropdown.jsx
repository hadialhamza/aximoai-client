import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router";
import { User, Mail, ShoppingBag } from "lucide-react";

const ProfileDropdown = ({ user, logout }) => {
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

  if (!user) return null;

  return (
    <div className="relative hidden md:block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-0.5 rounded-full transition-all duration-200 ${
          isOpen
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
      {isOpen && (
        <div className="absolute right-0 mt-3 w-72 origin-top-right rounded-2xl bg-white dark:bg-slate-950 shadow-xl ring-1 ring-black/5 dark:ring-white/10 border border-slate-100 dark:border-slate-800/80 focus:outline-none transform opacity-100 scale-100 transition-all duration-200 z-50">
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
              onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
            >
              <ShoppingBag className="h-4 w-4" /> My Purchases
            </NavLink>
          </div>

          <div className="p-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={logout}
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
  );
};

export default ProfileDropdown;
