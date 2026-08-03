import { Search } from "lucide-react";

const ProjectsFilter = ({ setFilter }) => {
  return (
    <div className="relative w-full ">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

      <input
        type="text"
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search projects..."
        className="w-full rounded-md border border-gray-700 bg-gray-900 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
};

export default ProjectsFilter;
