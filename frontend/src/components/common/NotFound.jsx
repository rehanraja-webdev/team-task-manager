import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12 dark:bg-slate-950">
      <div className="w-full max-w-2xl text-center">
        <Link to="/" className="mb-12 inline-flex items-center gap-2">
          <img
            src="/logo/teamtask-icon.svg"
            alt="TeamTask"
            className="h-9 w-9"
          />

          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Team<span className="text-indigo-600">Task</span>
          </span>
        </Link>

        <div className="mb-8">
          <span
            className="
              select-none text-[9rem] font-black leading-none
              tracking-tighter text-slate-200
              dark:text-slate-800
              sm:text-[12rem]
            "
          >
            404
          </span>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-lg">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Page not found
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-500 dark:text-slate-400">
            The page you're looking for doesn't exist, has been moved, or you
            may not have permission to access it.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => navigate(-1)}
            className="
              inline-flex w-full items-center justify-center gap-2
              rounded-xl
              border border-slate-200
              bg-white
              px-5 py-3
              text-sm font-semibold text-slate-700
              shadow-sm
              transition
              hover:bg-slate-50
              hover:text-slate-900
              sm:w-auto
              dark:border-slate-800
              dark:bg-slate-900
              dark:text-slate-300
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >
            <ArrowLeft size={18} />
            Go back
          </button>

          <Link
            to="/"
            className="
              inline-flex w-full items-center justify-center gap-2
              rounded-xl
              bg-indigo-600
              px-5 py-3
              text-sm font-semibold text-white
              shadow-lg shadow-indigo-600/20
              transition
              hover:bg-indigo-700
              sm:w-auto
            "
          >
            <Home size={18} />
            Go to Home
          </Link>
        </div>

        <div
          className="
            mt-16 rounded-2xl
            border border-slate-200
            bg-white
            px-6 py-5
            text-left
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <div className="flex items-start gap-4">
            <div
              className="
                flex h-10 w-10 shrink-0 items-center justify-center
                rounded-xl
                bg-indigo-50
                text-indigo-600
                dark:bg-indigo-500/10
                dark:text-indigo-400
              "
            >
              <ArrowRight size={18} />
            </div>

            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                Looking for something?
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Return to TeamTask and continue managing your projects and
                tasks.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-8 text-xs text-slate-400 dark:text-slate-600">
          © {new Date().getFullYear()} TeamTask. All rights reserved.
        </p>
      </div>
    </main>
  );
};

export default NotFound;
