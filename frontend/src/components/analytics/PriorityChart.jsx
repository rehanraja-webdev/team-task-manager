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
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-lg font-semibold text-white">
        Priority Distribution
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="4 4" stroke="#334155" />

          <XAxis dataKey="priority" tick={{ fill: "#CBD5E1" }} />

          <YAxis tick={{ fill: "#CBD5E1" }} />

          <Tooltip />

          <Bar dataKey="tasks" radius={[8, 8, 0, 0]} fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriorityChart;
