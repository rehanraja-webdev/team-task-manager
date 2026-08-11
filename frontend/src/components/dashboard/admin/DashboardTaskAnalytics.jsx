import ProgressBar from "./ProgressBar";

const DashboardTaskAnalytics = ({ stats }) => {
  return (
    <div className="xl:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
      <h2 className="text-slate-900 dark:text-white text-xl font-semibold mb-6">
        Task Analytics
      </h2>

      <div className="space-y-6">
        <ProgressBar
          title="Todo Tasks"
          value={stats?.todoTasks}
          total={stats?.totalTasks}
        />

        <ProgressBar
          title="In Progress"
          value={stats?.inProgressTasks}
          total={stats?.totalTasks}
        />

        <ProgressBar
          title="Completed"
          value={stats?.doneTasks}
          total={stats?.totalTasks}
        />
      </div>
    </div>
  );
};

export default DashboardTaskAnalytics;
