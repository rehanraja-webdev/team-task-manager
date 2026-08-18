import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/projects/ProjectCard";
import useProjects from "../hooks/useProjects";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProjectsHeader from "../components/projects/ProjectsHeader";
import ProjectsFilter from "../components/projects/ProjectsFilter";
import { useMemo, useState } from "react";
import useAuth from "../hooks/useAuth";
import Pagination from "../components/common/Pagination";
import { FolderPlus, SearchX, Plus } from "lucide-react";

const Projects = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  const params = useMemo(
    () => ({
      page,
      limit: 10,
    }),
    [page],
  );

  const { projectList, pagination, loading } = useProjects(params);
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner />;

  const currentPage = pagination?.currentPage || page;
  const totalPages = pagination?.totalPages || 1;
  const projects = projectList || [];
  const isAdmin = user?.role === "admin";

  const filterProjects = projects.filter(
    (project) =>
      project.name?.toLowerCase().includes(filter.toLowerCase()) ||
      project.description?.toLowerCase().includes(filter.toLowerCase()) ||
      project.owner?.fullname?.toLowerCase().includes(filter.toLowerCase()),
  );

  const isFiltering = filter.trim().length > 0;

  return (
    <div className="space-y-6">
      <ProjectsHeader navigate={navigate} role={user?.role} />

      {projects.length > 0 && <ProjectsFilter setFilter={setFilter} />}

      {filterProjects.length > 0 ? (
        <>
          <div className="grid gap-6 xl:grid-cols-2">
            {filterProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
          <Pagination
            totalPages={totalPages}
            setPage={setPage}
            currentPage={currentPage}
          />
        </>
      ) : (
        /* Empty State */
        <div className="flex min-h-95 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center dark:border-slate-800 dark:bg-slate-900/40">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
            {isFiltering ? <SearchX size={28} /> : <FolderPlus size={28} />}
          </div>

          <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
            {isFiltering ? "No matching projects" : "No projects yet"}
          </h3>

          <p className="mt-1.5 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            {isFiltering
              ? `No projects match "${filter}". Try adjusting your search term or clearing the filter.`
              : isAdmin
                ? "Get started by creating your first project to organize tasks and manage team work."
                : "There are currently no active projects assigned to you or your team."}
          </p>

          <div className="mt-6 flex items-center gap-3">
            {isFiltering ? (
              <button
                type="button"
                onClick={() => setFilter("")}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Clear Search
              </button>
            ) : (
              isAdmin && (
                <button
                  type="button"
                  onClick={() => navigate("create")}
                  title="Create New Project"
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                  <Plus size={16} />
                  Create Project
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
