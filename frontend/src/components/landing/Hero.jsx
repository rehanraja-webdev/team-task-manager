import { ArrowRight, CheckCircle2 } from "lucide-react";
import { NavLink } from "react-router";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute left-1/2 top-0 -z-10 h-125 w-175 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:py-28 lg:grid-cols-2 lg:px-8">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
            <CheckCircle2 size={16} />
            Simple project management for teams
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Manage projects.
            <br />
            <span className="text-indigo-500">Get work done.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            TeamTask helps teams organize projects, assign tasks, track
            progress, and collaborate efficiently — all from one simple
            workspace.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <NavLink
              to="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
            >
              Get Started Free
              <ArrowRight size={18} />
            </NavLink>

            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Explore Features
            </a>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">
            <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-950">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="h-3 w-28 rounded bg-slate-300 dark:bg-slate-700" />
                  <div className="mt-2 h-2 w-40 rounded bg-slate-200 dark:bg-slate-800" />
                </div>

                <div className="h-8 w-8 rounded-full bg-indigo-500/20" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-white p-4 dark:bg-slate-900">
                  <p className="text-xs text-slate-400">Projects</p>
                  <p className="mt-2 text-2xl font-bold">12</p>
                </div>

                <div className="rounded-xl bg-white p-4 dark:bg-slate-900">
                  <p className="text-xs text-slate-400">Tasks</p>
                  <p className="mt-2 text-2xl font-bold">48</p>
                </div>

                <div className="rounded-xl bg-white p-4 dark:bg-slate-900">
                  <p className="text-xs text-slate-400">Completed</p>
                  <p className="mt-2 text-2xl font-bold text-green-500">32</p>
                </div>
              </div>

              <div className="mt-3 rounded-xl bg-white p-5 dark:bg-slate-900">
                <div className="mb-4 flex items-center justify-between">
                  <div className="h-3 w-32 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-3 w-12 rounded bg-indigo-500/30" />
                </div>

                <div className="space-y-3">
                  <div className="h-3 rounded-full bg-indigo-500/70" />
                  <div className="h-3 w-3/4 rounded-full bg-indigo-500/40" />
                  <div className="h-3 w-1/2 rounded-full bg-indigo-500/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
