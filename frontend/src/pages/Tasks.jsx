import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Circle, CircleCheckBig, Clock3, ListTodo } from "lucide-react";

import LoadingSpinner from "../components/common/LoadingSpinner";
import useTasks from "../hooks/useTasks";
import useAuth from "../hooks/useAuth";

import TasksHeader from "../components/tasks/TasksHeader";
import TaskTabs from "../components/tasks/TaskTabs";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskGrid from "../components/tasks/TaskGrid";
import StatCard from "../components/common/StatCard";
import EmptyTasks from "../components/tasks/EmptyTasks";

const Tasks = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeState, setActiveState] = useState("assigned");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sort, setSort] = useState("latest");

  const { tasks: response, loading } = useTasks(activeState);

  // Normalize API response
  const isEmpty = response?.isEmpty === true;

  const tasks = useMemo(() => {
    return Array.isArray(response) ? response : [];
  }, [response]);

  const filteredTasks = useMemo(() => {
    return [...tasks]
      .filter((task) => {
        const searchValue = search.trim().toLowerCase();

        const matchesSearch =
          !searchValue ||
          task.title?.toLowerCase().includes(searchValue) ||
          task.description?.toLowerCase().includes(searchValue) ||
          task.project?.name?.toLowerCase().includes(searchValue);

        const matchesStatus = !status || task.status === status;

        const matchesPriority = !priority || task.priority === priority;

        return matchesSearch && matchesStatus && matchesPriority;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();

        return sort === "oldest" ? dateA - dateB : dateB - dateA;
      });
  }, [tasks, search, status, priority, sort]);

  const totalTasks = tasks.length;

  const todoTasks = tasks.filter((task) => task.status === "todo").length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress",
  ).length;

  const doneTasks = tasks.filter((task) => task.status === "done").length;

  const isFiltering =
    search.trim().length > 0 ||
    status !== "" ||
    priority !== "" ||
    sort !== "latest";

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setPriority("");
    setSort("latest");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <TasksHeader role={user.role} />

      {isEmpty ? (
        <EmptyTasks role={user.role} onCreate={() => navigate("new")} />
      ) : (
        <>
          <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Tasks"
              value={totalTasks}
              icon={<ListTodo />}
            />

            <StatCard title="Todo" value={todoTasks} icon={<Circle />} />

            <StatCard
              title="In Progress"
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

          {filteredTasks.length === 0 && isFiltering ? (
            <EmptyTasks
              role={user.role}
              isFiltering
              search={search}
              onClear={clearFilters}
            />
          ) : (
            <TaskGrid
              tasks={filteredTasks}
              search=""
              status=""
              priority=""
              sort="latest"
            />
          )}
        </>
      )}
    </div>
  );
};

export default Tasks;
