import { ClipboardList, FolderPlus, Plus } from "lucide-react";
import TaskCard from "../common/TaskCard";
import { NavLink } from "react-router-dom";

const TaskList = ({ tasks }) => {
  return (
    <div className="bg-slate-900 p-8 rounded-3xl text-white">
      {/* Task List Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-5 mb-8">
        <div className="p-3 bg-purple-600/15 rounded-xl text-purple-500">
          <ClipboardList size={24} />
        </div>

        <div>
          <h1 className="font-bold text-2xl">Task List</h1>
          <p className="text-sm text-slate-400">All tasks of this project</p>
        </div>

        <div className="ml-auto">
          <NavLink
            to="tasks/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-medium text-sm hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98] transition-all duration-200"
          >
            <Plus className="size-4 stroke-[2.5]" />
            <span className="hidden lg:inline-block">Create Task</span>
          </NavLink>
        </div>
      </div>

      {/* Task Content / Empty State */}
      {!tasks || tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-2xl bg-slate-800/40 border border-slate-800 border-dashed">
          <div className="p-4 rounded-full bg-slate-800 text-slate-400 mb-4">
            <FolderPlus size={32} />
          </div>
          <h3 className="text-lg font-semibold text-slate-200">
            No tasks created yet
          </h3>
          <p className="text-sm text-slate-400 max-w-110 mt-1">
            Currently this project has no task . Get started by creating a new
            task.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
