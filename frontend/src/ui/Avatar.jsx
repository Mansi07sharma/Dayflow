import React from "react";

export default function Avatar({ src, name, className = "" }) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "AU";

  return (
    <div
      className={`h-20 w-20 rounded-full overflow-hidden border border-slate-700 ${className}`}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-slate-800 text-white font-semibold">
          {initials}
        </div>
      )}
    </div>
  );
}
