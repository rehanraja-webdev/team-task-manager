import { ClipboardList, Plus, SearchX } from "lucide-react";

const EmptyTasks = ({
  role,
  isFiltering = false,
  search = "",
  onClear,
  onCreate,
}) => {
  const isAdmin = role === "admin";

  return (
    <div className="flex min-h-95 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center dark:border-slate-800 dark:bg-slate-900/40">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
        {isFiltering ? <SearchX size={28} /> : <ClipboardList size={28} />}
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
        {isFiltering ? "No matching tasks" : "No tasks yet"}
      </h3>

      <p className="mt-1.5 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
        {isFiltering
          ? `No tasks match "${search}". Try adjusting your search term or clearing the filters.`
          : isAdmin
            ? "Create your first task to start organizing and tracking your team's work."
            : "You don't have any tasks assigned to you yet. Tasks assigned by your project admin will appear here."}
      </p>

      <div className="mt-6 flex items-center gap-3">
        {isFiltering ? (
          <button
            type="button"
            onClick={onClear}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Clear Filters
          </button>
        ) : (
          isAdmin && (
            <button
              type="button"
              onClick={onCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              <Plus size={16} />
              Create Task
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default EmptyTasks;
