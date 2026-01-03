import { Search, Plus, Mail, Phone, Plane } from "lucide-react";
import Layout from "../ui/Layout.jsx"
import Avatar  from "../ui/Avatar.jsx";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
const employees = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Software Engineer",
    department: "Engineering",
    email: "sarah.johnson@hrms.com",
    phone: "+1 234 567 1001",
    status: "present",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    department: "Product",
    email: "michael.chen@hrms.com",
    phone: "+1 234 567 1002",
    status: "on-leave",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX Designer",
    department: "Design",
    email: "emily.rodriguez@hrms.com",
    phone: "+1 234 567 1003",
    status: "present",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
  },
  {
    id: 4,
    name: "David Kim",
    role: "DevOps Engineer",
    department: "Engineering",
    email: "david.kim@hrms.com",
    phone: "+1 234 567 1004",
    status: "absent",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  },
];

const statusColor = {
  present: "bg-green-500",
  "on-leave": "bg-cyan-500",
  absent: "bg-yellow-400",
};

export default function Employees() {
  return (
    <Layout>
      {/* HEADER */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-cyan-400">Employees</h1>
          <p className="text-slate-400 mt-1">Manage your team members</p>
        </div>
        <Button>
          <Plus size={16} /> NEW
        </Button>
      </div>

      {/* SEARCH */}
      <div className="mb-8 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <Input placeholder="Search employees..." />
      </div>

      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="relative rounded-xl bg-slate-900 border border-slate-800 p-6 text-center hover:border-cyan-500 transition"
          >
            <span
              className={`absolute top-4 right-4 h-3 w-3 rounded-full ${statusColor[emp.status]}`}
            />
            {emp.status === "on-leave" && (
              <Plane className="absolute top-4 right-10 text-cyan-400" size={16} />
            )}

            <Avatar src={emp.avatar} name={emp.name} />

            <h3 className="font-semibold text-cyan-400">{emp.name}</h3>
            <p className="text-sm text-slate-400">{emp.role}</p>
            <p className="text-xs text-cyan-400 mt-1">{emp.department}</p>

            <div className="mt-4 space-y-2 text-sm text-cyan-400">
              <div className="flex justify-center gap-2">
                <Mail size={14} /> {emp.email}
              </div>
              <div className="flex justify-center gap-2">
                <Phone size={14} /> {emp.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
