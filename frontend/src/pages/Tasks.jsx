import { useState } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import useTasks from "../hooks/useTasks";
import TasksHeader from "../components/tasks/TasksHeader";
import TaskTabs from "../components/tasks/TaskTabs";
import StatCard from "../components/common/StatCard";
import { Circle, CircleCheckBig, Clock3, ListTodo } from "lucide-react";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskGrid from "../components/tasks/TaskGrid";
import useAuth from "../hooks/useAuth";

const Tasks = () => {
  const { user } = useAuth();
  const [activeState, setActiveState] = useState("assigned");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sort, setSort] = useState("latest");
  const { tasks, loading } = useTasks(activeState);

  const totalTasks = tasks.length;

  const todoTasks = tasks.filter((task) => task.status === "todo").length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress",
  ).length;

  const doneTasks = tasks.filter((task) => task.status === "done").length;

  if (loading) return <LoadingSpinner />;
  return (
    <div className="space-y-6">
      <TasksHeader />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mb-8">
        <StatCard title="Total Tasks" value={totalTasks} icon={<ListTodo />} />

        <StatCard title="Todo" value={todoTasks} icon={<Circle />} />

        <StatCard
          title="In Progrss"
          value={inProgressTasks}
          icon={<Clock3 />}
        />

        <StatCard
          title="Completed"
          value={doneTasks}
          icon={<CircleCheckBig />}
        />
      </div>

      <TaskTabs
        activeTab={activeState}
        setActiveTab={setActiveState}
        isAdmin={user.role === "admin"}
      />

      <TaskFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
        sort={sort}
        setSort={setSort}
      />

      <TaskGrid
        tasks={tasks}
        search={search}
        status={status}
        priority={priority}
        sort={sort}
      />
    </div>
  );
};

export default Tasks;
