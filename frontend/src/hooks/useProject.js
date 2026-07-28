/* eslint-disable*/
import { useEffect, useState } from "react";
import { getProject, getProjectMembers } from "../services/project.service";
import toast from "react-hot-toast";

const useProject = (projectId) => {
  const [fetching, setFetching] = useState(true);
  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);

  const fetchProject = async () => {
    try {
      const projectRes = await getProject(projectId);

      setProject(projectRes);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error while fetching project!",
      );
    } finally {
      setFetching(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const membersRes = await getProjectMembers(projectId);
      setMembers(membersRes);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error while fetching members!",
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!projectId) return;

    const loadData = async () => {
      setFetching(true);
      try {
        await Promise.all([fetchProject(), fetchMembers()]);
      } finally {
        setFetching(false);
      }
    };

    loadData();
  }, [projectId]);

  return {
    project,
    members,
    fetching,
    reloadProject: fetchProject,
    reloadMembers: fetchMembers,
  };
};

export default useProject;
