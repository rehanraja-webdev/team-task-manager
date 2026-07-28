import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import TaskHeader from "../components/taskDetails/TaskHeader";
import TaskInfoCard from "../components/taskDetails/TaskInfoCard";
import ActivityTimeline from "../components/taskDetails/ActivityTimeline";
import CommentList from "../components/taskDetails/CommentList";
import useTask from "../hooks/useTask";

const TaskDetails = () => {
  const { projectId, taskId } = useParams();

  const { task, activities, comments, reloadTask, loading } = useTask(taskId);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <TaskHeader task={task} projectId={projectId} />

      <TaskInfoCard task={task} />

      <ActivityTimeline activities={activities} />

      <CommentList comments={comments} reloadTask={reloadTask} />
    </div>
  );
};

export default TaskDetails;
