import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import {
  adminLinks,
  memberLinks,
  generalLinks,
} from "../../constants/navigation";

const CollapsedSidebar = () => {
  const { user, logout } = useAuth();

  const links = user.role === "admin" ? adminLinks : memberLinks;

  return (
    <aside className="sticky top-6 ml-6 z-40 flex h-[calc(100vh-3rem)] w-20 flex-col items-center rounded-3xl border border-slate-200 bg-white py-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <NavLink to="/" className="mb-6 shrink-0">
        <img
          src="/logo/teamtask-icon.svg"
          alt="TeamTask"
          className="h-10 w-10"
        />
      </NavLink>

      {/* Scrollable Container for both Top and Bottom sections */}
      <div className="flex w-full flex-1 flex-col items-center justify-between gap-6 overflow-y-auto no-scrollbar px-2">
        {/* Main Navigation */}
        <div className="flex flex-col items-center gap-3">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/dashboard"}
                title={item.name}
                className={({ isActive }) =>
                  `flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`
                }
              >
                <Icon size={22} />
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-auto flex flex-col items-center gap-3">
          {generalLinks.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                title={item.name}
                className={({ isActive }) =>
                  `flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`
                }
              >
                <Icon size={22} />
              </NavLink>
            );
          })}

          {/* Logout */}
          <button
            onClick={logout}
            title="Logout"
            className="
              flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center
              rounded-xl text-red-500 transition
              hover:bg-red-50 hover:text-red-600
              dark:text-red-400 dark:hover:bg-red-500/20
            "
          >
            <LogOut size={22} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CollapsedSidebar;
