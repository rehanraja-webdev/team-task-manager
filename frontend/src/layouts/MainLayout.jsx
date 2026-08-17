import { Outlet } from "react-router";
import Sidebar from "../components/layout/Sidebar";
import CollapsedSidebar from "../components/layout/CollapsedSidebar";
import MobileNavbar from "../components/layout/MobileNavbar";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="flex min-h-screen gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <Sidebar />
        </aside>

        {/* Tablet Sidebar */}
        <aside className="hidden w-20 shrink-0 md:block lg:hidden">
          <CollapsedSidebar />
        </aside>

        {/* Main Application */}
        <div className="flex min-w-0 flex-1 flex-col">
          <Header />

          <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
};

export default MainLayout;
