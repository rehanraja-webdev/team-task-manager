import { useState } from "react";
import useProjects from "../../hooks/useProjects";

const ProjectCard = ({ project }) => {
  const memberCount = project.members?.length || 0;
  const [showMenu, setShowMenu] = useState(false);

  const { deleteProject } = useProjects();

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

        <div>
          {showMenu && (
            <OptionsModal
              id={project._id}
              deleteProject={deleteProject}
              showMenu={showMenu}
              onClose={() => setShowMenu(false)}
            />
          )}
          <button
            onClick={() => setShowMenu(true)}
            className="text-slate-400 cursor-pointer hover:text-white text-xl"
          >
            ⋮
          </button>
        </div>
      </div>

      {/* Owner & Members*/}
      <div className="mt-5 space-y-6 sm:flex sm:justify-between">
        <div>
          <p className="text-xs text-slate-500 uppercase">Owner</p>

          <p className="text-slate-200 mt-1">{project.owner?.fullname}</p>
        </div>
        <div>
          <div>
            <p className="text-xs text-slate-500 uppercase">Team Members</p>

            <p className="text-slate-200 mt-1">{memberCount} Members</p>
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="border-t border-slate-800 pt-4">
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

const OptionsModal = ({ showMenu, onClose, id, deleteProject }) => {
  if (!showMenu) return null;

  const handleDelete = () => {
    const confirmed = confirm("Do you want to delete this project?");

    if (!confirmed) return;
    deleteProject(id);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
        onClick={onClose}
      />

      <div className="absolute right-16 z-50 w-56 p-2 flex flex-col space-y-1 bg-slate-800 border border-slate-700 rounded-xl shadow-xl text-white">
        <button
          onClick={() => {
            console.log("View Details");
            onClose();
          }}
          className="w-full px-4 py-2 text-left text-sm text-slate-200 hover:bg-slate-700 hover:text-white rounded-lg transition"
        >
          View project details
        </button>

        <button
          onClick={handleDelete}
          className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition"
        >
          Delete Project
        </button>
      </div>
    </>
  );
};

export default ProjectCard;
