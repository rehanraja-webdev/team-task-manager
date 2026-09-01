import { Activity as ActivityIcon, ArrowUpRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import formatTimeAgo from "../../../utils/formatTimeAgo";

const RecentActivities = ({ activities = [] }) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
            <ActivityIcon size={21} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Recent Activity
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Latest workspace updates
            </p>
          </div>
        </div>

        <Link
          to="/dashboard/activities"
          className="group inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400"
        >
          View all
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {/* Activities */}
      <div className="mt-6">
        {activities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center dark:border-slate-800 dark:bg-slate-950/40">
            <ActivityIcon
              size={28}
              className="mx-auto text-slate-400 dark:text-slate-600"
            />

            <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">
              No recent activity
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Activity from your workspace will appear here.
            </p>
          </div>
        ) : (
          <div className="relative space-y-1">
            {activities.slice(0, 7).map((activity, index) => (
              <div
                key={activity._id}
                className="relative flex gap-4 rounded-xl p-3 transition hover:bg-slate-50 dark:hover:bg-slate-950/50"
              >
                {/* Timeline */}
                <div className="relative flex flex-col items-center">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                    <ActivityIcon size={15} />
                  </div>

                  {index < Math.min(activities.length, 7) - 1 && (
                    <div className="absolute top-9 h-full w-px bg-slate-200 dark:bg-slate-800" />
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-5 text-slate-700 dark:text-slate-300">
                    {activity.action}
                  </p>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock3 size={12} />
                    {formatTimeAgo(activity.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentActivities;
