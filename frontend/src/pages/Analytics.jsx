import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";

import useAnalytics from "../hooks/useAnalytics";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ChartSkeleton from "../components/common/ChartSkeleton";

import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import AnalyticsCards from "../components/analytics/AnalyticsCards";
import ContributorsTable from "../components/analytics/ContributorsTable";
import OverdueTasksTable from "../components/analytics/OverdueTasksTable";
import ProjectProgress from "../components/analytics/ProjectProgress";
import EmptyAnalytics from "../components/analytics/EmptyAnalytics";

const TaskStatusChart = lazy(
  () => import("../components/analytics/TaskStatusChart"),
);

const PriorityChart = lazy(
  () => import("../components/analytics/PriorityChart"),
);

const MonthlyTasksChart = lazy(
  () => import("../components/analytics/MonthlyTasksChart"),
);

const ProjectChart = lazy(() => import("../components/analytics/ProjectChart"));

const Analytics = () => {
  const navigate = useNavigate();
  const { data, fetching } = useAnalytics();

  if (fetching) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      {/* Header always visible */}
      <AnalyticsHeader />

      {/* Empty state */}
      {data?.isEmpty ? (
        <EmptyAnalytics
          onCreate={() => navigate("/dashboard/projects/create")}
        />
      ) : (
        <>
          <AnalyticsCards overview={data.overview} />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <ProjectProgress data={data.projectAnalytics} />
            <ContributorsTable data={data.contributors} />
          </div>

          <Suspense fallback={<ChartSkeleton />}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <TaskStatusChart analytics={data.overview} />
              <PriorityChart analytics={data.overview} />
            </div>
          </Suspense>

          <Suspense fallback={<ChartSkeleton />}>
            <MonthlyTasksChart data={data.monthTasks} />
          </Suspense>

          <Suspense fallback={<ChartSkeleton />}>
            <ProjectChart data={data.projectAnalytics} />
          </Suspense>

          <OverdueTasksTable data={data.overdue} />
        </>
      )}
    </div>
  );
};

export default Analytics;
