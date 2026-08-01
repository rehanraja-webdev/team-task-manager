import { ArrowLeft, ArrowRight } from "lucide-react";
import ActivityCard from "./ActivityCard";

const ActivityList = ({ setPage, activities }) => {
  return (
    <div className="space-y-3">
      {activities?.activities?.map((activity) => (
        <ActivityCard key={activity._id} activity={activity} />
      ))}

      <div className="text-white flex justify-between items-center">
        {activities.currentPage > 1 && (
          <button
            onClick={() => setPage((currentPage) => currentPage - 1)}
            className="flex space-x-1 cursor-pointer hover:bg-slate-800 hover:text-amber-500 hover:space-x-1.5 transition-all duration-300 ease-in-out px-3 py-1 rounded-md"
          >
            <ArrowLeft /> <span>Prev</span>
          </button>
        )}

        {activities.hasMore && (
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
