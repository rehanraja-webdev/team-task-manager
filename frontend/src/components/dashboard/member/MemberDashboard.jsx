import MemberStats from "./MemberStats";
import MyTasks from "./MyTasks";
import MyProjects from "./MyProjects";
import UpcomingDeadlines from "./UpcomingDeadlines";
import RecentActivities from "./RecentActivities";
import LoadingSpinner from "../../common/LoadingSpinner";
import useMemberDashboard from "../../../hooks/useMemberDashboard";
import EmptyDashboard from "../../dashboard/EmptyDashboard";

const MemberDashboard = ({ fullname }) => {
  const { dashboard, fetching } = useMemberDashboard();

  if (fetching) return <LoadingSpinner />;

  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const firstName = fullname?.split(" ")[0] || "there";

  return (
    <div className="space-y-8">
      {/* Greeting - Always visible */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          {greeting()}, {firstName} 👋
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Here's your work summary for today.
        </p>
      </div>

      {/* Empty state */}
      {dashboard?.isEmpty ? (
        <EmptyDashboard role="member" fullname={fullname} />
      ) : (
        <>
          <MemberStats dashboard={dashboard} />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <MyTasks tasks={dashboard.upcomingTasks} />

            <UpcomingDeadlines tasks={dashboard.upcomingTasks} />

            <MyProjects projects={dashboard.projects} />

            <RecentActivities activities={dashboard.recentActivities} />
          </div>
        </>
      )}
    </div>
  );
};

export default MemberDashboard;
