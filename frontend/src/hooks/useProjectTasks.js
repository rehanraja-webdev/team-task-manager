/*eslint-disable*/
import { useEffect, useState } from "react";
import { getProjectTasks } from "../services/project.service";

const useProjectTasks = (projectId) => {
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    const res = await getProjectTasks(projectId);
    setTasks(res.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  return { tasks, reloadTasks: fetchTasks };
};

export default useProjectTasks;
