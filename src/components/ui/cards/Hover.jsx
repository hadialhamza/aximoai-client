import React from "react";

const HoverCard = ({
  title = "Card title",
  body = "Here are the details of the card",
  buttonText = "More info",
  onClick,
}) => {
  return (
    <div className="group relative h-[254px] w-[190px] overflow-visible rounded-2xl border-2 border-slate-300 bg-slate-100 p-7 transition duration-500 ease-out hover:border-sky-500 hover:shadow-[0_4px_18px_rgba(0,0,0,0.25)]">
      {/* Card details */}
      <div className="grid h-full place-content-center gap-2 text-black">
        <p className="text-[1.5em] font-bold">{title}</p>
        <p className="text-sm text-slate-500">{body}</p>
      </div>
      {/* Button */}
      <button
        onClick={onClick}
        className="
          absolute left-1/2 bottom-0
          w-[60%] -translate-x-1/2 translate-y-[125%]
          rounded-2xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white
          opacity-0 shadow-sm
          transition-all duration-300 ease-out
          group-hover:translate-y-1/2 group-hover:opacity-100
          focus:translate-y-1/2 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
        "
      >
        {buttonText}
      </button>
    </div>
  );
};

export default HoverCard;
