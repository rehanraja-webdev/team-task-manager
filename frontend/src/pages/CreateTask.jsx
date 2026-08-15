import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProject from "../hooks/useProject";
import useTaskActions from "../hooks/UseTaskActions";
import useProjects from "../hooks/useProjects";

const CreateTask = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { createTask, loading } = useTaskActions();

  const projectParams = useMemo(() => ({ mode: "options" }), []);
  const { projectList } = useProjects(projectParams);

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

  return (
    <div
      className="
        max-w-4xl mx-auto rounded-3xl p-8
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
      "
    >
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
              Projects
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
            className="w-full rounded-xl px-4 py-3 outline-none bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:scheme-dark"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            disabled={loading}
            onClick={() => navigate(-1)}
            className="
              px-6 py-3 rounded-xl
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
              px-6 py-3 rounded-xl
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
