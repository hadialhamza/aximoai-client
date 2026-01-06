import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Folder,
  ShoppingBag,
  PlusSquare,
  LogOut,
  Home,
  Users,
  Box,
  FileText,
  Settings,
  Shield,
  CreditCard,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useSecureAxios from "@/hooks/useSecureAxios";
import Logo from "../shared/logo/Logo";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const axiosSecure = useSecureAxios();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          setRole(res.data?.role);
        })
        .finally(() => setLoading(false));
    }
  }, [user, axiosSecure]);

  // Define Menu Groups
  const menuGroups = [
    {
      label: "Main Menu",
      items: [
        {
          href: "/dashboard",
          label: "Overview",
          icon: LayoutDashboard,
          end: true,
        },
      ],
    },
  ];

  if (role === "user") {
    menuGroups.push({
      label: "Workspace",
      items: [
        { href: "/dashboard/add-model", label: "Add Model", icon: PlusSquare },
        { href: "/dashboard/my-models", label: "My Inventory", icon: Folder },
        {
          href: "/dashboard/my-purchase",
          label: "Purchases",
          icon: ShoppingBag,
        },
      ],
    });
  }

  if (role === "admin") {
    menuGroups.push({
      label: "Administration",
      items: [
        { href: "/dashboard/all-users", label: "Manage Users", icon: Users },
        { href: "/dashboard/all-models", label: "Manage Models", icon: Box },
        { href: "/dashboard/reports", label: "System Reports", icon: FileText },
      ],
    });
  }

  // Common Links (Settings, etc.)
  menuGroups.push({
    label: "System",
    items: [{ href: "/", label: "Back to Home", icon: Home }],
  });

  if (loading) return <SidebarSkeleton />;

  /* Mobile Overlay and Sidebar Wrapper */
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-base-100 border-r border-border flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 lg:sticky lg:top-0 ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          }`}
      >
        {/* 1. Logo Area */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-border/50">
          <Logo />
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 text-muted hover:text-error hover:bg-error/10 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 rotate-180" />
          </button>
        </div>

        {/* 2. Scrollable Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto custom-scrollbar">
          {menuGroups.map((group, groupIdx) => (
            <div key={groupIdx}>
              {/* Section Label */}
              {group.label && (
                <h4 className="px-4 mb-3 text-xs font-bold text-muted uppercase tracking-wider opacity-80">
                  {group.label}
                </h4>
              )}

              {/* Links */}
              <div className="space-y-1.5">
                {group.items.map((link) => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    end={link.end}
                    onClick={() => setIsOpen(false)} // Close on link click (mobile)
                    className={({ isActive }) =>
                      `group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/25 translate-x-1"
                        : "text-foreground/70 hover:bg-base-200 hover:text-foreground"
                      }`
                    }
                  >
                    <link.icon className="w-5 h-5 shrink-0" />
                    <span className="truncate">{link.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* 3. User Profile Footer */}
        <div className="p-4 border-t border-border/50 bg-base-50/50">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-base-100 border border-border shadow-sm mb-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden border border-border">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.displayName?.charAt(0) || "U"
                )}
              </div>
              {/* Role Indicator Dot */}
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${role === "admin" ? "bg-purple-500" : "bg-emerald-500"
                  }`}
              >
                {role === "admin" ? (
                  <Shield size={8} className="text-white" />
                ) : (
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground truncate leading-tight">
                {user?.displayName || "User Name"}
              </p>
              <p className="text-xs text-muted truncate capitalize">
                {role || "Guest"} Account
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-error bg-error/5 hover:bg-error/10 border border-transparent hover:border-error/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

// 4. Skeleton Loading State
const SidebarSkeleton = () => (
  <aside className="w-72 bg-base-100 border-r border-border h-screen sticky top-0 hidden lg:flex flex-col">
    <div className="h-20 px-6 flex items-center border-b border-border/50">
      <div className="h-8 w-32 bg-base-200 rounded-lg animate-pulse"></div>
    </div>
    <div className="flex-1 p-6 space-y-8">
      {[1, 2, 3].map((section) => (
        <div key={section} className="space-y-3">
          <div className="h-3 w-20 bg-base-200 rounded animate-pulse"></div>
          <div className="space-y-2">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-10 w-full bg-base-200/60 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="p-4 border-t border-border/50">
      <div className="h-16 w-full bg-base-200 rounded-2xl animate-pulse"></div>
    </div>
  </aside>
);

export default Sidebar;
