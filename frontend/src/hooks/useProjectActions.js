import { useState } from "react";
import toast from "react-hot-toast";
import {
  addNewMember,
  createAProject,
  deleteProjectById,
  removeMember,
  updateProjectById,
} from "../services/project.service";

const useProjectActions = () => {
  const [loading, setLoading] = useState(false);

  const createProject = async (formData) => {
    try {
      setLoading(true);
      await createAProject(formData);

      toast.success("Project created!");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create project!");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      setLoading(true);
      await deleteProjectById(id);

      toast.success("Project deleted!");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete project!");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (projectId, formData) => {
    try {
      setLoading(true);
      await updateProjectById(projectId, formData);
      toast.success("Project updated successfully!");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update project!");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (id, email) => {
    try {
      setLoading(true);
      await addNewMember(id, email);
      toast.success("Member added!");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Member addition failed!");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteMember = async (projectId, memberId) => {
    try {
      setLoading(true);
      await removeMember(projectId, memberId);
      toast.success("Member removed successfully!");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove member!");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createProject,
    deleteProject,
    updateProject,
    addMember,
    deleteMember,
    loading,
  };
};

export default useProjectActions;
