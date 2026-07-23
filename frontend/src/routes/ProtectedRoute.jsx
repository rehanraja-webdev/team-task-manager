import LoadingSpinner from "../components/common/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
