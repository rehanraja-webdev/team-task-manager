/* eslint-disable */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTaskActions from "../../hooks/UseTaskActions";

const TaskModal = ({ modalActive, task, reloadTask, onClose, action }) => {
  if (!modalActive) return null;

  const { taskId } = useParams();
  const { updateTaskStatus, addComment, loading } = useTaskActions();

  const [status, setStatus] = useState("todo");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (modalActive && task) {
      setStatus(task.status);
      setContent("");
    }
  }, [modalActive, task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let success = false;

    if (action === "comment") {
      success = await addComment(taskId, { content });
    } else {
      success = await updateTaskStatus(taskId, { status });
    }

    if (success) {
      await reloadTask();
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={!loading ? onClose : undefined}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={!loading ? onClose : undefined}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            w-full max-w-sm rounded-2xl border
            border-slate-200 dark:border-slate-700
            bg-white dark:bg-slate-900
            p-6
            text-slate-900 dark:text-white
            shadow-2xl
          "
        >
          <h3 className="mb-5 text-lg font-semibold text-slate-900 dark:text-white">
            {action === "status" ? "Update Task Status" : "Add Comment"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {action === "status" ? (
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  disabled={loading}
                  className="
                    w-full rounded-xl border
                    border-slate-200 dark:border-slate-700
                    bg-slate-50 dark:bg-slate-950
                    px-4 py-3 text-sm
                    text-slate-900 dark:text-slate-200
                    outline-none
                    focus:border-indigo-500
                    focus:ring-1 focus:ring-indigo-500/30
                    disabled:cursor-not-allowed disabled:opacity-50
                  "
                >
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Comment
                </label>

                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Add a comment..."
                  disabled={loading}
                  required
                  className="
                    w-full rounded-xl border
                    border-slate-200 dark:border-slate-700
                    bg-slate-50 dark:bg-slate-950
                    px-4 py-3 text-sm
                    text-slate-900 dark:text-slate-200
                    placeholder-slate-400 dark:placeholder-slate-500
                    outline-none
                    focus:border-indigo-500
                    focus:ring-1 focus:ring-indigo-500/30
                    disabled:cursor-not-allowed disabled:opacity-50
                  "
                />
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="
                  rounded-lg px-4 py-2 text-sm
                  text-slate-600 dark:text-slate-300
                  transition
                  hover:bg-slate-100 dark:hover:bg-slate-800
                  hover:text-slate-900 dark:hover:text-white
                  disabled:cursor-not-allowed disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="
                  rounded-lg bg-indigo-600 px-4 py-2
                  text-sm font-medium text-white
                  transition hover:bg-indigo-500
                  disabled:cursor-not-allowed disabled:opacity-50
                "
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
