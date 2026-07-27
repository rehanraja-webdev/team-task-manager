/* eslint-disable*/
import { useEffect, useState } from "react";
import { getProject, getProjectTasks } from "../services/project.service";
import toast from "react-hot-toast";

const useProject = (projectId) => {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);

  const fetchProjectDetails = async () => {
    if (!projectId) return;

    try {
      const projectRes = await getProject(projectId);

      setProject(projectRes);
      setMembers(projectRes.members);
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
    project,
    members,
    loading,
    reloadProject: fetchProjectDetails,
  };
};

export default useProject;
