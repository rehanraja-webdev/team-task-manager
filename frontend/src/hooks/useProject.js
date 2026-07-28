/* eslint-disable*/
import { useEffect, useState } from "react";
import {
  getProject,
  getProjectMembers,
  getProjectTasks,
} from "../services/project.service";
import toast from "react-hot-toast";

const useProject = (projectId) => {
  const [fetching, setFetching] = useState(true);
  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);

  const fetchProjectDetails = async () => {
    if (!projectId) return;

    try {
      const [projectRes, memberRes] = await Promise.all([
        getProject(projectId),
        getProjectMembers(projectId),
      ]);

      setProject(projectRes);
      setMembers(memberRes);
    } catch (error) {
      toast.error(error.response?.data.message || "Something went wrong!");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId]);

  return {
    project,
    members,
    fetching,
    reloadProject: fetchProjectDetails,
  };
};

export default useProject;
