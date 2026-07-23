import { useRef } from "react";
import useProjects from "../hooks/useProjects";
import { useNavigate } from "react-router";

const CreateProject = () => {
  const { createProject, loading } = useProjects();
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const description = descriptionRef.current.value;

    createProject({ name, description });
    navigate("/dashboard/projects");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl">
      {/* Header */}
      <h1 className="font-bold text-3xl sm:text-4xl text-white tracking-tight">
        Create <span className="text-purple-500">New Project</span>
      </h1>
      <p className="mt-2 text-slate-400 text-sm">
        Fill in the details below to set up your new project workspace.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Project Name Field */}
        <div>
          <label
            htmlFor="projectName"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Project Name
          </label>
          <input
            id="projectName"
            type="text"
            ref={nameRef}
            placeholder="e.g. E-Commerce Dashboard"
            className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            required
          />
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="projectDescription"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Description
          </label>
          <textarea
            id="projectDescription"
            rows={4}
            ref={descriptionRef}
            placeholder="Briefly describe the goals and scope of this project..."
            className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex items-center justify-end gap-4 font-medium text-sm">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white shadow-lg shadow-purple-600/25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
