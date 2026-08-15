import {
  FolderKanban,
  CalendarDays,
  UserRound,
  Trash2,
  Pencil,
} from "lucide-react";
import formatDate from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProjectModal from "../Project Details/ProjectModal";
import LoadingSpinner from "../common/LoadingSpinner";

const ProjectInfoCard = ({
  project,
  role,
  deleteProject,
  updateProject,
  reloadProject,
  loading,
  fetching,
}) => {
  const navigate = useNavigate();
  const [modelActive, setModelActive] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    projectId: "",
  });

  if (fetching) return <LoadingSpinner />;

  if (!project) {
    return (
      <div className="p-4 text-slate-600 dark:text-slate-400">
        Loading project details...
      </div>
    );
  }

  const handleOpenModal = () => {
    setFormData({
      name: project?.name || "",
      description: project?.description || "",
      projectId: project?._id || "",
    });

    setModelActive(true);
  };

  const handleDelete = async () => {
    const confirmed = confirm("Do you want to delete this project?");
    if (!confirmed) return;

    await deleteProject(project._id);
    navigate(-1);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await updateProject(project._id, formData);

    setModelActive(false);

    await reloadProject();
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5 dark:border-slate-800">
        <div className="rounded-xl bg-purple-500/15 p-3">
          <FolderKanban className="text-purple-500" size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Project Information
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Overview of this project
          </p>
        </div>

        {role === "admin" && (
          <div className="ml-auto flex shrink-0 items-center gap-3 pt-1">
            {modelActive && (
              <ProjectModal
                modalActive={modelActive}
                onSubmit={handleUpdate}
                formData={formData}
                setFormData={setFormData}
                loading={loading}
                onClose={() => setModelActive(false)}
              />
            )}

            <button
              type="button"
              title="Edit project details"
              onClick={handleOpenModal}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <Pencil className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span>Edit</span>
            </button>

            <button
              onClick={handleDelete}
              title="Delete project permanently"
              type="button"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <InfoItem label="Project Name" value={project.name} />

        <InfoItem
          label="Owner"
          value={project.owner?.fullname || project.owner?.name || "N/A"}
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
        <h3 className="mb-3 text-sm uppercase tracking-wide text-slate-600 dark:text-slate-400">
          Description
        </h3>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/60">
          <p className="leading-7 text-slate-700 dark:text-slate-300">
            {project.description || "No description provided."}
          </p>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, icon }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/60">
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        {icon}
        <span>{label}</span>
      </div>

      <p className="mt-3 wrap-break-word text-lg font-semibold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
};

export default ProjectInfoCard;
