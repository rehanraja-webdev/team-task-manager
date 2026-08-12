import { CheckSquare, Mail, Heart } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 lg:gap-12">
          {/* Column 1: Brand & Description */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2.5 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-500/30">
                <CheckSquare size={20} />
              </div>
              <span className="text-slate-900 dark:text-white">
                Team
                <span className="text-indigo-600 dark:text-indigo-400">
                  Task
                </span>
              </span>
            </Link>

            <p className="mt-3.5 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              A collaborative task management platform built to help teams
              organize work, track progress, and ship products faster.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Dashboard", path: "/dashboard" },
                { label: "Tasks", path: "/dashboard/tasks" },
                { label: "Projects", path: "/dashboard/projects" },
                { label: "Profile", path: "/dashboard/profile" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 focus:outline-none focus:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources & Support */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Resources
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="#documentation"
                  className="text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="#api"
                  className="text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                  API Status
                </Link>
              </li>
              <li>
                <Link
                  to="help"
                  className="text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Connect */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Connect
            </h3>
            <div className="flex items-center gap-2.5">
              <Link
                to="https://github.com/rehanraja-webdev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-500/40 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
              >
                <FaGithub size={18} />
              </Link>

              <Link
                to="https://www.linkedin.com/in/rehan-raja-devs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-500/40 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
              >
                <FaLinkedin size={18} />
              </Link>

              <Link
                to="mailto:rehanraja.dev@gmail.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-500/40 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
              >
                <Mail size={18} />
              </Link>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Designed for modern software teams.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400">
            © {currentYear} TeamTask. All rights reserved.
          </p>

          <p className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
            Made with{" "}
            <Heart size={14} className="fill-red-500 text-red-500 inline" /> for
            productive teams.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
