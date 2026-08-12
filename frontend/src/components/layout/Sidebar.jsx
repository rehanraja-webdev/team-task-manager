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
    <aside
      className="
        sticky top-6 flex h-[calc(100vh-3rem)] w-52 flex-col
        rounded-3xl border p-6
        bg-white border-slate-200
        dark:bg-slate-900 dark:border-slate-800
        lg:w-72 md:w-60
      "
    >
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Team<span className="text-indigo-500">Task</span>
        </h1>

        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Project Management
        </p>
      </div>

      {/* Menu */}
      <div>
        <p className="mb-3 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
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
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
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
        <p className="mb-3 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
          General
        </p>

        <ul className="space-y-2">
          {generalLinks.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
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

      <div className="mt-auto">
        <button
          onClick={logout}
          disabled={loading}
          className="
              flex w-full items-center justify-center gap-2 rounded-xl py-3
              bg-red-500/10 text-red-500
              transition
              hover:bg-red-500/20
              disabled:cursor-not-allowed disabled:opacity-50
              dark:text-red-400
            "
        >
          <LogOut size={18} />

          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
