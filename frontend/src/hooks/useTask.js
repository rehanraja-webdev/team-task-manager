import { useEffect, useState } from "react";
import { getTaskDetails } from "../services/task.service";
import toast from "react-hot-toast";

const useTask = (taskId) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!taskId) return;

    const getTask = async () => {
      try {
        const taskRes = await getTaskDetails(taskId);
        setTask(taskRes);
      } catch (error) {
        toast.error(error.message || "Error fetching task");
      } finally {
        setLoading(false);
      }
    };

    getTask();
  }, [taskId]);

  return { task, loading };
};

export default useTask;
