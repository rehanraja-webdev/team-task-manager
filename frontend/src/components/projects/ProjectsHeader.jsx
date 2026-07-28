const ProjectsHeader = ({navigate}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold text-white">Projects</h1>

        <p className="text-slate-400 mt-2">
          Manage all your projects in one place.
        </p>
      </div>

      <button
        onClick={() => navigate("create")}
        className="bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl text-white"
      >
        + New Project
      </button>
    </div>
  );
};

export default ProjectsHeader;
