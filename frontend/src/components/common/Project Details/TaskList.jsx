import { ClipboardList } from "lucide-react";
import useProject from "../../../hooks/useProject";
import TaskCard from "./TaskCard";

const TaskList = ({ projectId }) => {
  const { tasks } = useProject(projectId);

  if (tasks.length === 0) return <p>No task found</p>;

  return (
    <div className="bg-slate-900 p-8 rounded-3xl text-white">
      <div className="flex items-center gap-3 border-b border-slate-800 p-5 mb-8">
        <div className="p-3 bg-purple-600/15 rounded-xl text-purple-500 size={24}">
          <ClipboardList />
        </div>

        <div className="">
          <h1 className="font-bold text-2xl">Task List </h1>
          <p className="text-sm text-slate-400">All task of this project</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
