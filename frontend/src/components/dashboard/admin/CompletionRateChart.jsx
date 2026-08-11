import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const CompletionRateChart = ({ completionRate }) => {
  const rate = Math.min(Math.max(completionRate ?? 0, 0), 100);

  const data = [
    { name: "Completed", value: rate },
    { name: "Remaining", value: 100 - rate },
  ];

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Completion Rate
      </h2>

      <div className="relative mt-2 flex h-48 items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="70%"
              startAngle={180}
              endAngle={0}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              cornerRadius={6}
            >
              {/* Progress */}
              <Cell key="completed" fill="#818cf8" />

              {/* Track */}
              <Cell
                key="remaining"
                fill="currentColor"
                className="text-slate-200 dark:text-slate-800"
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Percentage */}
        <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 text-center">
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
