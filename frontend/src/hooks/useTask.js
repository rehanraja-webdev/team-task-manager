/*eslint-disable*/
import { useEffect, useState } from "react";
import {
  getTaskDetails,
  getTaskActivities,
  getTaskComments,
} from "../services/task.service";
import toast from "react-hot-toast";

const useTask = (taskId) => {
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [activities, setActivities] = useState([]);
  const [fetchingTaskDetails, setFetchingTaskDetails] = useState(true);

  const taskDetails = async () => {
    if (!taskId) return;
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
      setFetchingTaskDetails(false);
    }
  };

  useEffect(() => {
    taskDetails();
  }, [taskId]);

  return {
    task,
    reloadTask: taskDetails,
    activities,
    comments,
    fetchingTaskDetails,
  };
};

export default useTask;
