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
    <aside className="sticky top-6 h-[calc(100vh-3rem)] w-20 bg-slate-900 border border-slate-800 rounded-3xl py-6 flex flex-col items-center">
      {/* Logo */}

      <NavLink to="/dashboard">
        <h1 className="text-2xl font-bold text-indigo-500">T</h1>
      </NavLink>

      <div className="flex flex-col gap-3">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              title={item.name}
              className={({ isActive }) =>
                `w-12 h-12 rounded-xl flex items-center justify-center transition-all
                ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={22} />
            </NavLink>
          );
        })}
      </div>

      <div className="mt-auto flex flex-col gap-3">
        {generalLinks.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              title={item.name}
              className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white transition"
            >
              <Icon size={22} />
            </NavLink>
          );
        })}

        <button
          onClick={logout}
          title="Logout"
          className="w-12 h-12 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-500/20 transition cursor-pointer"
        >
          <LogOut size={22} />
        </button>
      </div>
    </aside>
  );
};

export default CollapsedSidebar;
