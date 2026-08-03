import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/common/ProjectCard";
import useProjects from "../hooks/useProjects";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProjectsHeader from "../components/projects/ProjectsHeader";
import ProjectsFilter from "../components/projects/ProjectsFilter";

const Projects = () => {
  const { projects, loading } = useProjects();
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <ProjectsHeader navigate={navigate} />

      <ProjectsFilter />

      <div className="grid xl:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
