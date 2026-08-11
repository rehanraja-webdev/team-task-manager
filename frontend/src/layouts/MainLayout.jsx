import { Outlet } from "react-router";
import Sidebar from "../components/layout/Sidebar";
import CollapsedSidebar from "../components/layout/CollapsedSidebar";
import MobileNavbar from "../components/layout/MobileNavbar";

const MainLayout = () => {
  return (
    <div className="dark:bg-slate-950 bg-slate-100 min-h-screen px-3 py-4 md:p-6">
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Tablet Sidebar */}
        <div className="hidden md:block lg:hidden">
          <CollapsedSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 lg:pl-6 md:pl-4 pb-20 md:pb-0">
          <Outlet />
        </main>
      </div>

      <div className="md:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
};

export default MainLayout;
