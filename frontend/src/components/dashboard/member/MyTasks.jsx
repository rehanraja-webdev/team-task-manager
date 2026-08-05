import { Link } from "react-router-dom";

const MyTasks = ({ tasks }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">My Tasks</h2>

        <Link
          to="/dashboard/tasks"
          className="text-indigo-400 hover:text-indigo-300"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-slate-400">No assigned tasks.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="rounded-xl bg-slate-950 p-4 border border-slate-800"
            >
              <h3 className="font-medium text-white">{task.title}</h3>

              <div className="mt-2 flex justify-between text-sm text-slate-400">
                <span className="capitalize">{task.priority}</span>

                <span className="capitalize">{task.status}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyTasks;
