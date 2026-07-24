/* eslint-disable*/
import { useEffect, useState } from "react";
import { getProject, getProjectTasks } from "../services/project.service";
import toast from "react-hot-toast";

const useProject = (projectId) => {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  const fetchProjectDetails = async () => {
    if (!projectId) return;

    try {
      const [projectRes, taskRes] = await Promise.all([
        getProject(projectId),
        getProjectTasks(projectId),
      ]);

      setProject(projectRes);
      setTasks(taskRes.tasks);
    } catch (error) {
      toast.error(error.response?.data.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId]);

  return {
    loading,
    project,
    tasks,
    reloadProject: fetchProjectDetails,
  };
};

export default useProject;
