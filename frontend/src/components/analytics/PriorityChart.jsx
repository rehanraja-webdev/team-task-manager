import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PriorityChart = ({ analytics }) => {
  const data = [
    {
      priority: "Low",
      tasks: analytics?.lowPriority || 0,
    },
    {
      priority: "Medium",
      tasks: analytics?.mediumPriority || 0,
    },
    {
      priority: "High",
      tasks: analytics?.highPriority || 0,
    },
  ];

  return (
    <div
      className="
      rounded-2xl
      border border-slate-200 dark:border-slate-800
      bg-white dark:bg-slate-900
      p-6
    "
    >
      <h2 className="mb-6 text-lg font-semibold text-slate-900 dark:text-white">
        Priority Distribution
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="4 4" stroke="var(--chart-grid)" />

          <XAxis dataKey="priority" tick={{ fill: "var(--chart-text)" }} />

          <YAxis tick={{ fill: "var(--chart-text)" }} />

          <Tooltip
            contentStyle={{
              backgroundColor: "var(--chart-tooltip-bg)",
              border: "1px solid var(--chart-tooltip-border)",
              borderRadius: "8px",
            }}
            labelStyle={{
              color: "var(--chart-text)",
            }}
          />

          <Bar dataKey="tasks" radius={[8, 8, 0, 0]} fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriorityChart;
