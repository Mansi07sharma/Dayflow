export default function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg px-10 py-2
      bg-slate-900 border border-slate-800
      text-white placeholder-slate-400
      focus:outline-none focus:border-cyan-500
      ${className}`}
    />
  );
}
