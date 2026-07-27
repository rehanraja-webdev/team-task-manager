import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProject from "../hooks/useProject";
import useTaskActions from "../hooks/UseTaskActions";

const CreateTask = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { members } = useProject(projectId);
  const { createTask } = useTaskActions();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    projectId,
    priority: "medium",
    dueDate: "",
  });

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
    <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl p-8 border border-slate-800">
      <h1 className="text-4xl font-bold text-white">
        Create <span className="text-purple-500">Task</span>
      </h1>

      <p className="text-slate-400 mt-2">
        Create and assign a new task to a team member.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Title */}

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Task Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Design Dashboard UI"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
            required
          />
        </div>

        {/* Description */}

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Description
          </label>

          <textarea
            rows="3"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the task..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none resize-none focus:border-purple-500"
          />
        </div>

        {/* Assigned To */}

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Assign Member
          </label>

          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
            required
          >
            <option value="">Select Member</option>

            {members.map((member) => (
              <option key={member.user._id} value={member.user._id}>
                {member.user.fullname} ( {member.user.email} )
              </option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Priority
          </label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Due Date */}

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Due Date
          </label>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
          />
        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
