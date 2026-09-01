import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProjectHeader from "../components/Project Details/ProjectHeader";
import ProjectInfoCard from "../components/Project Details/ProjectInfoCard";
import MembersList from "../components/Project Details/MembersList";
import TaskList from "../components/Project Details/TaskList";
import useProject from "../hooks/useProject";
import useProjectActions from "../hooks/useProjectActions";
import useProjectTasks from "../hooks/useProjectTasks";
import useAuth from "../hooks/useAuth";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { user } = useAuth();
  const { project, members, reloadMembers, reloadProject, fetching } =
    useProject(projectId);
  const { updateProject, deleteMember, deleteProject, loading } =
    useProjectActions();

  const [page, setPage] = useState(1);
  const queryParams = useMemo(() => {
    return new URLSearchParams({ page, limit: 10 }).toString();
  }, [page]);

  const { tasks, loadingTasks } = useProjectTasks(projectId, queryParams);

  if (fetching || loadingTasks) return <LoadingSpinner />;

  return (
    <div className="flex flex-col space-y-6">
      <ProjectHeader />

      <ProjectInfoCard
        project={project}
        role={user.role}
        updateProject={updateProject}
        deleteProject={deleteProject}
        reloadProject={reloadProject}
        loading={loading}
        fetching={fetching}
      />

      <MembersList
        members={members}
        role={user.role}
        deleteMember={deleteMember}
        reloadMembers={reloadMembers}
        projectId={projectId}
        loading={loading}
      />

      <TaskList role={user.role} tasks={tasks} page={page} setPage={setPage} />
    </div>
  );
};

export default ProjectDetails;
