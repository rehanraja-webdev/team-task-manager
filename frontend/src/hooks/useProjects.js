import { useEffect, useState } from "react";
import { getProjects } from "../services/project.service";
import toast from "react-hot-toast";

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const fetchProjects = async () => {
    setLoadingProjects(true);

    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch projects");
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchProjects();
  }, []);

  return {
    projects,
    loadingProjects,
    reloadProjects: fetchProjects,
  };
};

export default useProjects;
