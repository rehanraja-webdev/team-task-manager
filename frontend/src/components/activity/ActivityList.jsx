import { Activity, ArrowLeft, ArrowRight, History } from "lucide-react";
import ActivityCard from "./ActivityCard";

const ActivityList = ({ setPage, activities, filter }) => {
  const filterActivities = (data) => {
    const list = data?.activities || [];

    return list.filter((activity) => {
      const search = filter?.search?.trim().toLowerCase() || "";

      const selected = filter?.selected?.trim().toLowerCase() || "all";

      const actionText = activity.action?.toLowerCase() || "";

      const userName = activity.user?.fullname?.toLowerCase() || "";

      const matchesSearch =
        !search || actionText.includes(search) || userName.includes(search);

      let matchesSelected = false;

      if (selected === "all") {
        matchesSelected = true;
      } else if (selected === "task") {
        matchesSelected =
          actionText.includes("status") ||
          actionText.includes("task") ||
          !!activity.task;
      } else if (selected === "comment") {
        matchesSelected = actionText.includes("comment");
      } else if (selected === "member") {
        matchesSelected =
          actionText.includes("member") ||
          actionText.includes("removed") ||
          actionText.includes("added");
      } else if (selected === "project") {
        matchesSelected = actionText.includes("project");
      } else {
        matchesSelected = actionText.includes(selected);
      }

      return matchesSearch && matchesSelected;
    });
  };

  const filteredActivities = filterActivities(activities);

  const currentPage = activities?.currentPage || 1;
  const totalPages = activities?.totalPages || 1;

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 dark:border-slate-800 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Activity size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Activity Log
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Recent activity in your workspace
            </p>
          </div>
        </div>

        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
          {filteredActivities.length} shown
        </span>
      </div>

      {/* Activity List */}
      {filteredActivities.length > 0 ? (
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {filteredActivities.map((activity) => (
            <ActivityCard key={activity._id} activity={activity} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
            <History size={26} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
            No activities found
          </h3>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Try changing your search or activity filter.
          </p>
        </div>
      )}

      {/* Pagination */}
      {filteredActivities.length > 0 && (
        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4 dark:border-slate-800 sm:px-6">
          <button
            onClick={() => setPage((page) => Math.max(page - 1, 1))}
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
            onClick={() => setPage((page) => page + 1)}
            disabled={!activities?.hasMore}
            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition ${
              !activities?.hasMore
                ? "pointer-events-none opacity-30"
                : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-indigo-500/40 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </section>
  );
};

export default ActivityList;
