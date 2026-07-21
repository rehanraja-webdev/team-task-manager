import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r">Sidebar</aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
