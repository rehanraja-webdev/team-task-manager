import { useEffect, useState } from "react";
import {
  getTaskDetails,
  getTaskActivities,
  getTaskComments,
  createTaskComment,
} from "../services/task.service";
import toast from "react-hot-toast";

const useTask = (taskId) => {
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!taskId) return;

    const taskDetails = async () => {
      try {
        const [taskRes, activitiesRes, commentsRes] = await Promise.all([
          getTaskDetails(taskId),
          getTaskActivities(taskId),
          getTaskComments(taskId),
        ]);

        setTask(taskRes);
        setActivities(activitiesRes);
        setComments(commentsRes);
      } catch (error) {
        toast.error(
          error.response?.data.message || "Error fetching task details",
        );
      } finally {
        setLoading(false);
      }
    };

    taskDetails();
  }, [taskId]);

  const addComment = async (taskId, data) => {
    setLoading(true);
    try {
      await createTaskComment(taskId, data);
    } catch (error) {
      toast.error(error.response?.data.message || "Failed to Add Comment");
    } finally {
      setLoading(false);
    }
  };

  return { task, activities, comments, addComment, loading };
};

export default useTask;
