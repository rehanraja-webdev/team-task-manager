import { useState } from "react";
import toast from "react-hot-toast";
import {
  updateProfile as updateProfileService,
  changePassword as changePasswordService,
} from "../services/auth.service";
import useAuth from "./useAuth";

const useProfile = () => {
  const { checkAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const updateProfile = async (formData) => {
    try {
      setLoading(true);

      const res = await updateProfileService(formData);

      await checkAuth();

      toast.success(res.message || "Profile updated successfully!");

      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile!");

      return false;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (formData) => {
    try {
      setLoading(true);

      const res = await changePasswordService(formData);

      toast.success(res.message || "Password updated successfully!");

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to change password!",
      );

      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfile,
    changePassword,
    loading,
  };
};

export default useProfile;
