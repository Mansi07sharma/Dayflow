const approvals = [
  { id: 1, name: "Sarah Johnson", type: "Leave Request", dates: "Jan 20-22" },
  { id: 2, name: "Robert Taylor", type: "Time Off", dates: "Jan 25-26" },
  { id: 3, name: "Amanda White", type: "Sick Leave", dates: "Jan 18" },
];


export default function  PendingApprovals() {
  return (
    <div className="section-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Pending Approvals</h2>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-xs font-medium text-black">
          {approvals.length}
        </span>
      </div>

      <div className="space-y-4">
        {approvals.map((approval) => (
          <div
            key={approval.id}
            className="rounded-xl border border-gray-700 bg-gray-900 p-4"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium text-white">{approval.name}</p>
              <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-400">
                Pending
              </span>
            </div>

            <p className="text-sm text-gray-400">{approval.type}</p>
            <p className="text-sm text-gray-400">{approval.dates}</p>

            {/* BUTTONS */}
            <div className="flex gap-2 mt-3">
              {/* Approve */}
              <button
                className="flex-1 rounded-md bg-green-600 py-2 text-sm font-medium text-white
                hover:bg-green-700 transition-all"
              >
                Approve
              </button>

              {/* Reject */}
              <button
                className="flex-1 rounded-md bg-red-600 py-2 text-sm font-medium text-white
                hover:bg-red-700 transition-all"
              >
                Reject
              </button>
            </div>
          </div>
        ))}

        <button className="w-full py-2 text-sm text-gray-400 hover:text-white transition">
          View All Requests
        </button>
      </div>
    </div>
  );
}