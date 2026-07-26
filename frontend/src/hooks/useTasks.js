import { useEffect, useState } from "react";
import { getAssignedTasks } from "../services/task.service";
import toast from "react-hot-toast";

const useTasks = () => {
  const [assignTasks, setAssignTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const assignedTasks = async () => {
      try {
        const response = await getAssignedTasks();
        setAssignTasks(response);
      } catch (error) {
        toast.error(error.response?.data.message, "Error while loading tasks");
      } finally {
        setLoading(false);
      }
    };

    assignedTasks();
  }, []);

  return { assignTasks, loading };
};

export default useTasks;
