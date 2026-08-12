import { Outlet } from "react-router";
import Sidebar from "../components/layout/Sidebar";
import CollapsedSidebar from "../components/layout/CollapsedSidebar";
import MobileNavbar from "../components/layout/MobileNavbar";
import Footer from "../components/layout/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100 px-3 py-4 dark:bg-slate-950 md:p-6">
      <div className="flex flex-1">
        
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <div className="hidden md:block lg:hidden">
          <CollapsedSidebar />
        </div>

        <main className="min-w-0 flex-1 md:pl-4 lg:pl-6">
          <Outlet />
        </main>
      </div>
      <Footer />

      <div className="md:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
};

export default MainLayout;
