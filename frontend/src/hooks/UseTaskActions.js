import toast from "react-hot-toast";
import {
  changeTaskStatus,
  createATask,
  createTaskComment,
  deleteTaskById,
} from "../services/task.service";
import { useState } from "react";

const useTaskActions = () => {
  const [loading, setLoading] = useState(false);

  const createTask = async (formData) => {
    try {
      setLoading(true);
      await createATask(formData);
      toast.success("Task created successfully!");
    } catch (error) {
      toast.error(error.response?.data.message || "Failed to create task!");
    } finally {
      setLoading(false);
    }
  };
  const updateTaskStatus = async (taskId, status) => {
    try {
      setLoading(true);
      const updateRes = await changeTaskStatus(taskId, status);
      toast.success(updateRes.message || `Task status updated to ${status}`);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setLoading(true);
      await deleteTaskById(taskId);
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data.message || "Unable to delete task");
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (taskId, data) => {
    try {
      setLoading(true);
      await createTaskComment(taskId, data);
      toast.success("Comment added!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to Add Comment");
    } finally {
      setLoading(false);
    }
  };

  return {
    createTask,
    deleteTask,
    updateTaskStatus,
    addComment,
    loading,
  };
};

export default useTaskActions;
