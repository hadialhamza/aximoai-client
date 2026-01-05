import { Link } from "react-router";
import { User, X } from "lucide-react";
import Logo from "../logo/Logo";
import NavLinks from "./NavLinks";

const MobileMenu = ({ isOpen, onClose, user, logout }) => {
  return (
    <>
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/50 md:hidden min-h-screen"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 w-70 min-h-screen bg-background border-r border-border shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full p-5">
          <div className="relative w-full">
            <Logo />
            <button
              onClick={onClose}
              className="absolute -top-2 -right-2 p-1 rounded-full bg-muted/15"
            >
              <X className="h-5 w-5 text-foreground" strokeWidth={2.5} />
            </button>
          </div>

          <div className="mt-20">
            {user && (
              <div className="flex items-center gap-3 mb-4">
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
            )}

            <NavLinks
              user={user}
              className="flex flex-col gap-2 mb-3"
              onLinkClick={onClose}
            />

            {user ? (
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 transition-all"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={onClose}
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

export default MobileMenu;
