const ContributorsTable = ({ data = [] }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-5 text-xl font-semibold text-slate-900 dark:text-white">
        Top Contributors
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-125">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500 dark:border-slate-700 dark:text-slate-400">
              <th className="pb-3">#</th>
              <th className="pb-3">Name</th>
              <th className="pb-3">Completed</th>
              <th className="pb-3">Assigned</th>
            </tr>
          </thead>

          <tbody>
            {data.map((user, index) => (
              <tr
                key={user._id || index}
                className="border-b border-slate-100 text-slate-700 dark:border-slate-800 dark:text-slate-300"
              >
                <td className="py-4 font-semibold text-indigo-600 dark:text-indigo-400">
                  {index + 1}
                </td>

                <td className="font-medium text-slate-900 dark:text-white">
                  {user.fullname}
                </td>

                <td>{user.completedTasks}</td>

                <td>{user.assignedTasks}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {!data.length && (
          <p className="py-6 text-center text-slate-500 dark:text-slate-400">
            No contributors found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ContributorsTable;
