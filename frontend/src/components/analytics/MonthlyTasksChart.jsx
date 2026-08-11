import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const MonthlyTaskChart = ({ data }) => {
  const dummyyData = [
    {
      month: "Jan",
      tasks: 73,
    },
    {
      month: "Feb",
      tasks: 153,
    },
    {
      month: "Mar",
      tasks: 223,
    },
    {
      month: "Apr",
      tasks: 175,
    },
    {
      month: "May",
      tasks: 90,
    },
    {
      month: "Jun",
      tasks: 160,
    },
    {
      month: "Jul",
      tasks: 139,
    },
    {
      month: "Aug",
      tasks: 223,
    },
    {
      month: "Sep",
      tasks: 23,
    },
    {
      month: "Oct",
      tasks: 133,
    },
    {
      month: "Nov",
      tasks: 173,
    },
    {
      month: "Dec",
      tasks: 113,
    },
  ];
  return (
    <div className=" bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
        Monthly Task Creation
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={dummyyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />

          <XAxis dataKey="month" tick={{ fill: "var(--chart-text)" }} />

          <YAxis allowDecimals={false} tick={{ fill: "var(--chart-text)" }} />

          <Tooltip
            contentStyle={{
              backgroundColor: "var(--chart-tooltip-bg)",
              border: "1px solid var(--chart-tooltip-border)",
              borderRadius: "8px",
            }}
          />

          <Line
            type="monotone"
            dataKey="tasks"
            stroke="#6366F1"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTaskChart;
