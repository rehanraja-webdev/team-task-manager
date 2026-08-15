import { NavLink } from "react-router-dom";
import { ArrowRight, Users, Calendar, User } from "lucide-react";
import formatDate from "../../utils/formatDate";

const ProjectCard = ({ project }) => {
  const memberCount = project.members?.length || 0;

  return (
    <div
      className="
        group relative flex flex-col justify-between
        rounded-2xl
        border border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900
        p-6
        transition-all duration-300
        hover:-translate-y-1
        hover:border-indigo-500/40
        hover:shadow-xl hover:shadow-indigo-500/10
      "
    >
      <div>
        {/* Header: Title & Action Button */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3
              className="
                text-xl font-bold tracking-tight
                text-slate-900 dark:text-white
                transition-colors duration-200
                group-hover:text-indigo-500 dark:group-hover:text-indigo-400
              "
            >
              {project.name}
            </h3>

            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {project.description || "No description provided."}
            </p>
          </div>

          <NavLink
            to={project._id}
            className="
              shrink-0 inline-flex items-center gap-2
              rounded-xl
              border border-slate-300 dark:border-slate-700
              bg-slate-100 dark:bg-slate-800
              px-3.5 py-2
              text-xs font-semibold
              text-slate-700 dark:text-slate-300
              transition-all duration-200
              hover:border-indigo-500
              hover:bg-indigo-600
              hover:text-white
              active:scale-95
            "
            title="View project details"
          >
            <span>View</span>

            <ArrowRight
              className="
                size-3.5
                transition-transform duration-200
                group-hover/btn:translate-x-1
              "
            />
          </NavLink>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/40 p-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="rounded-lg bg-slate-200 dark:bg-slate-800 p-2">
              <User className="size-4 text-indigo-500 dark:text-indigo-400" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Owner
              </p>

              <p className="truncate text-xs font-medium text-slate-800 dark:text-slate-200">
                {project.owner?.fullname || "Unassigned"}
              </p>
            </div>
          </div>

          {/* Team Members */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="
                rounded-lg
                bg-slate-200 dark:bg-slate-800
                p-2
              "
            >
              <Users className="size-4 text-purple-500 dark:text-purple-400" />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Team
              </p>

              <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                {memberCount} {memberCount === 1 ? "Member" : "Members"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="
          mt-6 flex items-center justify-between
          border-t border-slate-200 dark:border-slate-800
          pt-4
          text-xs
          text-slate-500 dark:text-slate-400
        "
      >
        <div className="flex items-center gap-1.5">
          <Calendar className="size-3.5 text-slate-500" />

          <span>Created {formatDate(project.createdAt)}</span>
        </div>

        <div className="text-[11px] text-slate-500">
          Updated {formatDate(project.updatedAt)}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
