import {
  Plus,
  Pencil,
  Trash2,
  MessageSquare,
  CheckCircle,
  Clock3,
} from "lucide-react";
import formatDate from "../../utils/formatDate";

const ActivityTimeline = ({ activities = [] }) => {
  const activityConfig = {
    created: {
      icon: <Plus size={16} />,
      color:
        "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400",
      title: "Created",
    },
    updated: {
      icon: <Pencil size={16} />,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
      title: "Updated",
    },
    deleted: {
      icon: <Trash2 size={16} />,
      color: "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400",
      title: "Deleted",
    },
    commented: {
      icon: <MessageSquare size={16} />,
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
      title: "Commented",
    },
    completed: {
      icon: <CheckCircle size={16} />,
      color:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
      title: "Completed",
    },
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Activity{" "}
        <span className="text-purple-600 dark:text-purple-500">Timeline</span>
      </h2>

      {activities.length === 0 ? (
        <div className="py-10 text-center text-slate-500">
          <Clock3 size={40} className="mx-auto mb-3" />
          <p>No activities found.</p>
        </div>
      ) : (
        <div className="relative ml-3 space-y-8 border-l-2 border-slate-200 dark:border-slate-700">
          {activities.map((activity) => {
            const config = activityConfig[activity.action] || {
              icon: <Clock3 size={16} />,
              color:
                "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
              title: activity.action,
            };

            return (
              <div key={activity._id} className="relative pl-8">
                <div
                  className={`absolute -left-4.25 top-0 flex h-8 w-8 items-center justify-center rounded-full ${config.color}`}
                >
                  {config.icon}
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${config.color}`}
                    >
                      {config.title}
                    </span>

                    <span className="text-xs text-slate-500">
                      {formatDate(activity.createdAt)}
                    </span>
                  </div>

                  <p className="mt-3 text-slate-900 dark:text-white">
                    {activity.description}
                  </p>

                  {activity.user && (
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 font-semibold text-white">
                        {activity.user.fullname.charAt(0)}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {activity.user.fullname}
                        </p>

                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {activity.user.email}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActivityTimeline;
