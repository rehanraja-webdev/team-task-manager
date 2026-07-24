import {
  Flag,
  Circle,
  Clock3,
  CircleCheckBig,
  TrendingUp,
  TriangleAlert,
  ArrowBigRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

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
    <div className="bg-slate-900 border border-b-4 border-b-amber-600/80 border-slate-800 rounded-2xl p-6 ">
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

      <div className="flex justify-end">
        <NavLink
          to={`tasks/${task._id}`}
          className="mt-6 flex gap-2 px-6 py-3 border rounded-2xl hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
        >
          <span>View Task</span>
          <ArrowBigRight />
        </NavLink>
      </div>
    </div>
  );
};

export default TaskCard;
