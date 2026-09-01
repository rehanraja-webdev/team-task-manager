import {
  Activity,
  CheckCircle2,
  CircleDot,
  FolderKanban,
  MessageSquare,
  UserMinus,
  UserPlus,
} from "lucide-react";
import formatTimeAgo from "../../utils/formatTimeAgo";

const getActivityConfig = (action = "") => {
  const text = action.toLowerCase();

  if (text.includes("comment")) {
    return {
      icon: MessageSquare,
      iconStyle: "bg-blue-500/10 text-blue-500 dark:text-blue-400",
    };
  }

  if (text.includes("removed") || text.includes("left")) {
    return {
      icon: UserMinus,
      iconStyle: "bg-rose-500/10 text-rose-500 dark:text-rose-400",
    };
  }

  if (text.includes("added") || text.includes("joined")) {
    return {
      icon: UserPlus,
      iconStyle: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400",
    };
  }

  if (text.includes("project")) {
    return {
      icon: FolderKanban,
      iconStyle: "bg-violet-500/10 text-violet-500 dark:text-violet-400",
    };
  }

  if (text.includes("completed") || text.includes("done")) {
    return {
      icon: CheckCircle2,
      iconStyle: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400",
    };
  }

  if (text.includes("task")) {
    return {
      icon: CircleDot,
      iconStyle: "bg-indigo-500/10 text-indigo-500 dark:text-indigo-400",
    };
  }

  return {
    icon: Activity,
    iconStyle: "bg-slate-500/10 text-slate-500 dark:text-slate-400",
  };
};

const ActivityCard = ({ activity }) => {
  const { icon: Icon, iconStyle } = getActivityConfig(activity.action);

  return (
    <div className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30">
      {/* Icon */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconStyle}`}
      >
        <Icon size={18} />
      </div>

      {/* Activity */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
          {activity.action}
        </p>

        {activity.user?.fullname && (
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            By{" "}
            <span className="font-medium text-slate-600 dark:text-slate-300">
              {activity.user.fullname}
            </span>
          </p>
        )}
      </div>

      {/* Time */}
      <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
        {formatTimeAgo(activity.createdAt)}
      </span>
    </div>
  );
};

export default ActivityCard;
