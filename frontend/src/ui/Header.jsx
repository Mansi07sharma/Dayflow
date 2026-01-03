import { Bell, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { label: "Employees", path: "/employees" },
  { label: "Attendance", path: "/attendance" },
  { label: "Time Off", path: "/time-off" },
];

const notifications = [
  { id: 1, title: "New leave request from Sarah Johnson", time: "5 min ago" },
  { id: 2, title: "Attendance report ready", time: "1 hour ago" },
  { id: 3, title: "System maintenance scheduled", time: "2 hours ago" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-8">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center">
              <Users className="h-5 w-5 text-cyan-400" />
            </div>
            <span className="text-xl font-bold text-white">HRMS</span>
          </NavLink>

          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative">

          {/* Notification */}
          <button
            onClick={() => setOpen(!open)}
            className="relative h-10 w-10 rounded-full hover:bg-slate-800 flex items-center justify-center"
          >
            <Bell className="h-5 w-5 text-slate-300" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] flex items-center justify-center text-white">
              3
            </span>
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-14 w-80 rounded-xl bg-slate-900 border border-slate-800 shadow-xl">
              <div className="p-4 border-b border-slate-800">
                <h3 className="font-semibold text-white">Notifications</h3>
              </div>

              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="p-4 hover:bg-slate-800 cursor-pointer"
                >
                  <p className="text-sm text-white">{n.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                </div>
              ))}
            </div>
          )}

          {/* Join */}
          <button className="px-4 py-1.5 rounded-full border border-slate-700 text-sm text-white hover:bg-slate-800 transition">
            Join
          </button>

          {/* Avatar */}
          <NavLink to="/profile">
            <div className="h-9 w-9 rounded-full overflow-hidden border border-slate-700 cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
                alt="profile"
                className="h-full w-full object-cover"
              />
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
}
