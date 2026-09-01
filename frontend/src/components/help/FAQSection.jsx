import { useState } from "react";
import { ChevronDown, SearchX } from "lucide-react";

const FAQItem = ({ article }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-none dark:border-slate-800">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-indigo-500">
            {article.category}
          </span>

          <h3 className="mt-1 font-medium text-slate-900 dark:text-white">
            {article.question}
          </h3>
        </div>

        <ChevronDown
          size={20}
          className={`shrink-0 text-slate-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="pb-5 pr-8 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {article.answer}
        </div>
      )}
    </div>
  );
};

const FAQSection = ({ articles, search }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {search
            ? `Showing results for "${search}"`
            : "Find answers to common TeamTask questions."}
        </p>
      </div>

      <div className="mt-4">
        {articles.length > 0 ? (
          articles.map((article) => (
            <FAQItem key={article.id} article={article} />
          ))
        ) : (
          <div className="flex flex-col items-center py-12 text-center">
            <SearchX size={40} className="text-slate-400" />

            <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
              No articles found
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Try searching with different keywords.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
