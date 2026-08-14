import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  UserRound,
} from "lucide-react";

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const OverdueTasksTable = ({ data = [] }) => {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500 dark:text-rose-400">
            <AlertTriangle size={20} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Overdue Tasks
            </h2>

            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Tasks that require immediate attention
            </p>
          </div>
        </div>

        {/* Count */}
        <span className="inline-flex w-fit items-center rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
          {data.length} {data.length === 1 ? "task" : "tasks"}
        </span>
      </div>

      {/* Table */}
      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-190 text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/30">
                <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Task
                </th>

                <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Project
                </th>

                <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Assigned To
                </th>

                <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Priority
                </th>

                <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Due Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.map((task) => (
                <tr
                  key={task._id}
                  className="group transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-800/30"
                >
                  {/* Task */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                        <ClipboardList size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="max-w-60 truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {task.title}
                        </p>

                        <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-rose-500 dark:text-rose-400">
                          <AlertTriangle size={12} />
                          Overdue
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Project */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {task.project || "—"}
                    </span>
                  </td>

                  {/* Assigned To */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        <UserRound size={15} />
                      </div>

                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {task.assignedTo || "Unassigned"}
                      </span>
                    </div>
                  </td>

                  {/* Priority */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${
                        task.priority === "high"
                          ? "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400"
                          : task.priority === "medium"
                            ? "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {task.priority || "Low"}
                    </span>
                  </td>

                  {/* Due Date */}
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-rose-600 dark:text-rose-400">
                      <CalendarDays size={15} />

                      <span>{formatDate(task.dueDate)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400">
            <CheckCircle2 size={27} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
            Everything is on track
          </h3>

          <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500 dark:text-slate-400">
            There are currently no overdue tasks requiring your attention.
          </p>
        </div>
      )}

      {/* Footer */}
      {data.length > 0 && (
        <div className="border-t border-slate-200 px-6 py-3.5 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {data.length}
            </span>{" "}
            overdue {data.length === 1 ? "task" : "tasks"}
          </p>
        </div>
      )}
    </section>
  );
};

export default OverdueTasksTable;
