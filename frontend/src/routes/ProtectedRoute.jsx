import LoadingSpinner from "../components/common/LoadingSpinner";
import SEO from "../components/SEO";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <SEO noIndex />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
