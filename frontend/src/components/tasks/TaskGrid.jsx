import TaskCard from "../common/TaskCard";

const TaskGrid = ({ tasks, search, status, priority, sort }) => {
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = status ? task.status === status : true;
    const matchesPriority = priority ? task.priority === priority : true;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (sort === "latest") {
    filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sort === "oldest") {
    filteredTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {filteredTasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskGrid;
