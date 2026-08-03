import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Custom styled tooltip for dark theme matching
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg shadow-xl text-slate-200 text-sm">
        <p className="font-semibold text-white mb-1">{data.projectName}</p>
        <p className="text-violet-400">
          Tasks: <span className="font-bold text-white">{data.taskCount}</span>
        </p>
      </div>
    );
  }
  return null;
};

const ProjectChart = ({ data }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white tracking-wide">
          Tasks by Project
        </h2>
        <span className="text-xs text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/50">
          Top 3
        </span>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          {/* Subtle grid lines */}
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            stroke="#334155"
          />

          {/* X Axis styling */}
          <XAxis
            type="number"
            allowDecimals={false}
            stroke="#64748b"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={{ stroke: "#334155" }}
            tickLine={false}
          />

          {/* Y Axis styling for project names */}
          <YAxis
            type="category"
            dataKey="projectName"
            width={120}
            stroke="#64748b"
            tick={{ fill: "#cbd5e1", fontSize: 13, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />

          {/* Custom sleek tooltip */}
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(255, 255, 255, 0.03)" }}
          />

          {/* Glowing gradient bar */}
          <Bar
            dataKey="taskCount"
            fill="#8b5cf6"
            radius={[0, 6, 6, 0]}
            barSize={24}
            className="transition-all duration-300 hover:opacity-90"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectChart;
