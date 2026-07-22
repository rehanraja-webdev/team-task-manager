const ProjectCard = ({ project }) => {
  const memberCount = project.members?.length || 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500 transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-white">{project.name}</h3>

          <p className="text-slate-400 mt-2 line-clamp-2">
            {project.description}
          </p>
        </div>

        <button className="text-slate-400 hover:text-white text-xl">⋮</button>
      </div>

      {/* Owner */}
      <div className="mt-5">
        <p className="text-xs text-slate-500 uppercase">Owner</p>

        <p className="text-slate-200 mt-1">{project.owner?.fullname}</p>
      </div>

      {/* Members */}
      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 uppercase">Team Members</p>

          <p className="text-slate-200 mt-1">{memberCount} Members</p>
        </div>

        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-medium">
          {memberCount}
        </div>
      </div>

      {/* Dates */}
      <div className="mt-5 border-t border-slate-800 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Created</span>

          <span className="text-slate-300">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex justify-between text-sm mt-2">
          <span className="text-slate-500">Updated</span>

          <span className="text-slate-300">
            {new Date(project.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
