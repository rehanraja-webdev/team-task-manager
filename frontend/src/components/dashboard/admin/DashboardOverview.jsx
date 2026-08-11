const DashboardOverview = ({ stats }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
      <h2 className="text-slate-900 dark:text-white text-xl font-semibold mb-5">
        Quick Overview
      </h2>

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

const OverviewItem = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-950 p-4 rounded-xl">
      <span className="text-slate-600 dark:text-slate-400">{label}</span>

      <span className="text-slate-900 dark:text-white font-semibold">
        {value}
      </span>
    </div>
  );
};

export default DashboardOverview;
