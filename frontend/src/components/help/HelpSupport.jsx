import { Mail, MessageCircle } from "lucide-react";

const HelpSupport = () => {
  return (
    <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-500/20 dark:bg-indigo-500/5">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Still need help?
          </h2>

          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Can't find what you're looking for? Get in touch with us.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:support@teamtask.com"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            <Mail size={17} />
            Email Support
          </a>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <MessageCircle size={17} />
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default HelpSupport;
