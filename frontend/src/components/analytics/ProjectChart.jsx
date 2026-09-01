import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0].payload;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm shadow-xl dark:border-slate-700 dark:bg-slate-800">
      <p className="mb-1 font-semibold text-slate-900 dark:text-white">
        {data.project}
      </p>

      <p className="text-violet-600 dark:text-violet-400">
        Tasks:{" "}
        <span className="font-bold text-slate-900 dark:text-white">
          {data.tasks}
        </span>
      </p>
    </div>
  );
};

const ProjectChart = ({ data = [] }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const chartColors = isDark
    ? {
        grid: "#334155",
        axis: "#64748b",
        text: "#cbd5e1",
        cursor: "rgba(255, 255, 255, 0.04)",
        bar: "#8b5cf6",
      }
    : {
        grid: "#e2e8f0",
        axis: "#94a3b8",
        text: "#475569",
        cursor: "rgba(15, 23, 42, 0.04)",
        bar: "#7c3aed",
      };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-wide text-slate-900 dark:text-white">
          Tasks by Project
        </h2>

        <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs text-slate-500 dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-400">
          Top 3 Projects
        </span>
      </div>

      {/* Empty state */}
      {data.length === 0 ? (
        <div className="flex h-80 items-center justify-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No project data available.
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 5,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke={chartColors.grid}
            />

            <XAxis
              type="number"
              allowDecimals={false}
              stroke={chartColors.axis}
              tick={{
                fill: chartColors.text,
                fontSize: 12,
              }}
              axisLine={{
                stroke: chartColors.axis,
              }}
              tickLine={false}
            />

            <YAxis
              type="category"
              dataKey="project"
              width={120}
              stroke={chartColors.axis}
              tick={{
                fill: chartColors.text,
                fontSize: 13,
                fontWeight: 500,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                fill: chartColors.cursor,
              }}
            />

            <Bar
              dataKey="tasks"
              fill={chartColors.bar}
              radius={[0, 6, 6, 0]}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ProjectChart;
