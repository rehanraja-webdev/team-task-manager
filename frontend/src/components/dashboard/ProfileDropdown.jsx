import useAuth from "../../hooks/useAuth";
import { LogOut, Settings, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import profileImg from "../../assets/profile.png";

const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer"
      >
        <img
          src={profileImg}
          alt="Profile"
          className="h-10 w-10 rounded-full border-2 border-slate-300 object-cover dark:border-slate-700"
        />
      </button>

      {open && (
        <div
          className="
            absolute right-0 z-50 mt-3 w-72 overflow-hidden rounded-2xl
            border border-slate-200 bg-white shadow-2xl
            dark:border-slate-800 dark:bg-slate-900
          "
        >
          {/* Profile Info */}
          <div className="border-b border-slate-200 p-5 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <img
                src={profileImg}
                alt="Profile"
                className="h-14 w-14 rounded-full border border-slate-300 object-cover dark:border-slate-700"
              />

              <div className="min-w-0">
                <h3 className="truncate font-semibold text-slate-900 dark:text-white">
                  {user?.fullname}
                </h3>

                <p className="truncate text-sm text-slate-600 dark:text-slate-400">
                  {user?.email}
                </p>

                <span
                  className="
                    mt-2 inline-block rounded-full px-2 py-1 text-xs
                    capitalize
                    bg-indigo-50 text-indigo-700
                    dark:bg-indigo-600/20 dark:text-indigo-300
                  "
                >
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="py-2">
            <Link
              to="profile"
              onClick={() => setOpen(false)}
              className="
                flex items-center gap-3 px-5 py-3
                text-slate-700 transition hover:bg-slate-100
                dark:text-slate-300 dark:hover:bg-slate-800
              "
            >
              <User size={18} />
              My Profile
            </Link>

            <Link
              to="settings"
              onClick={() => setOpen(false)}
              className="
                flex items-center gap-3 px-5 py-3
                text-slate-700 transition hover:bg-slate-100
                dark:text-slate-300 dark:hover:bg-slate-800
              "
            >
              <Settings size={18} />
              Settings
            </Link>

            <button
              onClick={logout}
              className="
                flex w-full cursor-pointer items-center gap-3 px-5 py-3
                text-red-600 transition hover:bg-red-50
                dark:text-red-400 dark:hover:bg-red-500/10
              "
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
