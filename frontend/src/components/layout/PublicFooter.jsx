import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const PublicFooter = () => {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
                T
              </span>
              TeamTask
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
              A simple project and task management platform that helps teams
              organize work, track progress, and collaborate efficiently.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TeamTask on GitHub"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <FaGithub size={19} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TeamTask on LinkedIn"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <FaLinkedin size={19} />
              </a>

              <a
                href="mailto:contact@teamtask.app"
                aria-label="Contact TeamTask"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <Mail size={19} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Product
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="/#features"
                  className="text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                  Features
                </a>
              </li>

              <li>
                <Link
                  to="/help"
                  className="text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Account
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  to="/login"
                  className="text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                  Sign In
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} TeamTask. All rights reserved.
          </p>

          <p className="text-slate-500 dark:text-slate-400">
            Built for better teamwork.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
