import { Search } from "lucide-react";

const ProjectsFilter = ({ setFilter }) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />

      <input
        type="text"
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search projects..."
        className="
          w-full rounded-lg
          border border-slate-300 dark:border-slate-700
          bg-white dark:bg-slate-900
          py-3 pl-10 pr-4
          text-sm
          text-slate-900 dark:text-white
          placeholder-slate-500 dark:placeholder-slate-400
          focus:border-indigo-500
          focus:outline-none
          focus:ring-1 focus:ring-indigo-500
        "
      />
    </div>
  );
};

export default ProjectsFilter;
