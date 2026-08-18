/* eslint-disable */
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  changePasswordService,
} from "../services/auth.service";

import LoadingSpinner from "../components/common/LoadingSpinner";
import ThemeProvider from "./ThemeContext";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  // LOGIN
  const login = async (formData) => {
    try {
      const res = await loginUser(formData);

      setUser(res.data);

      toast.success("Login successful!");

      return res;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Login failed. Please try again.";

      toast.error(message);

      throw error;
    }
  };

  const register = async (formData) => {
    try {
      const res = await registerUser(formData);

      toast.success("Account created successfully!");

      return res;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(message);

      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();

      setUser(null);

      toast.success("Logged out successfully!");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Logout failed. Please try again.";

      toast.error(message);

      throw error;
    }
  };

  const changePassword = async (formData) => {
    try {
      await changePasswordService(formData);

      setUser(null);

      toast.success("Password Changed successfully!");
      return true;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Password change failed!";

      toast.error(message);

      throw error;
    }
  };

  const checkAuth = async () => {
    try {
      const res = await getUser();

      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    login,
    register,
    logout,
    changePassword,
    checkAuth,
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ThemeProvider>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </ThemeProvider>
  );
};

export default AuthProvider;
