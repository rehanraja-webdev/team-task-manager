import { Outlet } from "react-router-dom";
import PublicFooter from "../components/layout/PublicFooter";
import ScrollToTop from "../components/common/ScrollToTop";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col">
      <ScrollToTop />
      <main className="flex-1">
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
