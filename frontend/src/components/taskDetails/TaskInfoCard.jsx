import { useState } from "react";
import {
  Circle,
  Clock3,
  CircleCheckBig,
  Flag,
  TrendingUp,
  TriangleAlert,
  User,
  UserPlus,
  FolderOpen,
  CalendarDays,
  PenLine,
} from "lucide-react";
import formatDate from "../../utils/formatDate";
import TaskModal from "./TaskModal";

const TaskInfoCard = ({ task, reloadTask }) => {
  const [modalActive, setModalActive] = useState(false);

  const statusConfig = {
    todo: {
      icon: <Circle size={18} />,
      className:
        "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-200",
      label: "Todo",
    },
    "in-progress": {
      icon: <Clock3 size={18} />,
      className:
        "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
      label: "In Progress",
    },
    done: {
      icon: <CircleCheckBig size={18} />,
      className:
        "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400",
      label: "Done",
    },
  };

  const priorityConfig = {
    low: {
      icon: <Flag size={18} />,
      className:
        "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
      label: "Low",
    },
    medium: {
      icon: <TrendingUp size={18} />,
      className:
        "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400",
      label: "Medium",
    },
    high: {
      icon: <TriangleAlert size={18} />,
      className: "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400",
      label: "High",
    },
  };

  const status = statusConfig[task.status];
  const priority = priorityConfig[task.priority];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Task{" "}
        <span className="text-purple-600 dark:text-purple-500">
          Information
        </span>
      </h2>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <InfoItem icon={status.icon} label="Status">
          {modalActive && (
            <TaskModal
              modalActive={modalActive}
              task={task}
              action="status"
              reloadTask={reloadTask}
              onClose={() => setModalActive(false)}
            />
          )}

          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ${status.className}`}
          >
            {status.icon}
            {status.label}
          </span>

          <button
            type="button"
            onClick={() => setModalActive(true)}
            className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-700/50 dark:hover:text-white"
            title="Edit Status"
          >
            <PenLine className="h-4 w-4" />
          </button>
        </InfoItem>

        <InfoItem icon={priority.icon} label="Priority">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ${priority.className}`}
          >
            {priority.icon}
            {priority.label}
          </span>
        </InfoItem>

        <InfoItem icon={<UserPlus size={18} />} label="Created By">
          <p>{task.createdBy?.fullname || "Unknown"}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {task.createdBy?.email}
          </p>
        </InfoItem>

        <InfoItem icon={<User size={18} />} label="Assigned To">
          <p>{task.assignedTo?.fullname}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {task.assignedTo?.email}
          </p>
        </InfoItem>

        <InfoItem icon={<FolderOpen size={18} />} label="Project">
          {task.project?.name}
        </InfoItem>

        <InfoItem icon={<CalendarDays size={18} />} label="Due Date">
          {task.dueDate ? formatDate(task.dueDate) : "No due date assigned"}
        </InfoItem>

        <InfoItem icon={<CalendarDays size={18} />} label="Created">
          {formatDate(task.createdAt)}
        </InfoItem>

        <InfoItem icon={<Clock3 size={18} />} label="Last Updated">
          {formatDate(task.updatedAt)}
        </InfoItem>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, children }) => (
  <div className="relative rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
    <div className="mb-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
      {icon}
      <span>{label}</span>
    </div>

    <div className="font-medium text-slate-900 dark:text-white">{children}</div>
  </div>
);

export default TaskInfoCard;
