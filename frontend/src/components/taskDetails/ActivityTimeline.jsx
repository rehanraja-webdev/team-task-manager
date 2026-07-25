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
      color: "bg-green-500/20 text-green-400",
      title: "Created",
    },
    updated: {
      icon: <Pencil size={16} />,
      color: "bg-blue-500/20 text-blue-400",
      title: "Updated",
    },
    deleted: {
      icon: <Trash2 size={16} />,
      color: "bg-red-500/20 text-red-400",
      title: "Deleted",
    },
    commented: {
      icon: <MessageSquare size={16} />,
      color: "bg-purple-500/20 text-purple-400",
      title: "Commented",
    },
    completed: {
      icon: <CheckCircle size={16} />,
      color: "bg-emerald-500/20 text-emerald-400",
      title: "Completed",
    },
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
      <h2 className="text-2xl font-bold text-white mb-6">
        Activity <span className="text-purple-500">Timeline</span>
      </h2>

      {activities.length === 0 ? (
        <div className="text-center py-10 text-slate-500">
          <Clock3 size={40} className="mx-auto mb-3" />
          <p>No activities found.</p>
        </div>
      ) : (
        <div className="relative border-l-2 border-slate-700 ml-3 space-y-8">
          {activities.map((activity) => {
            const config = activityConfig[activity.action] || {
              icon: <Clock3 size={16} />,
              color: "bg-slate-700 text-slate-300",
              title: activity.action,
            };

            return (
              <div key={activity._id} className="relative pl-8">
                {/* Timeline Dot */}
                <div
                  className={`absolute -left-4.25 top-0 h-8 w-8 rounded-full flex items-center justify-center ${config.color}`}
                >
                  {config.icon}
                </div>

                {/* Activity Card */}
                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
                    >
                      {config.title}
                    </span>

                    <span className="text-xs text-slate-500">
                      {formatDate(activity.createdAt)}
                    </span>
                  </div>

                  <p className="text-white mt-3">{activity.description}</p>

                  {activity.user && (
                    <div className="mt-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                        {activity.user.fullname.charAt(0)}
                      </div>

                      <div>
                        <p className="text-white text-sm font-medium">
                          {activity.user.fullname}
                        </p>

                        <p className="text-slate-400 text-xs">
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
