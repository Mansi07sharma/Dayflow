export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg
      bg-cyan-500 text-black font-semibold
      hover:bg-cyan-400 transition ${className}`}
    >
      {children}
    </button>
  );
}
