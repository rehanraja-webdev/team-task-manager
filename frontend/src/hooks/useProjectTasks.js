/*eslint-disable*/
import { useEffect, useState } from "react";
import { getProjectTasks } from "../services/project.service";
import toast from "react-hot-toast";

const useProjectTasks = (projectId, queryParams) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await getProjectTasks(projectId, queryParams);
      setTasks(res);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId, queryParams]);

  return { tasks, reloadTasks: fetchTasks, loadingTasks: loading };
};

export default useProjectTasks;
