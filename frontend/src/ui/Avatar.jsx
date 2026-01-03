export function Avatar({ src, name }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="h-20 w-20 rounded-full overflow-hidden border border-slate-700 mx-auto mb-4">
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
