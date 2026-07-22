import { Outlet } from "react-router";
import Sidebar from "../components/common/Sidebar";

const MainLayout = () => {
  return (
    <div className="bg-slate-950 min-h-screen p-6">
      <div className="flex">
        <Sidebar />

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
