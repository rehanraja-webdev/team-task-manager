import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src="/logo/teamtask-logo-white.svg"
            alt="TeamTask"
            className="h-10 w-auto"
          />
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-500 dark:text-slate-400"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-500 dark:text-slate-400"
          >
            How It Works
          </a>

          <NavLink
            to="/help"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-500 dark:text-slate-400"
          >
            Help
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <NavLink
            to="/login"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 sm:block"
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500"
          >
            Get Started
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
