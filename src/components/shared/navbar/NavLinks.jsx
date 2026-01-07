import { NavLink } from "react-router";
import { Home, Box, LayoutDashboard, Info, Mail } from "lucide-react";

const NavLinks = ({ user, className, onLinkClick }) => {
  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/models", label: "Models", icon: Box },
    { href: "/about", label: "About", icon: Info },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  if (user) {
    links.push({
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    });
  }

  const handleClick = () => {
    if (onLinkClick) onLinkClick();
  };

  return (
    <div className={className}>
      {links.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          onClick={handleClick}
          className={({ isActive }) =>
            `group relative flex items-center gap-2 md:gap-1 px-4 md:px-2 py-3 md:py-0 text-sm font-light transition-transform duration-300 ${
              isActive
                ? "text-primary font-medium"
                : "text-foreground/80 hover:text-primary hover:font-medium"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span className="relative flex items-center justify-center">
                <link.icon
                  className={`transition-all duration-300 ease-out ${
                    isActive
                      ? "w-4 opacity-100 translate-x-0"
                      : "w-0 opacity-0 -translate-x-2 group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0"
                  }`}
                  strokeWidth={2.5}
                />
              </span>
              <span>{link.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
