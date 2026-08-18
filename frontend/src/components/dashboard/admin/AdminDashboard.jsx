import { lazy, Suspense } from "react";
import useAdminDashboard from "../../../hooks/useAdminDashboard";
import LoadingSpinner from "../../common/LoadingSpinner";
import ChartSkeleton from "../../common/ChartSkeleton";
import EmptyDashboard from "../../dashboard/EmptyDashboard";

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

  const firstName = fullname?.split(" ")[0] || "there";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          {greeting()}, {firstName} 👋
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Track projects, tasks and team performance.
        </p>
      </div>

      {/* Empty state */}
      {stats?.isEmpty ? (
        <EmptyDashboard role="admin" fullname={fullname} />
      ) : (
        <>
          {/* Stats */}
          <DashboardStats stats={stats} />

          {/* Task Analytics */}
          <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <DashboardTaskAnalytics stats={stats} />

            <DashboardOverview stats={stats} />
          </div>

          {/* Charts & Activity */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <Suspense fallback={<ChartSkeleton />}>
              <CompletionRateChart completionRate={stats.completionRate} />
            </Suspense>

            <RecentActivity stats={stats} />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
