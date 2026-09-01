import { Search } from "lucide-react";

const ActivityFilters = ({ filter, setFilter }) => {
  return (
    <div className="flex space-x-4">
      <div className="relative w-[75%]">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type="text"
          value={filter.search}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, search: e.target.value }))
          }
          placeholder="Search activities..."
          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 text-slate-900 dark:text-white placeholder-slate-500 outline-none focus:border-purple-500"
        />
      </div>

      <select
        onChange={(e) =>
          setFilter((prev) => ({ ...prev, selected: e.target.value }))
        }
        className="bg-white dark:bg-slate-900 lg:w-[25%] border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-purple-500"
      >
        <option value="all">All</option>
        <option value="project">Project</option>
        <option value="task">Task</option>
        <option value="comment">Comment</option>
        <option value="member">Member</option>
      </select>
    </div>
  );
};

export default ActivityFilters;
