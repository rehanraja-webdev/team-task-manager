import StatCard from "../../common/StatCard";
import { CheckCircle, Clock, FolderKanban, ListTodo } from "lucide-react";

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mb-8">
      <StatCard
        title="Projects"
        value={stats?.totalProjects ?? 0}
        icon={<FolderKanban />}
      />

      <StatCard
        title="Tasks"
        value={stats?.totalTasks ?? 0}
        icon={<ListTodo />}
      />

      <StatCard
        title="Completed"
        value={stats?.doneTasks ?? 0}
        icon={<CheckCircle />}
      />

      <StatCard title="Todo" value={stats?.todoTasks ?? 0} icon={<Clock />} />
    </div>
  );
};

export default DashboardStats;
