import { Users, UserCheck, UserMinus, UserX } from "lucide-react";
import Layout from "../ui/Layout";
import StatCard from "../ui/StatCard";
import RecentActivity from "../ui/RecentActivity";
import PendingApprovals from "../ui/PendingApprovals";
import QuickActions from "../ui/QuickActions";

const stats = [
  { icon: Users, iconVariant: "primary", value: 248, label: "Total Employees", percentage: "+12%", percentageColor: "success" },
  { icon: UserCheck, iconVariant: "accent", value: 234, label: "Present Today", percentage: "94.4%", percentageColor: "success" },
  { icon: UserMinus, iconVariant: "warning", value: 8, label: "On Leave", percentage: "3.2%", percentageColor: "muted" },
  { icon: UserX, iconVariant: "destructive", value: 6, label: "Absent", percentage: "2.4%", percentageColor: "destructive" },
];

export default function Dashboard() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-1">Welcome back, Admin!</h1>
      <p className="text-muted-foreground mb-8">Here's what's happening today.</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <div className="lg:col-span-2"><RecentActivity /></div>
        <PendingApprovals />
      </div>

      <QuickActions />
    </Layout>
  );
}
