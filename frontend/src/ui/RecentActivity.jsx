import {
  ArrowRightCircle,
  Calendar,
  XCircle,
} from "lucide-react";

const activities = [
  {
    id: 1,
    type: "check-in",
    name: "Sarah Johnson",
    action: "checked in",
    time: "9:00 AM",
  },
  {
    id: 2,
    type: "leave",
    name: "Michael Chen",
    action: "requested leave",
    time: "8:45 AM",
  },
  {
    id: 3,
    type: "check-in",
    name: "Emily Rodriguez",
    action: "checked in",
    time: "9:15 AM",
  },
  {
    id: 4,
    type: "absent",
    name: "David Kim",
    action: "marked absent",
    time: "9:30 AM",
  },
];

const iconMap = {
  "check-in": {
    Icon: ArrowRightCircle,
    bg: "bg-green-500/20",
    color: "text-green-400",
  },
  leave: {
    Icon: Calendar,
    bg: "bg-yellow-500/20",
    color: "text-yellow-400",
  },
  absent: {
    Icon: XCircle,
    bg: "bg-red-500/20",
    color: "text-red-400",
  },
};

export default function RecentActivity() {
  return (
    <div className="section-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <button className="text-sm text-muted-foreground hover:text-white">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((a) => {
          const { Icon, bg, color } = iconMap[a.type];

          return (
            <div
              key={a.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800 transition"
            >
              <div
                className={`h-10 w-10 flex items-center justify-center rounded-lg ${bg}`}
              >
                <Icon className={`h-5 w-5 ${color}`} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium">
                  <span className="text-white">{a.name}</span>{" "}
                  <span className="text-muted-foreground">
                    {a.action}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {a.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
