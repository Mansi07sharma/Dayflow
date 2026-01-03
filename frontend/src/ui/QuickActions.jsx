import { Users, Calendar, CalendarDays } from "lucide-react";

const actions = [
  { icon: Users, title: "Manage Employees", description: "View employee records" },
  { icon: Calendar, title: "Track Attendance", description: "Monitor attendance" },
  { icon: CalendarDays, title: "Manage Leave", description: "Handle leave requests" },
];

export default function QuickActions() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {actions.map((a, i) => (
        <div key={i} className="action-card">
          <a.icon className="mb-3" />
          <h3 className="font-semibold">{a.title}</h3>
          <p className="text-sm text-muted-foreground">{a.description}</p>
        </div>
      ))}
    </div>
  );
}
