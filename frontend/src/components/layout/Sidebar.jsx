import { LogOut } from "lucide-react";
import {
  adminLinks,
  memberLinks,
  generalLinks,
} from "../../constants/navigation";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { logout, user, loading } = useAuth();

  const links = user.role === "admin" ? adminLinks : memberLinks;

  return (
    <aside className="sticky top-6 h-[calc(100vh-3rem)] w-72 rounded-3xl border border-slate-800 bg-slate-900 p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          Team<span className="text-indigo-500">Task</span>
        </h1>

        <p className="mt-1 text-sm text-slate-400">Project Management</p>
      </div>

      {/* Menu */}
      <div>
        <p className="mb-3 text-xs uppercase tracking-wider text-slate-500">
          Menu
        </p>

        <ul className="space-y-2">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  end={item.path === "/dashboard"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
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
      <div className="mt-8">
        <p className="mb-3 text-xs uppercase tracking-wider text-slate-500">
          General
        </p>

        <ul className="space-y-2">
          {generalLinks.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <NavLink
                  to={`/dashboard${item.path}`}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
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

      {/* User Card */}
      <div className="mt-auto pt-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
          <div className="mb-4 flex items-center gap-3">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.fullname || "User",
              )}&background=4f46e5&color=fff`}
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />

            <div className="min-w-0">
              <h4 className="truncate font-medium text-white">
                {user?.fullname}
              </h4>

              <p className="text-xs capitalize text-slate-500">{user?.role}</p>
            </div>
          </div>

          <button
            onClick={logout}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 py-3 text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut size={18} />

            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
