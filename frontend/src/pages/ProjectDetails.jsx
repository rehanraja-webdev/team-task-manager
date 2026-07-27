import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProjectHeader from "../components/common/Project Details/ProjectHeader";
import ProjectInfoCard from "../components/common/Project Details/ProjectInfoCard";
import MembersList from "../components/common/Project Details/MembersList";
import TaskList from "../components/common/Project Details/TaskList";
import useProject from "../hooks/useProject";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { loading, project } = useProject(projectId);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col space-y-6">
      <ProjectHeader />

      <ProjectInfoCard project={project} />
      
      <MembersList project={project} />

      <TaskList projectId={projectId} />
    </div>
  );
};

export default ProjectDetails;
