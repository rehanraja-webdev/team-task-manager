import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { adminLinks, memberLinks } from "../../constants/navigation";
import { User } from "lucide-react";

const MobileNavbar = () => {
  const { user } = useAuth();

  const links =
    user.role === "admin" ? adminLinks.slice(0, 4) : memberLinks.slice(0, 4);

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-50
        border-t
        border-slate-200 bg-white
        dark:border-slate-800 dark:bg-slate-900
        md:hidden
      "
    >
      <ul className="flex h-16 items-center justify-around">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `flex flex-col items-center text-xs transition ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-500"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`
                }
              >
                <Icon size={22} />

                <span className="mt-1">{item.name}</span>
              </NavLink>
            </li>
          );
        })}

        {/* Profile */}
        <li>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs transition ${
                isActive
                  ? "text-indigo-600 dark:text-indigo-500"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`
            }
          >
            <User size={22} />

            <span className="mt-1">Profile</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavbar;
