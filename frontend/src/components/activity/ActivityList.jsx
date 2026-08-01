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

      <div className="text-white flex justify-between items-center">
        {activities?.currentPage > 1 && (
          <button
            onClick={() => setPage((currentPage) => currentPage - 1)}
            className="flex space-x-1 cursor-pointer hover:bg-slate-800 hover:text-amber-500 hover:space-x-1.5 transition-all duration-300 ease-in-out px-3 py-1 rounded-md"
          >
            <ArrowLeft /> <span>Prev</span>
          </button>
        )}

        {activities?.hasMore && (
          <div className="ml-auto">
            <button
              onClick={() => setPage((currentPage) => currentPage + 1)}
              className="flex space-x-1 cursor-pointer hover:bg-slate-800 hover:text-amber-500 hover:space-x-1.5 transition-all duration-300 ease-in-out px-3 py-1 rounded-md"
            >
              <span>Next</span> <ArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityList;
