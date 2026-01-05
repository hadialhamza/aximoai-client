import { NavLink } from "react-router";
import { Home, Box, PlusSquare, Folder, ShoppingBag } from "lucide-react";

const NavLinks = ({ user, className = "", onLinkClick }) => {
  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/models", label: "All Models", icon: Box },
    { href: "/add-model", label: "Add Model", icon: PlusSquare },
  ];

  if (user) {
    links.push(
      { href: "/my-models", label: "My Models", icon: Folder },
      { href: "/my-purchase", label: "My Purchase", icon: ShoppingBag }
    );
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
            `group relative flex items-center gap-1 px-2 py-1 text-sm rounded-xl transition-transform duration-300 hover:bg-primary/15 ${
              isActive
                ? "text-primary font-semibold bg-primary/10"
                : "text-foreground/80 hover:text-primary"
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
