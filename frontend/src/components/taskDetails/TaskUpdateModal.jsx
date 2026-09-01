/* eslint-disable */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTaskActions from "../../hooks/useTaskActions";

const UpdateTaskModal = ({
  members,
  modalActive,
  task,
  reloadTask,
  onClose,
}) => {
  if (!modalActive) return null;

  const { taskId } = useParams();
  const { updateTask, loading } = useTaskActions();

  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "medium",
    assignedTo: task?.assignedTo?._id || "",
    dueDate: task?.dueDate ? task.dueDate.split("T")[0] : "",
  });

  useEffect(() => {
    if (modalActive && task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        assignedTo: task.assignedTo?._id || "",
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
      });
    }
  }, [modalActive, task]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : "",
    };

    const success = await updateTask(taskId, payload);

    if (success) {
      if (reloadTask) await reloadTask();
      onClose();
    }
  };

  return (
    <>
      <div
        onClick={!loading ? onClose : undefined}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      />

      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={!loading ? onClose : undefined}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          <h3 className="mb-5 text-lg font-semibold">Update Task Details</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-medium tracking-wider text-slate-500 dark:text-slate-400">
                Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Task title"
                disabled={loading}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium tracking-wider text-slate-500 dark:text-slate-400">
                Description
              </label>

              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Task description"
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium tracking-wider text-slate-500 dark:text-slate-400">
                Assigned To
              </label>

              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
              >
                {!formData.assignedTo && (
                  <option value="">Select Member</option>
                )}

                {members?.map((member) => (
                  <option key={member.user._id} value={member.user._id}>
                    {member.user.fullname} ({member.user.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium tracking-wider text-slate-500 dark:text-slate-400">
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium tracking-wider text-slate-500 dark:text-slate-400">
                Due Date
              </label>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="rounded-lg px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
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

export default UpdateTaskModal;
