import MemberStats from "./MemberStats";
import MyTasks from "./MyTasks";
import MyProjects from "./MyProjects";
import UpcomingDeadlines from "./UpcomingDeadlines";
import RecentActivities from "./RecentActivities";
import LoadingSpinner from "../../common/LoadingSpinner";
import useMemberDashboard from "../../../hooks/useMemberDashboard";

const MemberDashboard = ({ fullname }) => {
  const { dashboard, fetching } = useMemberDashboard();

  if (fetching) return <LoadingSpinner />;

  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          {greeting()}, {fullname.split(" ")[0]} 👋
        </h1>

        <p className="mt-2 text-slate-400">
          Here's your work summary for today.
        </p>
      </div>

      <MemberStats dashboard={dashboard} />

      <div className="grid gap-6 lg:grid-cols-2">
        <MyTasks tasks={dashboard.upcomingTasks} />
        <UpcomingDeadlines tasks={dashboard.upcomingTasks} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <MyProjects projects={dashboard.projects} />
        <RecentActivities activities={dashboard.recentActivities} />
      </div>
    </div>
  );
};

export default MemberDashboard;
