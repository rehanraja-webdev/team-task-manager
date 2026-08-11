const OverdueTasksTable = ({ data = [] }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-5 text-xl font-semibold text-slate-900 dark:text-white">
        Overdue Tasks
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-175 text-left">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400">
              <th className="pb-3">Task</th>
              <th className="pb-3">Project</th>
              <th className="pb-3">Assigned To</th>
              <th className="pb-3">Due Date</th>
            </tr>
          </thead>

          <tbody>
            {data.map((task) => (
              <tr
                key={task._id}
                className="border-b border-slate-100 text-slate-700 dark:border-slate-800 dark:text-slate-300"
              >
                <td className="py-4 font-medium text-slate-900 dark:text-white">
                  {task.title}
                </td>

                <td>{task.project}</td>

                <td>{task.assignedTo}</td>

                <td className="font-medium text-red-600 dark:text-red-400">
                  {new Date(task.dueDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!data.length && (
          <p className="py-6 text-center text-slate-500 dark:text-slate-400">
            No overdue tasks 🎉
          </p>
        )}
      </div>
    </div>
  );
};

export default OverdueTasksTable;
