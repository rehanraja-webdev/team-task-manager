import { useRef } from "react";
import useProjectActions from "../hooks/useProjectActions";
import { useNavigate, useParams } from "react-router-dom";

const AddProjectMember = () => {
  const { projectId } = useParams();
  const { addMember, loading } = useProjectActions();
  const emailRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;

    await addMember(projectId, email);
    navigate(-1);
  };

  return (
    <div
      className="
        max-w-2xl m-auto rounded-3xl p-6
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
      "
    >
      <h1 className="mb-5 text-4xl font-bold text-slate-900 dark:text-white">
        Add <span className="text-purple-500">Project Member</span>
      </h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="memberEmail"
            className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            Member's Email
          </label>

          <input
            id="memberEmail"
            type="email"
            ref={emailRef}
            placeholder="e.g. member@gmail.com"
            className="
              w-full rounded-xl px-4 py-3
              bg-slate-50 dark:bg-slate-950
              border border-slate-200 dark:border-slate-700
              text-slate-900 dark:text-white
              placeholder-slate-400 dark:placeholder-slate-500
              outline-none transition
              focus:border-purple-500
              focus:ring-2 focus:ring-purple-500/20
            "
            required
          />
        </div>

        <div className="flex items-center justify-end gap-4 pt-10 font-medium text-sm">
          <button
            onClick={() => navigate(-1)}
            type="button"
            disabled={loading}
            className="
              w-full sm:w-auto px-6 py-3 rounded-xl
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
              w-full sm:w-auto px-6 py-3 rounded-xl
              bg-purple-600 hover:bg-purple-500 active:bg-purple-700
              text-white
              shadow-lg shadow-purple-600/25
              transition
              disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            {loading ? "Adding..." : "Add Member"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectMember;
