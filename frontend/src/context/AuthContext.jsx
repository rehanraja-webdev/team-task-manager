import { createContext, useEffect, useState } from "react";
import { getUser, loginUser, logoutUser } from "../services/auth.service";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (formData) => {
    const res = await loginUser(formData);

    setUser(res.data);
    return res;
  };

  const logout = async () => {
    await logoutUser();

    setUser(null);
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
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
