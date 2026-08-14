import { useEffect, useState } from "react";
import { getProjects } from "../services/project.service";
import toast from "react-hot-toast";

const useProjects = (params) => {
  const [projectList, setProjectList] = useState([]);
  const [pagination, setPagination] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects(params);
        setProjectList(data.projects);
        setPagination(data.pagination);
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
