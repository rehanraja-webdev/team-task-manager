import DashboardHeader from "../components/dashboard/DashboardHeader";
import MemberDashboard from "../components/dashboard/member/MemberDashboard";
import AdminDashboard from "../components/dashboard/admin/AdminDashboard";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 ">
      <DashboardHeader />

      {user.role === "member" && <MemberDashboard />}
      {user.role === "admin" && <AdminDashboard />}
    </div>
  );
};

export default Dashboard;
