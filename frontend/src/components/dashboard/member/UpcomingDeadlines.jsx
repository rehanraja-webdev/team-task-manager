const UpcomingDeadlines = ({ tasks }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-5 text-xl font-semibold text-white">
        Upcoming Deadlines
      </h2>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="flex justify-between rounded-xl bg-slate-950 p-4 border border-slate-800"
          >
            <div>
              <h3 className="font-medium text-white">{task.title}</h3>

              <p className="mt-2 text-sm text-slate-400 capitalize">
                {task.priority}
              </p>
            </div>

            <span className="text-sm text-red-400">
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;
