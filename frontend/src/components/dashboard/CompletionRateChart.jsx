import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const CompletionRateChart = ({ completionRate }) => {
  const rate = Math.min(Math.max(completionRate ?? 0, 0), 100);

  const data = [
    { name: "Completed", value: rate },
    { name: "Remaining", value: 100 - rate },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
      <h2 className="text-white text-xl font-semibold">Completion Rate</h2>

      <div className="relative flex items-center justify-center h-48 mt-2">
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
              {/* Progress Color */}
              <Cell key="completed" fill="#818cf8" />
              {/* Track / Background Color */}
              <Cell key="remaining" fill="#1e293b" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Percentage Display */}
        <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-4xl font-extrabold text-indigo-400 tracking-tight">
            {rate}%
          </span>
        </div>
      </div>

      <p className="text-slate-400 text-sm text-center -mt-2">
        Overall Project Progress
      </p>
    </div>
  );
};

export default CompletionRateChart;
