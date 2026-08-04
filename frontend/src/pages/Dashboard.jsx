import useDashboard from "../hooks/useDashboard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import DashboardOverview from "../components/dashboard/DashboardOverview";
import CompletionRateChart from "../components/dashboard/CompletionRateChart";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import RecentActivity from "../components/dashboard/RecentActivity";
import DashboardTaskAnalytics from "../components/dashboard/DashboardTaskAnalytics";
import DashboardStats from "../components/dashboard/DashboardStats";

const Dashboard = () => {
  const { stats, loading } = useDashboard();
  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-950 ">
      <DashboardHeader />

      <DashboardStats stats={stats} />

      {/* Middle Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Analytics */}
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

export default Dashboard;
