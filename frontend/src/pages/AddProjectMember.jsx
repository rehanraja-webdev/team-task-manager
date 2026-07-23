import { useRef } from "react";
import useProjects from "../hooks/useProjects";
import { useNavigate, useParams } from "react-router-dom";

const AddProjectMember = () => {
  const { addMember, loading } = useProjects();
  const emailRef = useRef();
  const navigate = useNavigate();

  const { projectId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    addMember(projectId, email);
    navigate(-1);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="bg-slate-900 p-6 rounded-3xl">
        <h1 className="text-4xl text-white font-bold mb-5">
          Add <span className="text-purple-500">Project Member</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Member's Email
            </label>
            <input
              id="projectName"
              type="email"
              ref={emailRef}
              placeholder="e.g. member@gmail.com"
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              required
            />
          </div>

          <div className="pt-10 flex items-center justify-end gap-4 font-medium text-sm">
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
              Add Member
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProjectMember;
