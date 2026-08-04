import { NavLink } from "react-router-dom";
import { ArrowRight, Users, Calendar, User } from "lucide-react";
import formatDate from "../../utils/formatDate";

const ProjectCard = ({ project }) => {
  const memberCount = project.members?.length || 0;

  return (
    <div className="group relative bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 transition-all duration-300 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 flex flex-col justify-between">
      <div>
        {/* Header: Title & Action Button */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors duration-200">
              {project.name}
            </h3>
            <p className="text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed">
              {project.description || "No description provided."}
            </p>
          </div>

          <NavLink
            to={project._id}
            className="shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800/80 border border-slate-700/60 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 active:scale-95 transition-all duration-200 shadow-sm"
          >
            <span>View</span>
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </NavLink>
        </div>

        {/* Stats Row: Owner & Team Members */}
        <div className="mt-6 grid grid-cols-2 gap-4 p-3 rounded-xl bg-slate-800/40 border border-slate-800/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-slate-800 text-slate-400">
              <User className="size-4 text-indigo-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                Owner
              </p>
              <p className="text-xs font-medium text-slate-200 truncate">
                {project.owner?.fullname || "Unassigned"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-slate-800 text-slate-400">
              <Users className="size-4 text-purple-400" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                Team
              </p>
              <p className="text-xs font-medium text-slate-200">
                {memberCount} {memberCount === 1 ? "Member" : "Members"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Timeline Info */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <Calendar className="size-3.5 text-slate-500" />
          <span>Created {formatDate(project.createdAt)}</span>
        </div>
        <div className="text-slate-500 text-[11px]">
          Updated {formatDate(project.updatedAt)}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
