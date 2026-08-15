import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import TaskUpdateModal from "./TaskUpdateModal";
import useProject from "../../hooks/useProject";

const TaskHeader = ({
  role,
  projectId,
  task,
  deleteTask,
  reloadTask,
  loading,
}) => {
  const { members } = useProject(projectId);
  const [modalActive, setModalActive] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = confirm("Do you want to delete the task?");
    if (!confirmed) return;

    await deleteTask(task._id);
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-6 border-b border-slate-200 pb-6 dark:border-slate-800/80 sm:flex-row sm:items-start sm:justify-between">
      {modalActive && (
        <TaskUpdateModal
          modalActive={modalActive}
          members={members}
          task={task}
          reloadTask={reloadTask}
          onClose={() => setModalActive(false)}
        />
      )}

      <div className="flex-1 space-y-3">
        <Link
          to={-1}
          title="Move to previous page"
          className="group inline-flex items-center gap-2 text-sm font-medium text-purple-600 transition-colors hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back</span>
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {task?.title || "Untitled Task"}
          </h1>

          {task?.description && (
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {task.description}
            </p>
          )}
        </div>
      </div>

      {role === "admin" && (
        <div className="flex shrink-0 items-center gap-3 pt-1">
          <button
            onClick={() => setModalActive(true)}
            type="button"
            title="Edit task details"
            aria-label="Edit task"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-200 active:scale-95 dark:border-slate-700/60 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700/80"
          >
            <Pencil className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            <span>Edit</span>
          </button>

          <button
            onClick={handleDelete}
            type="button"
            title="Delete task permanently"
            disabled={loading}
            aria-label="Delete task"
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 shadow-sm transition-all duration-200 hover:border-red-300 hover:bg-red-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:border-red-500/30 dark:hover:bg-red-500/20"
          >
            <Trash2 className="h-4 w-4" />
            <span>{loading ? "Deleting..." : "Delete"}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskHeader;
