import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3B82F6", "#F59E0B", "#22C55E"];

const TaskStatusChart = ({ analytics }) => {
  const data = [
    {
      name: "Todo",
      value: analytics.todoTasks || 0,
    },
    {
      name: "In Progress",
      value: analytics.inProgressTasks || 0,
    },
    {
      name: "Done",
      value: analytics.doneTasks || 0,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-lg font-semibold text-white">Task Status</h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={65}
            outerRadius={105}
            dataKey="value"
            paddingAngle={4}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskStatusChart;
