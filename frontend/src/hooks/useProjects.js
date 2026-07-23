import { useEffect, useState } from "react";
import {
  createAProject,
  deleteProjectById,
  getProjects,
  addNewMember,
} from "../services/project.service";
import toast from "react-hot-toast";

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();

      setProjects(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProjects();
  }, []);

  const createProject = async (formData) => {
    try {
      const data = await createAProject(formData);

      setProjects(data);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      const data = await deleteProjectById(id);

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (id, email) => {
    try {
      const data = await addNewMember(id, email);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    fetchProjects,
    createProject,
    deleteProject,
    addMember,
  };
};

export default useProjects;
