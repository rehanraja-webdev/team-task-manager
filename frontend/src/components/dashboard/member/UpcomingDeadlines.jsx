import { CalendarClock, AlertTriangle, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const getPriorityStyle = (priority) => {
  const styles = {
    high: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    low: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  };

  return (
    styles[priority?.toLowerCase()] ||
    "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
  );
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const isOverdue = (date) => {
  return new Date(date) < new Date();
};

const UpcomingDeadlines = ({ tasks = [] }) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <CalendarClock size={21} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Upcoming Deadlines
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tasks that need your attention
            </p>
          </div>
        </div>

        <Link
          to="/dashboard/tasks"
          className="group inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400"
        >
          View all
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {/* Tasks */}
      <div className="mt-6 space-y-3">
        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center dark:border-slate-800 dark:bg-slate-950/40">
            <CalendarClock
              size={28}
              className="mx-auto text-slate-400 dark:text-slate-600"
            />

            <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">
              No upcoming deadlines
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
              You're on track. Nothing needs your attention right now.
            </p>
          </div>
        ) : (
          tasks.slice(0, 5).map((task) => {
            const overdue = isOverdue(task.dueDate);

            return (
              <Link
                key={task._id}
                to={`/dashboard/tasks/${task._id}`}
                className="group block rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-indigo-500/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-800 group-hover:text-indigo-600 dark:text-slate-200 dark:group-hover:text-indigo-400">
                      {task.title}
                    </h3>

                    <span
                      className={`mt-2 inline-flex rounded-lg border px-2 py-1 text-[11px] font-medium capitalize ${getPriorityStyle(
                        task.priority,
                      )}`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <div
                    className={`flex shrink-0 items-center gap-1.5 text-xs font-medium ${
                      overdue
                        ? "text-rose-500"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {overdue && <AlertTriangle size={14} />}

                    <span>
                      {overdue ? "Overdue" : formatDate(task.dueDate)}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
};

export default UpcomingDeadlines;
