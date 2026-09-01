const CompletionRateChart = ({ completionRate }) => {
  const rate = Math.min(Math.max(completionRate ?? 0, 0), 100);

  const radius = 90;
  const circumference = Math.PI * radius;
  const progress = circumference * (rate / 100);

  return (
    <div className="flex min-h-70 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Completion Rate
      </h2>

      <div className="relative mx-auto mt-4 w-full max-w-65">
        <svg
          viewBox="0 0 220 120"
          className="h-auto w-full overflow-visible"
          aria-label={`Project completion rate: ${rate}%`}
          role="img"
        >
          {/* Background */}
          <path
            d="M 20 110 A 90 90 0 0 1 200 110"
            fill="none"
            stroke="currentColor"
            strokeWidth="20"
            strokeLinecap="round"
            className="text-slate-200 dark:text-slate-800"
          />

          {/* Progress */}
          <path
            d="M 20 110 A 90 90 0 0 1 200 110"
            fill="none"
            stroke="currentColor"
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="text-indigo-500 transition-all duration-700 ease-out"
          />
        </svg>

        {/* Percentage */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <span className="text-4xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400">
            {rate}%
          </span>
        </div>
      </div>

      <p className="text-center text-sm text-slate-600 dark:text-slate-400">
        Overall Project Progress
      </p>
    </div>
  );
};

export default CompletionRateChart;
