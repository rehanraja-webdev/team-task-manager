import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProjectHeader from "../components/Project Details/ProjectHeader";
import ProjectInfoCard from "../components/Project Details/ProjectInfoCard";
import MembersList from "../components/Project Details/MembersList";
import TaskList from "../components/Project Details/TaskList";
import useProject from "../hooks/useProject";
import useProjectActions from "../hooks/useProjectActions";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { project, members, reloadMembers, reloadProject, fetching } =
    useProject(projectId);
  const { updateProject, deleteMember, deleteProject, loading } =
    useProjectActions();

  if (fetching || loading) return <LoadingSpinner />;
  return (
    <div className="flex flex-col space-y-6">
      <ProjectHeader />

      <ProjectInfoCard
        project={project}
        updateProject={updateProject}
        deleteProject={deleteProject}
        reloadProject={reloadProject}
        loading={loading}
      />

      <MembersList
        members={members}
        deleteMember={deleteMember}
        reloadMembers={reloadMembers}
        projectId={projectId}
        loading={loading}
      />

      <TaskList projectId={projectId} />
    </div>
  );
};

export default ProjectDetails;
