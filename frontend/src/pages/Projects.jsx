import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/projects/ProjectCard";
import useProjects from "../hooks/useProjects";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProjectsHeader from "../components/projects/ProjectsHeader";
import ProjectsFilter from "../components/projects/ProjectsFilter";
import { useMemo, useState } from "react";
import useAuth from "../hooks/useAuth";
import Pagination from "../components/common/Pagination";

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

  const filterProjects = projects.filter(
    (project) =>
      project.name?.toLowerCase().includes(filter.toLowerCase()) ||
      project.description?.toLowerCase().includes(filter.toLowerCase()) ||
      project.owner?.fullname?.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <ProjectsHeader navigate={navigate} role={user?.role} />

      <ProjectsFilter setFilter={setFilter} />

      {filterProjects.length > 0 ? (
        <div className="grid xl:grid-cols-2 gap-6">
          {filterProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          No projects found.
        </div>
      )}

      <Pagination
        totalPages={totalPages}
        setPage={setPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Projects;
