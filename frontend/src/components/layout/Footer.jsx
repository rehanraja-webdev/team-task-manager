import { Mail, Heart, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
        {/* Main Footer */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/dashboard" className="inline-block">
              {/* Light */}
              <img
                src="/logo/teamtask-logo.svg"
                alt="TeamTask"
                className="h-11 w-auto dark:hidden"
              />

              {/* Dark */}
              <img
                src="/logo/teamtask-logo-white.svg"
                alt="TeamTask"
                className="hidden h-11 w-auto dark:block"
              />
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500 dark:text-slate-400">
              A simple project and task management platform that helps teams
              organize work, track progress, and stay productive.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
              Product
            </h3>

            <ul className="space-y-3">
              {[
                { label: "Dashboard", path: "/dashboard" },
                { label: "Projects", path: "/dashboard/projects" },
                { label: "My Tasks", path: "/dashboard/tasks" },
                { label: "Activities", path: "/dashboard/activities" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
              Support
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/dashboard/help"
                  className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                  Help & Support
                  <ArrowUpRight size={13} />
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/profile"
                  className="text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                  Profile
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/settings"
                  className="text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
              Connect
            </h3>

            <p className="mb-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Have feedback or want to connect? Find me here.
            </p>

            <div className="flex items-center gap-2.5">
              {/* GitHub */}
              <a
                href="https://github.com/rehanraja-webdev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-500/40 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
              >
                <FaGithub size={18} />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/rehan-raja-devs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-500/40 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
              >
                <FaLinkedin size={18} />
              </a>

              {/* Email */}
              <a
                href="mailto:rehanraja.dev@gmail.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-500/40 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {currentYear} TeamTask. All rights reserved.
          </p>

          <p className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            Built with
            <Heart size={13} className="fill-rose-500 text-rose-500" />
            for better teamwork.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
