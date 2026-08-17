import toast from "react-hot-toast";
import {
  changeTaskStatus,
  createATask,
  createTaskComment,
  deleteTaskById,
  updateTaskdetails,
} from "../services/task.service";
import { useState } from "react";

const useTaskActions = () => {
  const [loading, setLoading] = useState(false);
  const [updatedTask, setUpdatedTask] = useState([]);

  const createTask = async (formData) => {
    try {
      setLoading(true);
      await createATask(formData);
      toast.success("Task created successfully!");
      return true;
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

      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskId, formData) => {
    try {
      setLoading(true);
      const updatedRes = await updateTaskdetails(taskId, formData);
      setUpdatedTask(updatedRes);

      toast.success(updatedRes.message || "Task details updated!");
      return true;
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
      return true;
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
      return true;
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
    updateTask,
    addComment,
    updatedTask,
    loading,
  };
};

export default useTaskActions;
