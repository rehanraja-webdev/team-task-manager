const ChartSkeleton = () => {
  return (
    <div className="flex h-full min-h-70 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="h-6 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

      <div className="flex flex-1 items-center justify-center">
        <div className="h-40 w-40 animate-pulse rounded-full border-20 border-slate-200 dark:border-slate-800" />
      </div>

      <div className="mx-auto h-4 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
    </div>
  );
};

export default ChartSkeleton;
