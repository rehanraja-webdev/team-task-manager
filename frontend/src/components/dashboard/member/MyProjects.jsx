import { FolderKanban, ArrowUpRight, CheckCircle2, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

const getStatusConfig = (status) => {
  const normalized = status?.toLowerCase();

  if (normalized === "completed" || normalized === "done") {
    return {
      label: "Completed",
      className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      icon: CheckCircle2,
    };
  }

  if (normalized === "in-progress") {
    return {
      label: "In Progress",
      className: "bg-sky-500/10 text-sky-500 border-sky-500/20",
      icon: Clock3,
    };
  }

  return {
    label: status || "Active",
    className: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    icon: FolderKanban,
  };
};

const MyProjects = ({ projects = [] }) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 dark:text-violet-400">
            <FolderKanban size={21} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              My Projects
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Projects you're working on
            </p>
          </div>
        </div>

        <Link
          to="/dashboard/projects"
          className="group inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400"
        >
          View all
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {/* Projects */}
      <div className="mt-6 space-y-3">
        {projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center dark:border-slate-800 dark:bg-slate-950/40">
            <FolderKanban
              size={28}
              className="mx-auto text-slate-400 dark:text-slate-600"
            />

            <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">
              No projects yet
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
              Projects you are a member of will appear here.
            </p>
          </div>
        ) : (
          projects.slice(0, 5).map((project) => {
            const status = getStatusConfig(project.status);
            const StatusIcon = status.icon;

            return (
              <Link
                key={project._id}
                to={`/dashboard/projects/${project._id}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-violet-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-violet-500/40"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    <FolderKanban size={18} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-800 transition-colors group-hover:text-violet-600 dark:text-slate-200 dark:group-hover:text-violet-400">
                      {project.name}
                    </h3>

                    {project.description && (
                      <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-500">
                        {project.description}
                      </p>
                    )}
                  </div>
                </div>

                <span
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${status.className}`}
                >
                  <StatusIcon size={12} />
                  {status.label}
                </span>
              </Link>
            );
          })
        )}
      </div>

      {/* Footer */}
      {projects.length > 0 && (
        <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
          <Link
            to="/dashboard/projects"
            className="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Explore all projects →
          </Link>
        </div>
      )}
    </section>
  );
};

export default MyProjects;
