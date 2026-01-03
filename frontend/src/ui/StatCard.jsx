export default function StatCard({ icon: Icon, value, label, percentage }) {
  return (
    <div className="stat-card">
      <Icon />
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
      <span className="text-xs">{percentage}</span>
    </div>
  );
}
