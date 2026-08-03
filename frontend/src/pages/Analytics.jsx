import AnalyticsCards from "../components/analytics/AnalyticsCards";
import TaskStatusChart from "../components/analytics/TaskStatusChart";
import PriorityChart from "../components/analytics/PriorityChart";
import MonthlyTasksChart from "../components/analytics/MonthlyTasksChart";
import ProjectProgress from "../components/analytics/ProjectProgress";
import ContributorsTable from "../components/analytics/ContributorsTable";
import OverdueTasksTable from "../components/analytics/OverdueTasksTable";
import useAnalytics from "../hooks/useAnalytics";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProjectChart from "../components/analytics/ProjectChart";

const Analytics = () => {
  const {
    overview,
    monthTasks,
    projectAnalytics,
    contributors,
    overdue,
    fetching,
  } = useAnalytics();

  if (fetching) return <LoadingSpinner />;
  return (
    <div className="space-y-8">
      <AnalyticsCards overview={overview} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskStatusChart analytics={overview} />
        <PriorityChart analytics={overview} />
      </div>

      <MonthlyTasksChart data={monthTasks} />

      <ProjectChart data={projectAnalytics} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ProjectProgress data={projectAnalytics} />
        <ContributorsTable data={contributors} />
      </div>

      <OverdueTasksTable data={overdue} />
    </div>
  );
};

export default Analytics;
