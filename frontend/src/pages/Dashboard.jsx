import DashboardHeader from "../components/dashboard/DashboardHeader";
import MemberDashboard from "../components/dashboard/member/MemberDashboard";
import AdminDashboard from "../components/dashboard/admin/AdminDashboard";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <DashboardHeader />

      {user.role === "member" && <MemberDashboard fullname={user.fullname} />}
      {user.role === "admin" && <AdminDashboard fullname={user.fullname} />}
    </div>
  );
};

export default Dashboard;
