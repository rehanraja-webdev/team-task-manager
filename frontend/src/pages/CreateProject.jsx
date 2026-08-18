import { useRef } from "react";
import useProjectActions from "../hooks/useProjectActions";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const CreateProject = () => {
  const { createProject, loading } = useProjectActions();
  const navigate = useNavigate();

  const { user } = useAuth();
  if (user.role !== "admin") {
    navigate(-1);
  }

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const description = descriptionRef.current.value;

    await createProject({ name, description });
    navigate(-1);
  };

  return (
    <div
      className="
        mx-auto max-w-2xl rounded-3xl border p-6 md:p-8 shadow-xl
        border-slate-200 bg-white
        dark:border-slate-800 dark:bg-slate-900
      "
    >
      {/* Header */}
      <h1
        className="
          text-3xl font-bold tracking-tight sm:text-4xl
          text-slate-900 dark:text-white
        "
      >
        Create{" "}
        <span className="text-purple-600 dark:text-purple-500">
          New Project
        </span>
      </h1>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Fill in the details below to set up your new project workspace.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Project Name */}
        <div>
          <label
            htmlFor="projectName"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Project Name
          </label>

          <input
            id="projectName"
            type="text"
            ref={nameRef}
            placeholder="e.g. E-Commerce Dashboard"
            disabled={loading}
            className="
              w-full rounded-xl border px-4 py-3
              text-sm outline-none transition duration-200
              border-slate-300 bg-slate-50
              text-slate-900 placeholder-slate-400
              focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
              disabled:cursor-not-allowed disabled:opacity-60
              dark:border-slate-700/80 dark:bg-slate-800/80
              dark:text-white dark:placeholder-slate-500
            "
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="projectDescription"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Description
          </label>

          <textarea
            id="projectDescription"
            rows={4}
            ref={descriptionRef}
            placeholder="Briefly describe the goals and scope of this project..."
            disabled={loading}
            className="
              w-full resize-none rounded-xl border px-4 py-3
              text-sm outline-none transition duration-200
              border-slate-300 bg-slate-50
              text-slate-900 placeholder-slate-400
              focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
              disabled:cursor-not-allowed disabled:opacity-60
              dark:border-slate-700/80 dark:bg-slate-800/80
              dark:text-white dark:placeholder-slate-500
            "
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4 text-sm font-medium">
          {/* Cancel */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={loading}
            className="
              w-full rounded-xl border px-4 sm:px-6 py-3
              transition-colors duration-200
              sm:w-auto
              border-slate-300
              bg-slate-100 text-slate-700
              hover:bg-slate-200 hover:text-slate-900
              focus:outline-none focus:ring-2 focus:ring-slate-400
              disabled:cursor-not-allowed disabled:opacity-50
              dark:border-slate-700
              dark:bg-slate-800 dark:text-slate-300
              dark:hover:bg-slate-700 dark:hover:text-white
              dark:focus:ring-slate-600
            "
          >
            Cancel
          </button>

          {/* Create */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full rounded-xl px-4 sm:px-6 py-3
              bg-purple-600 text-white
              shadow-lg shadow-purple-600/25
              transition-all duration-200
              hover:bg-purple-500
              active:bg-purple-700
              focus:outline-none focus:ring-2
              focus:ring-purple-500
              disabled:cursor-not-allowed disabled:opacity-50
              sm:w-auto
            "
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
