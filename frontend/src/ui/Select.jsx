import React, { useState } from "react";

export function Select({ defaultValue, children }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue || "");

  const handleSelect = (val) => {
    setValue(val);
    setOpen(false);
  };

  return (
    <div className="relative inline-block w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-left flex justify-between items-center"
      >
        <span>{value || "Select..."}</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Options */}
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-slate-900 border border-border rounded-lg shadow-lg">
          {React.Children.map(children, (child) =>
            React.cloneElement(child, { onClick: () => handleSelect(child.props.value) })
          )}
        </div>
      )}
    </div>
  );
}

// SelectTrigger.js
export function SelectTrigger({ children, className }) {
  return <div className={`w-full ${className}`}>{children}</div>;
}

// SelectValue.js
export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>;
}

// SelectContent.js
export function SelectContent({ children }) {
  return <div className="flex flex-col">{children}</div>;
}

// SelectItem.js
export function SelectItem({ children, onClick, value }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer px-4 py-2 hover:bg-slate-800"
      value={value}
    >
      {children}
    </div>
  );
}
