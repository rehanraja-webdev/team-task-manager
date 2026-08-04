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
          className="h-10 w-10 rounded-full border-2 border-slate-700 object-cover"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl z-50">
          <div className="border-b border-slate-800 p-5">
            <div className="flex items-center gap-4">
              <img
                src={profileImg}
                alt="Profile"
                className="h-14 w-14 rounded-full border border-slate-700"
              />

              <div>
                <h3 className="font-semibold text-white">{user?.fullname}</h3>

                <p className="text-sm text-slate-400">{user?.email}</p>

                <span className="mt-2 inline-block rounded-full bg-indigo-600/20 px-2 py-1 text-xs text-indigo-300 capitalize">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          <div className="py-2">
            <Link
              to="profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-3 text-slate-300 hover:bg-slate-800 transition"
            >
              <User size={18} />
              My Profile
            </Link>

            <Link
              to="settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-3 text-slate-300 hover:bg-slate-800 transition"
            >
              <Settings size={18} />
              Settings
            </Link>

            <button
              onClick={logout}
              className="flex w-full cursor-pointer items-center gap-3 px-5 py-3 text-red-400 hover:bg-slate-800 transition"
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
