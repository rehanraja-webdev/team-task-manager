/*eslint-disable*/
import { useEffect, useState } from "react";
import { getTasks } from "../services/task.service";
import toast from "react-hot-toast";

const useTasks = (view) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await getTasks(view);
      setTasks(response);
    } catch (error) {
      toast.error(error.response?.data?.message, "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [view]);

  return { tasks, loading, reloadTasks: fetchTasks };
};

export default useTasks;
