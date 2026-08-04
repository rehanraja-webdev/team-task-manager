import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/projects/ProjectCard";
import useProjects from "../hooks/useProjects";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProjectsHeader from "../components/projects/ProjectsHeader";
import ProjectsFilter from "../components/projects/ProjectsFilter";
import { useState } from "react";

const Projects = () => {
  const { projects, loading } = useProjects();
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner />;

  const filterProjects = projects?.filter(
    (project) =>
      project.name.toLowerCase().includes(filter.toLowerCase()) ||
      project.description.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <ProjectsHeader navigate={navigate} />

      <ProjectsFilter setFilter={setFilter} />

      <div className="grid xl:grid-cols-2 gap-6">
        {filterProjects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
