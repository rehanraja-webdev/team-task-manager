import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProjectHeader from "../components/Project Details/ProjectHeader";
import ProjectInfoCard from "../components/Project Details/ProjectInfoCard";
import MembersList from "../components/Project Details/MembersList";
import TaskList from "../components/Project Details/TaskList";
import useProject from "../hooks/useProject";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { project, loading } = useProject(projectId);

  if (loading) return <LoadingSpinner />;
  return (
    <div className="flex flex-col space-y-6">
      <ProjectHeader />

      <ProjectInfoCard project={project} />

      <MembersList />

      <TaskList projectId={projectId} />
    </div>
  );
};

export default ProjectDetails;
