import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label,
  icon: Icon,
  type = "text",
  className = "",
  placeholder,
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-medium text-slate-800 dark:text-slate-200"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <span className="absolute inset-y-0 left-3 flex items-center">
            <Icon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </span>
        )}
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          className={`w-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-primary/80 transition-all ${
            Icon ? "pl-10" : "pl-3"
          } ${isPassword ? "pr-10" : "pr-3"}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
