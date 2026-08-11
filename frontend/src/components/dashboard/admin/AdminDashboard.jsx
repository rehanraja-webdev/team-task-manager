import useAdminDashboard from "../../../hooks/useAdminDashboard";
import LoadingSpinner from "../../common/LoadingSpinner";
import DashboardStats from "./DashboardStats";
import CompletionRateChart from "./CompletionRateChart";
import DashboardOverview from "./DashboardOverview";
import DashboardTaskAnalytics from "./DashboardTaskAnalytics";
import RecentActivity from "./RecentActivity";

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
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <DashboardTaskAnalytics stats={stats} />

        <DashboardOverview stats={stats} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <CompletionRateChart completionRate={stats.completionRate} />

        <RecentActivity stats={stats} />
      </div>
    </div>
  );
};

export default AdminDashboard;
