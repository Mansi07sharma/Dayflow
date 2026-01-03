import React, { useState } from "react";

export function Tabs({ defaultValue, children, className = "" }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
}

export function TabsList({ children, className = "" }) {
  return <div className={`flex gap-2 ${className}`}>{children}</div>;
}

export function TabsTrigger({ value, children, activeTab, setActiveTab, className = "" }) {
  const isActive = activeTab === value;

  return (
    <button
      className={`${className} ${isActive ? "bg-secondary border-b-2 border-primary" : "border-b-2 border-transparent"} flex items-center gap-2 px-4 py-2 rounded-t-lg`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, activeTab, children, className = "" }) {
  return activeTab === value ? <div className={className}>{children}</div> : null;
}
