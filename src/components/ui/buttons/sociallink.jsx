import React from "react";
import { FaLinkedinIn, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";

const SocialTooltip = () => {
  return (
    <div className="flex items-center justify-center">
      <ul className="flex flex-col items-center gap-4 md:flex-row">
        {/* LinkedIn */}
        <li className="relative group">
          <a
            href="https://linkedin.com/in/hadialhamza"
            aria-label="LinkedIn"
            target="_blank"
            rel="noreferrer"
            className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white text-slate-700 shadow-md transition hover:shadow-xl"
          >
            {/* fill background */}
            <span className="absolute inset-0 translate-y-full bg-[#0274B3] transition-transform duration-300 ease-in-out group-hover:translate-y-0" />

            {/* icon */}
            <FaLinkedinIn className="relative z-10 text-[18px] text-slate-700 group-hover:text-white transition-colors duration-300" />
          </a>

          {/* tooltip */}
          <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-md bg-[#0274B3] px-3 py-1 text-xs text-white opacity-0 shadow-md transition-all duration-300 group-hover:-top-12 group-hover:opacity-100">
            LinkedIn
          </span>
        </li>

        {/* GitHub */}
        <li className="relative group">
          <a
            href="https://www.github.com/"
            aria-label="GitHub"
            target="_blank"
            rel="noreferrer"
            className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white text-slate-700 shadow-md transition hover:shadow-xl"
          >
            <span className="absolute inset-0 translate-y-full bg-[#24262A] transition-transform duration-300 ease-in-out group-hover:translate-y-0" />

            <FaGithub className="relative z-10 text-[18px] text-slate-700 group-hover:text-white transition-colors duration-300" />
          </a>

          <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-md bg-[#24262A] px-3 py-1 text-xs text-white opacity-0 shadow-md transition-all duration-300 group-hover:-top-12 group-hover:opacity-100">
            GitHub
          </span>
        </li>

        {/* Instagram */}
        <li className="relative group">
          <a
            href="https://www.instagram.com/"
            aria-label="Instagram"
            target="_blank"
            rel="noreferrer"
            className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white text-slate-700 shadow-md transition hover:shadow-xl"
          >
            <span className="absolute inset-0 translate-y-full bg-linear-to-tr from-[#405DE6] via-[#C13584] to-[#FD1F1F] transition-transform duration-300 ease-in-out group-hover:translate-y-0" />

            <FaInstagram className="relative z-10 text-[18px] text-slate-700 group-hover:text-white transition-colors duration-300" />
          </a>

          <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-md bg-linear-to-tr from-[#405DE6] via-[#C13584] to-[#FD1F1F] px-3 py-1 text-xs text-white opacity-0 shadow-md transition-all duration-300 group-hover:-top-12 group-hover:opacity-100">
            Instagram
          </span>
        </li>

        {/* YouTube */}
        <li className="relative group">
          <a
            href="https://youtube.com/"
            aria-label="YouTube"
            target="_blank"
            rel="noreferrer"
            className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white text-slate-700 shadow-md transition hover:shadow-xl"
          >
            <span className="absolute inset-0 translate-y-full bg-[#FF0000] transition-transform duration-300 ease-in-out group-hover:translate-y-0" />

            <FaYoutube className="relative z-10 text-[18px] text-slate-700 group-hover:text-white transition-colors duration-300" />
          </a>

          <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-md bg-[#FF0000] px-3 py-1 text-xs text-white opacity-0 shadow-md transition-all duration-300 group-hover:-top-12 group-hover:opacity-100">
            YouTube
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SocialTooltip;
