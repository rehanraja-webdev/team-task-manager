import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HelpCircle, X, FolderPlus } from "lucide-react";

import useProject from "../hooks/useProject";
import useTaskActions from "../hooks/useTaskActions";
import useProjects from "../hooks/useProjects";

const CreateTask = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const { createTask, loading } = useTaskActions();

  const projectParams = useMemo(() => ({ mode: "options" }), []);
  const { projectList } = useProjects(projectParams);

  const [showHelp, setShowHelp] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    projectId: projectId || "",
    priority: "medium",
    dueDate: "",
  });

  const { members, reloadMembers } = useProject(formData.projectId);

  useEffect(() => {
    if (!formData.projectId) return;

    const fetchMembers = async () => {
      await reloadMembers(formData.projectId);
    };

    fetchMembers();
    // eslint-disable-next-line
  }, [formData.projectId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createTask(formData);
    navigate(-1);
  };

  if (projectList.length === 0) {
    return (
      <div
        className="
          relative mx-auto max-w-4xl rounded-3xl p-8
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
        "
      >
        <div className="flex min-h-80 flex-col items-center justify-center text-center">
          <div
            className="
              mb-5 flex h-16 w-16 items-center justify-center
              rounded-2xl
              bg-purple-100 text-purple-600
              dark:bg-purple-500/10 dark:text-purple-400
            "
          >
            <FolderPlus size={30} />
          </div>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            No Project Available
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
            You need to create a project before you can create a task. Create a
            project first, then you can create and assign tasks to your team
            members.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard/projects/create")}
            className="
              mt-6 inline-flex items-center gap-2
              rounded-xl bg-purple-600 px-6 py-3
              text-sm font-medium text-white
              transition hover:bg-purple-500
              focus:outline-none focus:ring-2
              focus:ring-purple-500/30
            "
          >
            <FolderPlus size={18} />
            Create Project
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              mt-3 rounded-xl px-5 py-2
              text-sm font-medium
              text-slate-500
              transition hover:text-slate-900
              dark:text-slate-400
              dark:hover:text-white
            "
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        relative mx-auto max-w-4xl rounded-3xl p-8
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
      "
    >
      {/* Help button */}
      <button
        type="button"
        onClick={() => setShowHelp(true)}
        aria-label="Task creation information"
        className="
          absolute right-6 top-6
          flex h-9 w-9 items-center justify-center
          rounded-full
          border border-slate-200
          bg-slate-50
          text-slate-500
          transition
          hover:border-purple-300
          hover:bg-purple-50
          hover:text-purple-600
          dark:border-slate-700
          dark:bg-slate-800
          dark:text-slate-400
          dark:hover:border-purple-500/50
          dark:hover:bg-purple-500/10
          dark:hover:text-purple-400
        "
      >
        <HelpCircle size={19} />
      </button>

      {/* Help modal */}
      {showHelp && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-slate-950/50
            px-4 backdrop-blur-sm
          "
          onClick={() => setShowHelp(false)}
        >
          <div
            className="
              relative w-full max-w-md
              rounded-2xl
              border border-slate-200
              bg-white p-6 shadow-2xl
              dark:border-slate-800
              dark:bg-slate-900
            "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowHelp(false)}
              aria-label="Close information"
              className="
                absolute right-4 top-4
                flex h-8 w-8 items-center justify-center
                rounded-lg
                text-slate-400
                transition
                hover:bg-slate-100
                hover:text-slate-700
                dark:hover:bg-slate-800
                dark:hover:text-white
              "
            >
              <X size={18} />
            </button>

            <div className="pr-8">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Before creating a task
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Make sure you have already created a project before creating a
                task. Every task belongs to a project and can be assigned to a
                member of that project.
              </p>

              <div
                className="
                  mt-4 rounded-xl
                  border border-purple-200
                  bg-purple-50 p-4
                  dark:border-purple-500/20
                  dark:bg-purple-500/10
                "
              >
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  💡 Tip
                </p>

                <p className="mt-1 text-sm leading-6 text-purple-600 dark:text-purple-400">
                  No project yet? Create one first, then return here to create
                  and assign your task.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
        Create <span className="text-purple-500">Task</span>
      </h1>

      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Create and assign a new task to a team member.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
            Task Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Design Dashboard UI"
            className="
              w-full rounded-xl px-4 py-3 outline-none
              bg-slate-50 dark:bg-slate-950
              border border-slate-200 dark:border-slate-700
              text-slate-900 dark:text-white
              placeholder-slate-400 dark:placeholder-slate-500
              focus:border-purple-500
              focus:ring-2 focus:ring-purple-500/20
            "
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
            Description
          </label>

          <textarea
            rows="3"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the task..."
            className="
              w-full resize-none rounded-xl px-4 py-3 outline-none
              bg-slate-50 dark:bg-slate-950
              border border-slate-200 dark:border-slate-700
              text-slate-900 dark:text-white
              placeholder-slate-400 dark:placeholder-slate-500
              focus:border-purple-500
              focus:ring-2 focus:ring-purple-500/20
            "
          />
        </div>

        {/* Projects */}
        {!projectId && (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Project
            </label>

            <select
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              className="
                w-full rounded-xl px-4 py-3 outline-none
                bg-slate-50 dark:bg-slate-950
                border border-slate-200 dark:border-slate-700
                text-slate-900 dark:text-white
                focus:border-purple-500
                focus:ring-2 focus:ring-purple-500/20
              "
              required
            >
              <option value="">Select Project</option>

              {projectList.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Assigned To */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
            Assign Member
          </label>

          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="
              w-full rounded-xl px-4 py-3 outline-none
              bg-slate-50 dark:bg-slate-950
              border border-slate-200 dark:border-slate-700
              text-slate-900 dark:text-white
              focus:border-purple-500
              focus:ring-2 focus:ring-purple-500/20
            "
            required
          >
            <option value="">Select Member</option>

            {members.map((member) => (
              <option key={member.user._id} value={member.user._id}>
                {member.user.fullname} ({member.user.email})
              </option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
            Priority
          </label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="
              w-full rounded-xl px-4 py-3 outline-none
              bg-slate-50 dark:bg-slate-950
              border border-slate-200 dark:border-slate-700
              text-slate-900 dark:text-white
              focus:border-purple-500
              focus:ring-2 focus:ring-purple-500/20
            "
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
            Due Date
          </label>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="
              w-full rounded-xl px-4 py-3 outline-none
              bg-slate-50 dark:bg-slate-950
              border border-slate-200 dark:border-slate-700
              text-slate-900 dark:text-white
              focus:border-purple-500
              focus:ring-2 focus:ring-purple-500/20
              dark:scheme-dark
            "
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            disabled={loading}
            onClick={() => navigate(-1)}
            className="
              rounded-xl px-6 py-3
              bg-slate-100 dark:bg-slate-800
              text-slate-600 dark:text-slate-300
              border border-slate-200 dark:border-slate-700
              hover:bg-slate-200 dark:hover:bg-slate-700
              hover:text-slate-900 dark:hover:text-white
              transition
              disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="
              rounded-xl px-6 py-3
              bg-purple-600 hover:bg-purple-500
              text-white
              transition
              disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
