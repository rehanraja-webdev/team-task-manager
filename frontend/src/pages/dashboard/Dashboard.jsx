/* eslint-disable react-hooks/set-state-in-effect */
import {
  Search,
  Mail,
  Bell,
  FolderKanban,
  CheckCircle,
  Clock,
  ListTodo,
} from "lucide-react";

import profileImg from "../../assets/profile.png";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import StatCard from "./StatCard";
import ProgressBar from "./ProgressBar";
import ActivityItem from "./ActivityItem";
import OverviewItem from "./OverviewItem";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  const getDashboard = async () => {
    try {
      const res = await api.get("/dashboard/stats");
      setStats(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch dashboard");
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

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
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-white text-xl font-semibold mb-6">
            Completion Rate
          </h2>

          <div className="flex flex-col items-center justify-center py-6">
            <div className="text-6xl font-bold text-indigo-400">
              {stats?.completionRate ?? 0}%
            </div>

            <p className="text-slate-400 mt-3">Overall Project Progress</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-white text-xl font-semibold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-5">
            <ActivityItem text="Task created successfully" time="2 mins ago" />

            <ActivityItem text="Project updated" time="10 mins ago" />

            <ActivityItem text="Team member assigned" time="1 hour ago" />

            <ActivityItem text="Task marked as completed" time="2 hours ago" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
