import { lazy, Suspense } from "react";
import useAdminDashboard from "../../../hooks/useAdminDashboard";
import LoadingSpinner from "../../common/LoadingSpinner";
import ChartSkeleton from "../../common/ChartSkeleton";

import DashboardStats from "./DashboardStats";
import DashboardOverview from "./DashboardOverview";
import DashboardTaskAnalytics from "./DashboardTaskAnalytics";
import RecentActivity from "./RecentActivity";

const CompletionRateChart = lazy(() => import("./CompletionRateChart"));

const AdminDashboard = ({ fullname }) => {
  const { stats, loading } = useAdminDashboard();

  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div>
      <div className="mb-8 ml-6">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          {greeting()}, {fullname.split(" ")[0]} 👋
        </h1>

        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Track projects, tasks and team performance.
        </p>
      </div>
      <DashboardStats stats={stats} />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <DashboardTaskAnalytics stats={stats} />

        <DashboardOverview stats={stats} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Suspense fallback={<ChartSkeleton />}>
          <CompletionRateChart completionRate={stats.completionRate} />
        </Suspense>

        <RecentActivity stats={stats} />
      </div>
    </div>
  );
};

export default AdminDashboard;
