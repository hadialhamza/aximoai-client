import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div>
      <Link to="/" className="flex items-center gap-2">
        <span className="font-poppins font-bold text-[23px] text-slate-800 dark:text-slate-100">
          ModelMatrix
          <span className="text-emerald-500 dark:text-emerald-400"> AI</span>
        </span>
      </Link>
    </div>
  );
};

export default Logo;
