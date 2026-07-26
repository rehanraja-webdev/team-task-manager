import {
  FolderKanban,
  CalendarDays,
  UserRound,
  Trash2,
  Pencil,
} from "lucide-react";
import formatDate from "../../../utils/formatDate";
import useProjects from "../../../hooks/useProjects";
import { useNavigate } from "react-router";
import LoadingSpinner from "../LoadingSpinner";

const ProjectInfoCard = ({ project }) => {
  const { deleteProject, reloadProjects, loading } = useProjects();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = confirm("Do you want to delete this project?");
    if (!confirmed) return;

    await deleteProject(project._id);
    navigate(-1);
    await reloadProjects();
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 lg:col-span-2 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
        <div className="p-3 rounded-xl bg-purple-600/15">
          <FolderKanban className="text-purple-500" size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">Project Information</h2>
          <p className="text-slate-400 text-sm">Overview of this project</p>
        </div>

        <div className="flex items-center gap-3 shrink-0 pt-1 ml-auto">
          <button
            type="button"
            aria-label="Edit task"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
          >
            <Pencil className="w-4 h-4 text-slate-400" />
            <span>Edit</span>
          </button>

          <button
            onClick={handleDelete}
            type="button"
            aria-label="Delete task"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <InfoItem label="Project Name" value={project.name} />

        <InfoItem
          label="Owner"
          value={project.owner.fullname}
          icon={<UserRound size={16} />}
        />

        <InfoItem
          label="Created On"
          value={formatDate(project.createdAt)}
          icon={<CalendarDays size={16} />}
        />

        <InfoItem
          label="Last Updated"
          value={formatDate(project.updatedAt)}
          icon={<CalendarDays size={16} />}
        />
      </div>

      {/* Description */}
      <div className="mt-8">
        <h3 className="text-sm uppercase tracking-wide text-slate-500 mb-3">
          Description
        </h3>

        <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700">
          <p className="text-slate-300 leading-7">
            {project.description || "No description provided."}
          </p>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, icon }) => {
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
      <div className="flex items-center gap-2 text-slate-400 text-sm">
        {icon}
        <span>{label}</span>
      </div>

      <p className="mt-3 text-lg font-semibold text-white wrap-break-words">
        {value}
      </p>
    </div>
  );
};

export default ProjectInfoCard;
