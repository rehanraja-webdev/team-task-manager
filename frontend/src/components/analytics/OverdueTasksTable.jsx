const OverdueTasksTable = ({ data = [] }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-5 text-xl font-semibold text-white">Overdue Tasks</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-700 text-slate-400">
              <th className="pb-3">Task</th>
              <th>Project</th>
              <th>Assigned To</th>
              <th>Due Date</th>
            </tr>
          </thead>

          <tbody>
            {data.map((task) => (
              <tr
                key={task._id}
                className="border-b border-slate-800 text-white"
              >
                <td className="py-4">{task.title}</td>

                <td>{task.project}</td>

                <td>{task.assignedTo}</td>

                <td className="text-red-400">
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
          <p className="py-6 text-center text-slate-400">No overdue tasks 🎉</p>
        )}
      </div>
    </div>
  );
};

export default OverdueTasksTable;
