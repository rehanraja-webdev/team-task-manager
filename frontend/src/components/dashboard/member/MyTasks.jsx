import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Inbox,
  CalendarDays,
  CircleDot,
} from "lucide-react";

const getPriorityConfig = (priority) => {
  const configs = {
    high: {
      label: "High",
      className:
        "bg-rose-500/10 text-rose-500 border-rose-500/20 dark:text-rose-400",
    },
    medium: {
      label: "Medium",
      className:
        "bg-amber-500/10 text-amber-500 border-amber-500/20 dark:text-amber-400",
    },
    low: {
      label: "Low",
      className:
        "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 dark:text-emerald-400",
    },
  };

  return (
    configs[priority?.toLowerCase()] || {
      label: priority || "Unknown",
      className:
        "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
    }
  );
};

const getStatusConfig = (status) => {
  const normalized = status?.toLowerCase().replace("-", "");

  if (normalized === "done" || normalized === "completed") {
    return {
      label: "Completed",
      className:
        "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 dark:text-emerald-400",
      icon: CheckCircle2,
    };
  }

  if (normalized === "inprogress") {
    return {
      label: "In Progress",
      className:
        "bg-sky-500/10 text-sky-500 border-sky-500/20 dark:text-sky-400",
      icon: Clock3,
    };
  }

  return {
    label: "To Do",
    className:
      "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
    icon: CircleDot,
  };
};

const formatDueDate = (date) => {
  if (!date) return null;

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const isOverdue = (task) => {
  if (!task.dueDate || task.status === "done") return false;

  return new Date(task.dueDate) < new Date();
};

const MyTasks = ({ tasks = [] }) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              My Tasks
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your assigned work
            </p>
          </div>
        </div>

        <Link
          to="/dashboard/tasks"
          className="group inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-indigo-600 transition hover:bg-indigo-500/10 dark:text-indigo-400"
        >
          View all
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {/* Task List */}
      <div className="mt-6 space-y-3">
        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center dark:border-slate-800 dark:bg-slate-950/40">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <Inbox size={24} />
            </div>

            <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
              You're all caught up
            </h3>

            <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-slate-500 dark:text-slate-400">
              There are no tasks assigned to you right now.
            </p>
          </div>
        ) : (
          tasks.slice(0, 5).map((task) => {
            const priority = getPriorityConfig(task.priority);
            const status = getStatusConfig(task.status);
            const StatusIcon = status.icon;
            const overdue = isOverdue(task);

            return (
              <Link
                key={task._id}
                to={`/dashboard/tasks/${task._id}`}
                className="group block rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-indigo-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-indigo-500/40"
              >
                {/* Task title */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-800 transition-colors group-hover:text-indigo-600 dark:text-slate-200 dark:group-hover:text-indigo-400">
                      {task.title}
                    </h3>

                    {task.project?.name && (
                      <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-500">
                        {task.project.name}
                      </p>
                    )}
                  </div>

                  {/* Priority */}
                  <span
                    className={`shrink-0 rounded-lg border px-2 py-1 text-[10px] font-medium ${priority.className}`}
                  >
                    {priority.label}
                  </span>
                </div>

                {/* Task metadata */}
                <div className="mt-3 flex items-center justify-between gap-3">
                  {/* Status */}
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium ${status.className}`}
                  >
                    <StatusIcon size={12} />
                    {status.label}
                  </span>

                  {/* Due date */}
                  {task.dueDate && (
                    <div
                      className={`inline-flex items-center gap-1.5 text-[10px] ${
                        overdue
                          ? "font-medium text-rose-500 dark:text-rose-400"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      <CalendarDays size={13} />

                      <span>
                        {overdue ? "Overdue · " : "Due · "}
                        {formatDueDate(task.dueDate)}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
};

export default MyTasks;
