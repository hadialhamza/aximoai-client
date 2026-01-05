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
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import Logo from "../shared/logo/Logo";

const Sidebar = () => {
  const { user, logout } = useAuth();

  const role = "user";

  const links = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  ];

  if (role === "user") {
    links.push(
      { href: "/dashboard/add-model", label: "Add Model", icon: PlusSquare },
      { href: "/dashboard/my-models", label: "My Models", icon: Folder },
      {
        href: "/dashboard/my-purchase",
        label: "My Purchase",
        icon: ShoppingBag,
      }
    );
  }

  if (role === "admin") {
    links.push(
      { href: "/dashboard/all-users", label: "All Users", icon: Users },
      { href: "/dashboard/all-models", label: "All Models", icon: Box },
      { href: "/dashboard/reports", label: "Reports", icon: FileText }
    );
  }

  return (
    <aside className="w-64 bg-base-100 border-r border-border h-screen sticky top-0 hidden lg:flex flex-col">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-content font-medium shadow-md shadow-primary/20"
                  : "text-muted hover:bg-base-200 hover:text-foreground"
              }`
            }
          >
            <link.icon className="w-5 h-5" />
            <span>{link.label}</span>
          </NavLink>
        ))}

        <div className="pt-4 mt-4 border-t border-border">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted hover:bg-base-200 hover:text-foreground transition-all duration-200"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </NavLink>
        </div>
      </nav>

      {/* User / Logout Area */}
      <div className="p-4 border-t border-border">
        <div className="px-4 py-3 mb-2 flex items-center gap-3 rounded-xl bg-base-200/50">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
            {user?.displayName?.charAt(0) || "U"}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">
              {user?.displayName || "User"}
            </p>
            <p className="text-xs text-muted truncate capitalize">{role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-error hover:bg-error/10 w-full transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
