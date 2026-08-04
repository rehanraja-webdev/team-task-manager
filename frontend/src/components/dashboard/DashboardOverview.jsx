import OverviewItem from "./OverviewItem";

const DashboardOverview = ({ stats }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-white text-xl font-semibold mb-5">Quick Overview</h2>

      <div className="space-y-5">
        <OverviewItem
          label="Assigned Tasks"
          value={stats?.myAssignedTasks ?? 0}
        />

        <OverviewItem label="Projects" value={stats?.totalProjects ?? 0} />

        <OverviewItem
          label="Completion Rate"
          value={`${stats?.completionRate ?? 0}%`}
        />
      </div>
    </div>
  );
};
export default DashboardOverview;
