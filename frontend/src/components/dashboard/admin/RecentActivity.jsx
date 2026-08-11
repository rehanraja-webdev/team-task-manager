import { NavLink } from "react-router-dom";
import formatTimeAgo from "../../../utils/formatTimeAgo";
import { ArrowRight } from "lucide-react";

const RecentActivity = ({ stats }) => {
  return (
    <div className="xl:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
      <h2 className="dark:text-white text-slate-900 text-xl font-semibold mb-6">
        Recent Activity
      </h2>

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
            className="flex items-center pt-2 gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
          >
            <span>View all activities</span>
            <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

const ActivityItem = ({ text, time }) => {
  return (
    <div className="border-l-2 border-indigo-500 pl-4">
      <p className="text-slate-800 dark:text-slate-200">{text}</p>

      <span className="text-slate-500 text-sm">{time}</span>
    </div>
  );
};

export default RecentActivity;
