import {
  Flag,
  Circle,
  Clock3,
  CircleCheckBig,
  TrendingUp,
  TriangleAlert,
  ArrowRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const TaskCard = ({ task, from }) => {
  const statusConfig = {
    todo: {
      icon: <Circle size={16} />,
      className:
        "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
      label: "Todo",
    },

    "in-progress": {
      icon: <Clock3 size={16} />,
      className: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
      label: "In Progress",
    },

    done: {
      icon: <CircleCheckBig size={16} />,
      className: "bg-green-500/20 text-green-600 dark:text-green-400",
      label: "Done",
    },
  };

  const priorityConfig = {
    low: {
      icon: <Flag size={16} />,
      className: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
      label: "Low",
    },

    medium: {
      icon: <TrendingUp size={16} />,
      className: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
      label: "Medium",
    },

    high: {
      icon: <TriangleAlert size={16} />,
      className: "bg-red-500/20 text-red-600 dark:text-red-400",
      label: "High",
    },
  };

  const status = statusConfig[task.status] || {
    icon: <Circle size={16} />,
    className:
      "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
    label: task.status,
  };

  const priority = priorityConfig[task.priority] || {
    icon: <Flag size={16} />,
    className:
      "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
    label: task.priority,
  };

  return (
    <div className="rounded-2xl border border-slate-200 border-b-4 border-b-amber-500/80 bg-white p-6 dark:border-slate-800 dark:border-b-amber-600/80 dark:bg-slate-900">
      {/* Header */}
      <div className="flex justify-between gap-3">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${priority.className}`}
        >
          Priority
          {priority.icon}
          {priority.label}
        </span>

        <span
          className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium ${status.className}`}
        >
          {status.icon}
          {status.label}
        </span>
      </div>

      {/* Content */}
      <div>
        <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
          {task.title}
        </h2>

        <p className="mt-2 leading-6 text-slate-600 dark:text-slate-400">
          {task.description || "No description provided."}
        </p>
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <NavLink
          to={from === "tasks" ? `${task._id}` : `tasks/${task._id}`}
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:border-purple-500/40 hover:bg-slate-200 hover:text-purple-600 active:scale-[0.98] dark:border-slate-700/50 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-purple-400"
        >
          <span>View Task</span>

          <ArrowRight className="size-4 transition-transform duration-200" />
        </NavLink>
      </div>
    </div>
  );
};

export default TaskCard;
