import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div>
      <Link to="/" className="flex items-center gap-2">
        {/* <div className="grid grid-cols-3 gap-0.5">
          <span className="w-2 h-2 rounded-sm bg-indigo-800"></span>
          <span className="w-2 h-2 rounded-sm bg-indigo-700"></span>
          <span className="w-2 h-2 rounded-sm bg-indigo-600"></span>
          <span className="w-2 h-2 rounded-sm bg-indigo-700"></span>
          <span className="w-2 h-2 rounded-sm bg-emerald-400"></span>
          <span className="w-2 h-2 rounded-sm bg-indigo-500"></span>
          <span className="w-2 h-2 rounded-sm bg-indigo-600"></span>
          <span className="w-2 h-2 rounded-sm bg-indigo-500"></span>
          <span className="w-2 h-2 rounded-sm bg-indigo-500"></span>
        </div> */}
        <span className="font-poppins font-bold text-[23px] text-slate-700">
          ModelMatrix<span className="text-emerald-400"> AI</span>
        </span>
      </Link>
    </div>
  );
};

export default Logo;
