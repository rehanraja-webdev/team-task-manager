import { NavLink } from "react-router";
import formatTimeAgo from "../../../utils/formatTimeAgo";
import ActivityItem from "../ActivityItem";
import { ArrowRight } from "lucide-react";

const RecentActivity = ({stats}) => {
  return (
    <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-white text-xl font-semibold mb-6">Recent Activity</h2>

      <div className="space-y-5 max-h-64 overflow-y-auto scroll-smooth p-1 scrollbar-none">
        {stats?.activities.map((activity) => (
          <ActivityItem
            key={activity._id}
            text={activity.action}
            time={formatTimeAgo(activity.createdAt)}
          />
        ))}
        <div className="flex items-center justify-end">
          <NavLink
            to="activities"
            className="flex items-center pt-2 gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>View all activities</span>
            <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
