import { useEffect, useState } from "react";
import { getProjects } from "../services/project.service";
import toast from "react-hot-toast";

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch projects",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return {
    projects,
    loading,
  };
};

export default useProjects;
