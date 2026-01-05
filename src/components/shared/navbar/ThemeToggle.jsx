import { Moon, Sun } from "lucide-react";

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="group p-2 rounded-full text-primary hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20"
      aria-label="Toggle theme"
    >
      <div className="transition-transform duration-500 ease-in-out group-hover:rotate-360">
        {theme === "light" ? (
          <Moon className="h-5 w-5 transition-all duration-300" />
        ) : (
          <Sun className="h-5 w-5 transition-all duration-300" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
