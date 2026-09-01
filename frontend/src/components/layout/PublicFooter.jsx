import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const PublicFooter = () => {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800/80 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 dark:text-white dark:focus-visible:ring-offset-slate-950"
            >
              <img
                src="/logo/teamtask-logo-white.svg"
                alt="TeamTask"
                className="h-10 w-auto"
              />
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              A simple project and task management platform that helps teams
              organize work, track progress, and collaborate efficiently.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-2">
              <a
                href="https://github.com/rehanraja-webdev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TeamTask on GitHub"
                className="rounded-lg p-2 text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-white"
              >
                <FaGithub className="h-5 w-5 transition-transform hover:scale-110" />
              </a>

              <a
                href="https://www.linkedin.com/in/rehan-raja-devs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TeamTask on LinkedIn"
                className="rounded-lg p-2 text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-white"
              >
                <FaLinkedin className="h-5 w-5 transition-transform hover:scale-110" />
              </a>

              <a
                href="mailto:contact@teamtask.app"
                aria-label="Contact TeamTask"
                className="rounded-lg p-2 text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-white"
              >
                <Mail className="h-5 w-5 transition-transform hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Spacer column on wider screens */}
          <div className="hidden lg:block" />

          {/* Product Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Product
            </h3>

            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="/#features"
                  className="text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                  Features
                </a>
              </li>

              <li>
                <Link
                  to="/help"
                  className="text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Account
            </h3>

            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to="/login"
                  className="text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                  Sign In
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-8 text-xs text-slate-500 sm:flex-row dark:border-slate-800/80 dark:text-slate-400">
          <p>© {new Date().getFullYear()} TeamTask. All rights reserved.</p>
          <p className="font-medium text-slate-600 dark:text-slate-400">
            Built for better teamwork.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
