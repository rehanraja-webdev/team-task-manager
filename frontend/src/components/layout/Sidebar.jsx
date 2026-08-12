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
        sticky top-6 flex min-h-[calc(100vh-3rem)] w-52 flex-col
        rounded-3xl border p-6
        bg-white border-slate-200
        dark:bg-slate-900 dark:border-slate-800
        lg:w-72 md:w-60
      "
    >
      {/* Logo */}
      <div className="mb-8">
        <img
          src="/logo/teamtask-logo.svg"
          alt="TeamTask"
          className="h-12 w-auto dark:hidden"
        />

        <img
          src="/logo/teamtask-logo-white.svg"
          alt="TeamTask"
          className="hidden h-12 w-auto dark:block"
        />

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

      <div className="mt-auto pt-6">
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

      {/* User Card */}
      {/* 
        <div
          className="
            rounded-2xl border p-4
            bg-slate-50 border-slate-200
            dark:bg-slate-950 dark:border-slate-800
          "
        >
          <div className="mb-4 flex items-center gap-3">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.fullname || "User",
              )}&background=4f46e5&color=fff`}
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />

            <div className="min-w-0">
              <h4 className="truncate font-medium text-slate-900 dark:text-white">
                {user?.fullname}
              </h4>

              <p className="text-xs capitalize text-slate-500 dark:text-slate-400">
                {user?.role}
              </p>
            </div>
          </div>

          
        </div>
      </div> */}
    </aside>
  );
};

export default Sidebar;
