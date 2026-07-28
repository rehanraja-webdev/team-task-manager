/* eslint-disable*/
import { useEffect, useState } from "react";
import {
  getProject,
  getProjectMembers,
  getProjectTasks,
  removeProjectMember,
} from "../services/project.service";
import toast from "react-hot-toast";

const useProject = (projectId) => {
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId]);

  const removeMember = async (projectId, memberId) => {
    try {
      setLoading(true);
      await removeProjectMember(projectId, memberId);
      toast.success("Member removed successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    project,
    members,
    removeMember,
    loading,
    reloadProject: fetchProjectDetails,
  };
};

export default useProject;
