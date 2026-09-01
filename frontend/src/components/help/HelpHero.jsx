import { Search, HelpCircle } from "lucide-react";

const HelpHero = ({ search, setSearch }) => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
      <div className="relative z-10 max-w-2xl">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
          <HelpCircle size={26} />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          How can we help?
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Find answers, learn how TeamTask works, and get help managing your
          projects and tasks.
        </p>

        {/* Search */}
        <div className="relative mt-7">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search help articles..."
            className="
              w-full rounded-xl border py-3.5 pl-12 pr-4
              text-sm outline-none transition
              border-slate-200 bg-slate-50
              text-slate-900 placeholder-slate-400
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
              dark:border-slate-700 dark:bg-slate-800
              dark:text-white dark:placeholder-slate-500
            "
          />
        </div>
      </div>

      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
    </section>
  );
};

export default HelpHero;
