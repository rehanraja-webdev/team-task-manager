import {
  CalendarDays,
  User,
  Flag,
  Circle,
  Clock3,
  CircleCheckBig,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";
import formatDate from "../../../utils/formatDate";

const TaskCard = ({ task }) => {
  const statusConfig = {
    todo: {
      icon: <Circle size={16} />,
      className: "bg-slate-700 text-slate-300",
      label: "Todo",
    },
    "in-progress": {
      icon: <Clock3 size={16} />,
      className: "bg-amber-500/20 text-amber-400",
      label: "In Progress",
    },
    done: {
      icon: <CircleCheckBig size={16} />,
      className: "bg-green-500/20 text-green-400",
      label: "Done",
    },
  };

  const priorityConfig = {
    low: {
      icon: <Flag size={16} />,
      className: "bg-blue-500/20 text-blue-400",
      label: "Low",
    },
    medium: {
      icon: <TrendingUp size={16} />,
      className: "bg-yellow-500/20 text-yellow-400",
      label: "Medium",
    },
    high: {
      icon: <TriangleAlert size={16} />,
      className: "bg-red-500/20 text-red-400",
      label: "High",
    },
  };

  const status = statusConfig[task.status] || {
    icon: <Circle size={16} />,
    className: "bg-slate-700 text-slate-300",
    label: task.status,
  };

  const priority = priorityConfig[task.priority] || {
    icon: <Flag size={16} />,
    className: "bg-slate-700 text-slate-300",
    label: task.priority,
  };

  return (
    <div className="bg-slate-900 border border-b-4 border-b-amber-600/80 border-slate-800 rounded-2xl p-6 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between ">
        <span
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${priority.className}`}
        >
          Priority
          {priority.icon}
          {priority.label}
        </span>

        <span
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${status.className}`}
        >
          {status.icon}
          {status.label}
        </span>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white mt-4">{task.title}</h2>

        <p className="mt-2 text-slate-400 leading-6">
          {task.description || "No description provided."}
        </p>
      </div>

      {/* Assigned User */}
      <div className="mt-6 flex items-center gap-4 bg-slate-800/60 rounded-xl p-4 border border-slate-700">
        <div className="h-11 w-11 rounded-full bg-purple-600/20 flex items-center justify-center">
          <User className="text-purple-400" size={20} />
        </div>

        <div>
          <p className="text-white font-medium">{task.assignedTo.fullname}</p>

          <p className="text-sm text-slate-400">{task.assignedTo.email}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 border-t border-slate-800 pt-5 flex justify-between">
        <div className="flex items-start gap-3">
          <CalendarDays size={18} className="text-slate-500 mt-1" />

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Created
            </p>

            <p className="text-sm text-white mt-1">
              {formatDate(task.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock3 size={18} className="text-slate-500 mt-1" />

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Updated
            </p>

            <p className="text-sm text-white mt-1">
              {formatDate(task.updatedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
