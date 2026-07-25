import { useEffect, useState } from "react";
import { getTaskDetails, getTaskActivities } from "../services/task.service";
import toast from "react-hot-toast";

const useTask = (taskId) => {
  const [task, setTask] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!taskId) return;

    const taskDetails = async () => {
      try {
        const [taskRes, activitiesRes] = await Promise.all([
          getTaskDetails(taskId),
          getTaskActivities(taskId),
        ]);

        setTask(taskRes);
        setActivities(activitiesRes);
      } catch (error) {
        toast.error(error.response?.data.message || "Error fetching task details");
      } finally {
        setLoading(false);
      }
    };

    taskDetails();
  }, [taskId]);

  return { task, activities, loading };
};

export default useTask;
