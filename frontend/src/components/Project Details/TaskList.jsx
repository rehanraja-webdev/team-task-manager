import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  FolderPlus,
  Plus,
} from "lucide-react";
import TaskCard from "../common/TaskCard";
import { NavLink } from "react-router-dom";

const TaskList = ({ role, tasks, setPage }) => {
  const currentPage = tasks?.currentPage || 1;
  const totalPages = tasks?.totalPages || 1;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-white">
      {/* Task List Header */}
      <div className="mb-8 flex items-center gap-3 border-b border-slate-200 pb-5 dark:border-slate-800">
        <div className="rounded-xl bg-purple-500/15 p-3 text-purple-500">
          <ClipboardList size={24} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">Task List</h1>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            All tasks of this project
          </p>
        </div>

        {role === "admin" && (
          <div className="ml-auto">
            <NavLink
              to="tasks/new"
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-500"
            >
              <Plus className="size-4 stroke-[2.5]" />

              <span className="hidden lg:inline-block">Create Task</span>
            </NavLink>
          </div>
        )}
      </div>

      {/* Empty State */}
      {!tasks?.tasks || tasks.tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-12 text-center dark:border-slate-800 dark:bg-slate-800/40">
          <div className="mb-4 rounded-full bg-slate-200 p-4 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <FolderPlus size={32} />
          </div>

          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            No tasks created yet
          </h3>

          <p className="mt-1 max-w-110 text-sm text-slate-500 dark:text-slate-400">
            Currently this project has no task. Get started by creating a new
            task.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
          {tasks.tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800/80">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage <= 1}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
              currentPage <= 1
                ? "pointer-events-none opacity-0"
                : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-purple-600 hover:text-white dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300"
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <div className="rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1.5 text-xs font-medium text-slate-500 dark:border-slate-800/60 dark:bg-slate-800/40 dark:text-slate-400 sm:text-sm">
            Page{" "}
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              {currentPage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900 dark:text-slate-200">
              {totalPages}
            </span>
          </div>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage >= totalPages}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
              currentPage >= totalPages
                ? "pointer-events-none opacity-0"
                : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-purple-600 hover:text-white dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300"
            }`}
          >
            <span>Next</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
