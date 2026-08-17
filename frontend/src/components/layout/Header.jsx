import { useState } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import { Menu, X, Sun, Moon, ChevronRight, LogOut, User } from "lucide-react";

import useTheme from "../../hooks/useTheme";
import useAuth from "../../hooks/useAuth";

import SearchBox from "../dashboard/SearchBox";
import NotificationDropdown from "../dashboard/NotificationDropdown";

import {
  adminLinks,
  memberLinks,
  generalLinks,
} from "../../constants/navigation";

const Header = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const getPageInfo = () => {
    const path = location.pathname;

    const pages = {
      "/dashboard": {
        title: "Dashboard",
        parent: null,
      },
      "/dashboard/tasks": {
        title: "Tasks",
        parent: "Dashboard",
      },
      "/dashboard/projects": {
        title: "Projects",
        parent: "Dashboard",
      },
      "/dashboard/activities": {
        title: "Activities",
        parent: "Dashboard",
      },
      "/dashboard/analytics": {
        title: "Analytics",
        parent: "Dashboard",
      },
      "/dashboard/profile": {
        title: "Profile",
        parent: "Dashboard",
      },
      "/dashboard/help": {
        title: "Help & Support",
        parent: "Dashboard",
      },
      "/dashboard/settings": {
        title: "Settings",
        parent: "Dashboard",
      },
      "/dashboard/notifications": {
        title: "Notifications",
        parent: "Dashboard",
      },
    };

    return (
      pages[path] || {
        title: "Dashboard",
        parent: null,
      }
    );
  };

  const { title, parent } = getPageInfo();

  const links = user?.role === "admin" ? adminLinks : memberLinks;

  const getInitials = (name = "") => {
    return name
      .trim()
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header
        className="
          sticky top-0 z-40
          border-b border-slate-200
          bg-white/90 backdrop-blur-xl
          dark:border-slate-800
          dark:bg-slate-950/90
        "
      >
        <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          {/* LEFT */}
          <div className="flex min-w-0 items-center gap-3">
            {/* Mobile menu */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              className="
                flex h-10 w-10 shrink-0 items-center justify-center
                rounded-xl
                text-slate-600
                transition
                hover:bg-slate-100
                hover:text-slate-900
                md:hidden
                dark:text-slate-400
                dark:hover:bg-slate-800
                dark:hover:text-white
              "
            >
              <Menu size={21} />
            </button>

            {/* Page information */}
            <div className="min-w-0">
              {/* Breadcrumb */}
              <div className="hidden items-center gap-1.5 text-xs text-slate-400 sm:flex dark:text-slate-500">
                <Link
                  to="/dashboard"
                  className="transition hover:text-indigo-500"
                >
                  Dashboard
                </Link>

                {parent && (
                  <>
                    <ChevronRight size={13} />
                    <span>{title}</span>
                  </>
                )}
              </div>

              {/* Page title */}
              <h1 className="truncate text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
                {title}
              </h1>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* Search */}
            <SearchBox />

            {/* Theme */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="
                hidden h-10 w-10 items-center justify-center
                rounded-xl
                text-slate-500
                transition
                hover:bg-slate-100
                hover:text-slate-900
                sm:flex
                dark:text-slate-400
                dark:hover:bg-slate-800
                dark:hover:text-white
              "
            >
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            {/* Notifications */}
            <NotificationDropdown />

            {/* Profile */}
            <Link
              to="/dashboard/profile"
              className="
                hidden h-10 w-10 items-center justify-center
                rounded-xl bg-indigo-600
                text-xs font-semibold text-white
                sm:flex
              "
              aria-label="Profile"
            >
              {user?.fullname ? getInitials(user.fullname) : <User size={17} />}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-60 md:hidden">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <aside
            className="
              absolute left-0 top-0 flex h-full w-[min(85vw,320px)]
              flex-col
              border-r border-slate-200
              bg-white
              shadow-2xl
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            {/* Drawer Header */}
            <div className="flex h-20 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800">
              <Link
                to="/dashboard"
                onClick={closeMenu}
                className="flex items-center gap-3"
              >
                <img
                  src="/logo/teamtask-icon.svg"
                  alt="TeamTask"
                  className="h-9 w-9"
                />

                <div>
                  <p className="text-base font-bold text-slate-900 dark:text-white">
                    TeamTask
                  </p>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Project Management
                  </p>
                </div>
              </Link>

              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close navigation menu"
                className="
                  flex h-9 w-9 items-center justify-center rounded-xl
                  text-slate-500 transition
                  hover:bg-slate-100 hover:text-slate-900
                  dark:text-slate-400 dark:hover:bg-slate-800
                  dark:hover:text-white
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* User */}
            <Link
              to="/dashboard/profile"
              onClick={closeMenu}
              className="
                mx-4 mt-5 flex items-center gap-3 rounded-2xl
                border border-slate-200 bg-slate-50 p-3
                transition hover:border-indigo-300 hover:bg-indigo-50
                dark:border-slate-800 dark:bg-slate-950
                dark:hover:border-indigo-500/40
                dark:hover:bg-indigo-500/10
              "
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                {user?.fullname ? (
                  getInitials(user.fullname)
                ) : (
                  <User size={17} />
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                  {user?.fullname || "User"}
                </p>

                <p className="text-xs capitalize text-slate-500 dark:text-slate-400">
                  {user?.role || "Member"}
                </p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Menu
              </p>

              <div className="space-y-1.5">
                {links.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      end={item.path === "/dashboard"}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                          isActive
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                        }`
                      }
                    >
                      <Icon size={19} />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>

              <p className="mb-3 mt-7 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                General
              </p>

              <div className="space-y-1.5">
                {generalLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                          isActive
                            ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                        }`
                      }
                    >
                      <Icon size={19} />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>

              {/* Mobile-only actions */}
              <div className="mt-7 border-t border-slate-200 pt-5 dark:border-slate-800">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="
                    flex w-full items-center gap-3 rounded-xl px-3 py-3
                    text-sm font-medium text-slate-600 transition
                    hover:bg-slate-100 hover:text-slate-900
                    dark:text-slate-400 dark:hover:bg-slate-800
                    dark:hover:text-white
                  "
                >
                  {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}

                  <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </button>
              </div>
            </nav>

            {/* Logout */}
            <div className="border-t border-slate-200 p-4 dark:border-slate-800">
              <button
                type="button"
                onClick={logout}
                className="
                  flex w-full items-center gap-3 rounded-xl px-3 py-3
                  text-sm font-medium text-red-500 transition
                  hover:bg-red-50 hover:text-red-600
                  dark:text-red-400 dark:hover:bg-red-500/10
                "
              >
                <LogOut size={19} />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Header;
