import useAdminDashboard from "../../../hooks/useAdminDashboard";
import LoadingSpinner from "../../common/LoadingSpinner";
import DashboardStats from "./DashboardStats";
import CompletionRateChart from "./CompletionRateChart";
import DashboardOverview from "./DashboardOverview";
import DashboardTaskAnalytics from "./DashboardTaskAnalytics";
import RecentActivity from "./RecentActivity";

const AdminDashboard = () => {
  const { stats, loading } = useAdminDashboard();

  if (loading) return <LoadingSpinner />;
  return (
    <div>
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
