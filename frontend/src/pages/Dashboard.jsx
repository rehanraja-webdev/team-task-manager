import {
  Search,
  Mail,
  Bell,
  FolderKanban,
  CheckCircle,
  Clock,
  ListTodo,
  ArrowRight,
} from "lucide-react";

import useDashboard from "../hooks/useDashboard";
import formatTimeAgo from "../utils/formatTimeAgo";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import profileImg from "../assets/profile.png";
import StatCard from "../components/common/StatCard";
import ProgressBar from "../components/dashboard/ProgressBar";
import ActivityItem from "../components/dashboard/ActivityItem";
import OverviewItem from "../components/dashboard/OverviewItem";
import CompletionRateChart from "../components/dashboard/CompletionRateChart";

const Dashboard = () => {
  const { stats, loading } = useDashboard();
  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-950 ">
      {/* Header */}
      <div className="flex justify-between items-center bg-slate-900 rounded-2xl p-4 border border-slate-800 mb-8">
        <div className="flex items-center gap-3 bg-slate-950 px-4 py-3 rounded-full border border-slate-800 md:w-80 w-52">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-white w-full"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-slate-950 p-3 rounded-full cursor-pointer">
            <Mail className="text-slate-300" />
          </div>

          <div className="bg-slate-950 p-3 rounded-full cursor-pointer">
            <Bell className="text-slate-300" />
          </div>

          <img
            src={profileImg}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>

      {/* Welcome */}
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

        {/* Quick Overview */}
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

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Completion Rate */}
        <CompletionRateChart completionRate={stats.completionRate} />

        {/* Recent Activity */}
        <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-white text-xl font-semibold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-5 max-h-64 overflow-y-auto scroll-smooth p-1 scrollbar-none">
            {stats?.activities.map((activity) => (
              <ActivityItem
                key={activity._id}
                text={activity.action}
                time={formatTimeAgo(activity.createdAt)}
              />
            ))}
            <div className="flex items-center justify-end">
              <NavLink
                to="activities"
                className="flex items-center pt-2 gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <span>View all activities</span>
                <ArrowRight className="w-4 h-4" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
