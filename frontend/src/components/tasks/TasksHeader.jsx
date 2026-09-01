import { Plus } from "lucide-react";
import { NavLink } from "react-router-dom";

const TasksHeader = ({ role }) => {
  return (
    <div className="flex items-center justify-between ">
      <div>
        <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">
          Tasks
        </h1>

        <p className="text-slate-600 dark:text-slate-400">
          Manage and organize all your tasks.
        </p>
      </div>

      {role === "admin" && (
        <NavLink
          to="new"
          title="Create new task"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-medium text-sm hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98] transition-all duration-200"
        >
          <Plus className="size-4 stroke-[2.5]" />
          <span className="hidden sm:block">Create Task</span>
        </NavLink>
      )}
    </div>
  );
};

export default TasksHeader;
