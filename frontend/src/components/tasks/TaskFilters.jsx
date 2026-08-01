import { Search } from "lucide-react";

const TaskFilters = ({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  sort,
  setSort,
}) => {
  return (
    <div className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Search */}

        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-500 outline-none focus:border-purple-500"
          />
        </div>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
        >
          <option value="">All Status</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        {/* Priority */}

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilters;
