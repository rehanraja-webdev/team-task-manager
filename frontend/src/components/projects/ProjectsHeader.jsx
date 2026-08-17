import { Plus } from "lucide-react";

const ProjectsHeader = ({ navigate, role }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          All Projects
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Manage all your projects in one place.
        </p>
      </div>

      {role === "admin" && (
        <button
          onClick={() => navigate("create")}
          className="sm:flex gap-2 items-center justify-between rounded-xl bg-indigo-500 dark:bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-600 dark:hover:bg-indigo-700 cursor-pointer"
          title="Create new project"
        >
          <Plus className="size-4 stroke-[2.5]" />
          <span className="hidden sm:inline-block"> New Project</span>
        </button>
      )}
    </div>
  );
};

export default ProjectsHeader;
