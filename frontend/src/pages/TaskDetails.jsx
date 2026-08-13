import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import TaskHeader from "../components/taskDetails/TaskHeader";
import TaskInfoCard from "../components/taskDetails/TaskInfoCard";
import ActivityTimeline from "../components/taskDetails/ActivityTimeline";
import CommentList from "../components/taskDetails/CommentList";
import useTask from "../hooks/useTask";
import useTaskActions from "../hooks/useTaskActions";
import useAuth from "../hooks/useAuth";

const TaskDetails = () => {
  const { projectId, taskId } = useParams();
  const { user } = useAuth();
  const { task, activities, comments, reloadTask, fetchingTaskDetails } =
    useTask(taskId);
  const { deleteTask, loading } = useTaskActions();

  if (fetchingTaskDetails) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <TaskHeader
        role={user.role}
        projectId={projectId ? projectId : task.project._id}
        task={task}
        deleteTask={deleteTask}
        reloadTask={reloadTask}
        loading={loading}
      />

      <TaskInfoCard task={task} reloadTask={reloadTask} />

      <ActivityTimeline activities={activities} />

      <CommentList comments={comments} reloadTask={reloadTask} />
    </div>
  );
};

export default TaskDetails;
