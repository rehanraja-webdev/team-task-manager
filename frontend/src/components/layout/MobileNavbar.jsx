import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { adminLinks, memberLinks } from "../../constants/navigation";
import { User } from "lucide-react";

const MobileNavbar = () => {
  const { user } = useAuth();

  const links =
    user.role === "admin" ? adminLinks.slice(0, 4) : memberLinks.slice(0, 4);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-800 md:hidden">
      <ul className="flex justify-around items-center h-16">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `flex flex-col items-center text-xs transition ${
                    isActive ? "text-indigo-500" : "text-slate-400"
                  }`
                }
              >
                <Icon size={22} />
                <span className="mt-1">{item.name}</span>
              </NavLink>
            </li>
          );
        })}

        <li>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs transition ${
                isActive ? "text-indigo-500" : "text-slate-400"
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
