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
import Modal from "../common/Modal";

const TaskInfoCard = ({ task, reloadTask }) => {
  const [modalActive, setModalActive] = useState(false);

  const statusConfig = {
    todo: {
      icon: <Circle size={18} />,
      className: "bg-slate-700 text-slate-200",
      label: "Todo",
    },
    "in-progress": {
      icon: <Clock3 size={18} />,
      className: "bg-amber-500/20 text-amber-400",
      label: "In Progress",
    },
    done: {
      icon: <CircleCheckBig size={18} />,
      className: "bg-green-500/20 text-green-400",
      label: "Done",
    },
  };

  const priorityConfig = {
    low: {
      icon: <Flag size={18} />,
      className: "bg-blue-500/20 text-blue-400",
      label: "Low",
    },
    medium: {
      icon: <TrendingUp size={18} />,
      className: "bg-yellow-500/20 text-yellow-400",
      label: "Medium",
    },
    high: {
      icon: <TriangleAlert size={18} />,
      className: "bg-red-500/20 text-red-400",
      label: "High",
    },
  };

  const status = statusConfig[task.status];
  const priority = priorityConfig[task.priority];
  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Task <span className="text-purple-500">Information</span>
      </h2>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {/* Status */}
        <InfoItem icon={status.icon} label="Status">
          {modalActive && (
            <Modal
              modalActive={modalActive}
              task={task}
              action="status"
              reloadTask={reloadTask}
              onClose={() => setModalActive(false)}
            />
          )}
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${status.className}`}
          >
            {status.icon}
            {status.label}
          </span>

          <button
            type="button"
            onClick={() => setModalActive(true)}
            className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/50 transition-colors"
            title="Edit Status"
          >
            <PenLine className="w-4 h-4" />
          </button>
        </InfoItem>

        {/* Priority */}
        <InfoItem icon={priority.icon} label="Priority">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${priority.className}`}
          >
            {priority.icon}
            {priority.label}
          </span>
        </InfoItem>

        {/* Created By */}
        <InfoItem icon={<UserPlus size={18} />} label="Created By">
          <p>{task.createdBy?.fullname || "Unknown"}</p>

          <p className="text-sm text-slate-400 mt-1">{task.createdBy?.email}</p>
        </InfoItem>

        {/* Assigned To */}
        <InfoItem icon={<User size={18} />} label="Assigned To">
          <p>{task.assignedTo?.fullname}</p>

          <p className="text-sm text-slate-400 mt-1">
            {task.assignedTo?.email}
          </p>
        </InfoItem>

        {/* Project */}
        <InfoItem icon={<FolderOpen size={18} />} label="Project">
          {task.project?.name}
        </InfoItem>

        {/* Due Date */}
        <InfoItem icon={<CalendarDays size={18} />} label="Due Date">
          {task.dueDate ? formatDate(task.dueDate) : "No due date assigned"}
        </InfoItem>

        {/* Created */}
        <InfoItem icon={<CalendarDays size={18} />} label="Created">
          {formatDate(task.createdAt)}
        </InfoItem>

        {/* Updated */}
        <InfoItem icon={<Clock3 size={18} />} label="Last Updated">
          {formatDate(task.updatedAt)}
        </InfoItem>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, children }) => (
  <div className="relative bg-slate-800/60 border border-slate-700 rounded-xl p-4">
    <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
      {icon}
      <span>{label}</span>
    </div>

    <div className="text-white font-medium">{children}</div>
  </div>
);

export default TaskInfoCard;
