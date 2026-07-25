/*eslint-disable*/
import { useEffect, useState } from "react";
import { getProjectTasks } from "../services/project.service";
import toast from "react-hot-toast";

const useProjectTasks = (projectId) => {
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    try {
      const res = await getProjectTasks(projectId);
      setTasks(res.tasks);
    } catch (error) {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  return { tasks, reloadTasks: fetchTasks };
};

export default useProjectTasks;
