import {
  LayoutDashboard,
  FolderOpen,
  ClipboardList,
  ChartNoAxesCombined,
  Users,
  Settings,
  LifeBuoy,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Projects",
      icon: FolderOpen,
      path: "/projects",
    },
    {
      name: "Tasks",
      icon: ClipboardList,
      path: "/tasks",
    },
    {
      name: "Analytics",
      icon: ChartNoAxesCombined,
      path: "/analytics",
    },
    {
      name: "Team",
      icon: Users,
      path: "/team",
    },
  ];

  const generalItems = [
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
    {
      name: "Help",
      icon: LifeBuoy,
      path: "/help",
    },
  ];

  return (
    <aside className="sticky top-6 h-[calc(100vh-3rem)] md:w-72 w-52 bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          Team<span className="text-indigo-500">Task</span>
        </h1>

        <p className="text-sm text-slate-400 mt-1">Project Management</p>
      </div>

      {/* Menu */}
      <div>
        <p className="text-xs uppercase tracking-wider text-slate-500 mb-3">
          Menu
        </p>

        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200
                    ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* General */}
      <div className="mt-6">
        <p className="text-xs uppercase tracking-wider text-slate-500 mb-3">
          General
        </p>

        <ul className="space-y-2">
          {generalItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* User Card */}
      <div className="mt-4">
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="https://ui-avatars.com/api/?name=Rehan"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />

            <div>
              <h4 className="text-white font-medium">Rehan</h4>

              <p className="text-xs text-slate-500">Admin</p>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl py-3 transition-all">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
