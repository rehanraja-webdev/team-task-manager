import { Plus } from "lucide-react";
import { NavLink } from "react-router";

const TasksHeader = () => {
  return (
    <div className="flex items-center justify-between bg-slate-900 rounded-3xl p-6">
      <div className="text-white">
        <h1 className="text-4xl font-bold mb-2">Tasks</h1>
        <p className="text-slate-400">Manage and organize all your tasks.</p>
      </div>

      <div>
        <NavLink
          to="new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-medium text-sm hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98] transition-all duration-200"
        >
          <Plus className="size-4 stroke-[2.5]" />
          <span className="">Create Task</span>
        </NavLink>
      </div>
    </div>
  );
};

export default TasksHeader;
