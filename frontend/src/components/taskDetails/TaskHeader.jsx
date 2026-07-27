import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../common/Modal";
import useTaskActions from "../../hooks/UseTaskActions";
import LoadingSpinner from "../common/LoadingSpinner";

const TaskHeader = ({ task }) => {
  const { deleteTask, loading } = useTaskActions(task._id);
  const [modalActive, setModalActive] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteTask(task._id);
    navigate(-1);
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between pb-6 border-b border-slate-800/80">
      {modalActive && (
        <Modal
          modalActive={modalActive}
          task={task}
          action="status"
          onClose={() => setModalActive(false)}
        />
      )}
      {/* Left Column: Navigation & Content */}
      <div className="flex-1 space-y-3">
        <Link
          to={-1}
          className="inline-flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back</span>
        </Link>

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {task?.title || "Untitled Task"}
          </h1>
          {task?.description && (
            <p className="mt-2 text-base text-slate-400 max-w-2xl leading-relaxed">
              {task.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0 pt-1">
        <button
          onClick={() => setModalActive(true)}
          type="button"
          aria-label="Edit task"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
        >
          <Pencil className="w-4 h-4 text-slate-400" />
          <span>Edit</span>
        </button>

        <button
          onClick={handleDelete}
          type="button"
          aria-label="Delete task"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default TaskHeader;
