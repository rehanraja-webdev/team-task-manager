import { Search } from "lucide-react";

const ActivityFilters = () => {
  return (
    <div className="flex space-x-4">
      <div className="relative w-[75%]">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type="text"
          placeholder="Search activities..."
          className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-500 outline-none focus:border-purple-500"
        />
      </div>

      <select className="bg-slate-900 lg:w-[25%] border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500">
        <option value="">All</option>
        <option value="">Project</option>
        <option value="">Task</option>
        <option value="">Comment</option>
        <option value="">Member</option>
      </select>
    </div>
  );
};

export default ActivityFilters;
