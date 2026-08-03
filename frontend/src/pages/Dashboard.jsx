import { FolderKanban, CheckCircle, Clock, ListTodo } from "lucide-react";

import useDashboard from "../hooks/useDashboard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import StatCard from "../components/common/StatCard";
import ProgressBar from "../components/dashboard/ProgressBar";
import OverviewItem from "../components/dashboard/OverviewItem";
import CompletionRateChart from "../components/dashboard/CompletionRateChart";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import RecentActivity from "../components/dashboard/RecentActivity";

const Dashboard = () => {
  const { stats, loading } = useDashboard();
  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-950 ">
      {/* Header */}
      <DashboardHeader />

      <div className="mb-8 ml-6">
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>

        <p className="text-slate-400 mt-2">
          Track projects, tasks and team performance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mb-8">
        <StatCard
          title="Projects"
          value={stats?.totalProjects ?? 0}
          icon={<FolderKanban />}
        />

        <StatCard
          title="Tasks"
          value={stats?.totalTasks ?? 0}
          icon={<ListTodo />}
        />

        <StatCard
          title="Completed"
          value={stats?.doneTasks ?? 0}
          icon={<CheckCircle />}
        />

        <StatCard title="Todo" value={stats?.todoTasks ?? 0} icon={<Clock />} />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Analytics */}
        <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-white text-xl font-semibold mb-6">
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

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-white text-xl font-semibold mb-5">
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
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <CompletionRateChart completionRate={stats.completionRate} />

        <RecentActivity stats={stats} />
      </div>
    </div>
  );
};

export default Dashboard;
