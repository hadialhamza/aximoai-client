import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/utils/cn";

const Input = ({
  label,
  icon: Icon,
  type = "text",
  className = "",
  placeholder,
  id,
  multiline = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isFile = type === "file";
  const isPassword = type === "password" && !multiline;
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const Component = multiline ? "textarea" : "input";

  const defaultBaseClasses = `w-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-primary/80 transition-all ${
    Icon ? "pl-10" : "pl-3"
  } ${isPassword ? "pr-10" : "pr-3"} ${multiline ? "resize-none" : ""}`;

  const fileInputClasses = cn(
    "block w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all",
    Icon ? "pl-10" : ""
  );

  return (
    <div className={`${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-medium text-slate-800 dark:text-slate-200 mb-1 block"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <span
            className={
              multiline
                ? "absolute top-3.5 left-3 text-slate-400 dark:text-slate-500"
                : "absolute inset-y-0 left-3 flex items-center pointer-events-none z-10"
            }
          >
            <Icon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </span>
        )}
        <Component
          id={id}
          type={!multiline ? inputType : undefined}
          placeholder={placeholder}
          className={isFile ? fileInputClasses : defaultBaseClasses}
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
