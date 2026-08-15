import { useEffect, useState } from "react";
import { getProjects } from "../services/project.service";
import toast from "react-hot-toast";

const useProjects = (params = {}) => {
  const [projectList, setProjectList] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);

      try {
        const data = await getProjects(params);

        if (params.mode === "options") {
          setProjectList(data);
          setPagination(null);
        } else {
          setProjectList(data.projects);
          setPagination(data.pagination);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch projects",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [params]);

  return {
    projectList,
    pagination,
    loading,
  };
};

export default useProjects;
