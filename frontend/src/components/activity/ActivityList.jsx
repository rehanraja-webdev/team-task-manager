import { ArrowLeft, ArrowRight } from "lucide-react";
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

      // eslint-disable-next-line
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

  return (
    <div className="space-y-3">
      {filteredActivities?.map((activity) => (
        <ActivityCard key={activity._id} activity={activity} />
      ))}

      {filteredActivities?.length === 0 && (
        <p className="text-slate-400 text-center py-4">No activities found.</p>
      )}

      <div className="flex items-center justify-between border-t border-slate-800/80 pt-6 mt-8">
        <button
          onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 1))}
          disabled={!activities || activities?.currentPage <= 1}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border border-slate-800 ${
            !activities || activities?.currentPage <= 1
              ? "opacity-0 pointer-events-none"
              : "bg-slate-800/60 text-slate-300 hover:bg-purple-600 hover:text-white hover:border-purple-500 hover:shadow-md hover:shadow-purple-500/10 active:scale-95 cursor-pointer"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="text-xs sm:text-sm font-medium text-slate-400 bg-slate-800/40 border border-slate-800/60 px-3.5 py-1.5 rounded-full">
          Page{" "}
          <span className="text-purple-400 font-semibold">{activities.currentPage}</span>{" "}
          of <span className="text-slate-200 font-semibold">{activities.totalPages}</span>
        </div>

        <button
          onClick={() => setPage((currentPage) => currentPage + 1)}
          disabled={!activities?.hasMore}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border border-slate-800 ${
            !activities?.hasMore
              ? "opacity-0 pointer-events-none"
              : "bg-slate-800/60 text-slate-300 hover:bg-purple-600 hover:text-white hover:border-purple-500 hover:shadow-md hover:shadow-purple-500/10 active:scale-95 cursor-pointer"
          }`}
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ActivityList;
