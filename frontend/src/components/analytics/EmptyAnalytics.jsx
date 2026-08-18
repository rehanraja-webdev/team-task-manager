import { BarChart3, FolderPlus } from "lucide-react";

const EmptyAnalytics = ({ onCreate }) => {
  return (
    <div className="flex min-h-95 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center dark:border-slate-800 dark:bg-slate-900/40">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
        <BarChart3 size={28} />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
        No analytics available
      </h3>

      <p className="mt-1.5 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
        Create a project and start adding tasks to generate meaningful analytics
        for your workspace.
      </p>

      <button
        type="button"
        onClick={onCreate}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
      >
        <FolderPlus size={16} />
        Create Project
      </button>
    </div>
  );
};

export default EmptyAnalytics;
