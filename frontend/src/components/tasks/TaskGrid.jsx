import TaskCard from "../common/Project Details/TaskCard";

const TaskGrid = ({ tasks }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskGrid;
