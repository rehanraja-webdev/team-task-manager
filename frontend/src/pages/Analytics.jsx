import AnalyticsCards from "../components/analytics/AnalyticsCards";
import TaskStatusChart from "../components/analytics/TaskStatusChart";
import PriorityChart from "../components/analytics/PriorityChart";
import MonthlyTasksChart from "../components/analytics/MonthlyTasksChart";
import ProjectProgress from "../components/analytics/ProjectProgress";
import ContributorsTable from "../components/analytics/ContributorsTable";
import OverdueTasksTable from "../components/analytics/OverdueTasksTable";

const Analytics = () => {
  return (
    <div className="space-y-8">
      <AnalyticsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskStatusChart />
        <PriorityChart />
      </div>

      <MonthlyTasksChart />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ProjectProgress />
        <ContributorsTable />
      </div>

      <OverdueTasksTable />
    </div>
  );
};

export default Analytics;
