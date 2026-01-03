import React from "react";

export default function Badge({ children, variant = "primary", className = "" }) {
  let base = "inline-block px-3 py-1 rounded-full text-sm font-medium";
  let color = "";

  switch (variant) {
    case "primary":
      color = "bg-primary/20 text-primary";
      break;
    case "secondary":
      color = "bg-secondary/20 text-secondary";
      break;
    case "success":
      color = "bg-success/20 text-success";
      break;
    case "warning":
      color = "bg-warning/20 text-warning";
      break;
    default:
      color = "bg-gray-200 text-gray-800";
  }

  return <span className={`${base} ${color} ${className}`}>{children}</span>;
}
