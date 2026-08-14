import { ArrowLeft, ArrowRight } from "lucide-react";

const Pagination = ({ totalPages, setPage, currentPage }) => {
  return (
    <div>
      {totalPages > 0 && (
        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4 dark:border-slate-800 sm:px-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage <= 1}
            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition ${
              currentPage <= 1
                ? "pointer-events-none opacity-30"
                : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-indigo-500/40 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
            }`}
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            Page{" "}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {currentPage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {totalPages}
            </span>
          </div>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={currentPage >= totalPages}
            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition ${
              currentPage >= totalPages
                ? "pointer-events-none opacity-30"
                : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-indigo-500/40 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
