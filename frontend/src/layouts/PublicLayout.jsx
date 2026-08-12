import { Outlet } from "react-router-dom";
import PublicFooter from "../components/layout/PublicFooter";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col">
      <main className="flex-1">
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
