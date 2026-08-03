const ContributorsTable = ({ data = [] }) => {
  console.log(data);
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-5 text-xl font-semibold text-white">
        Top Contributors
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 text-left text-slate-400">
              <th>#</th>
              <th>Name</th>
              <th>Completed</th>
              <th>Assigned</th>
            </tr>
          </thead>

          <tbody>
            {data.map((user, index) => (
              <tr
                key={index}
                className="border-b border-slate-800 text-white"
              >
                <td className="py-4 font-semibold text-indigo-400">
                  {index + 1}
                </td>

                <td className="text-white">{user.fullname}</td>

                <td>{user.completedTasks}</td>

                <td>{user.assignedTasks}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {!data.length && (
          <p className="py-6 text-center text-slate-400">
            No contributors found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ContributorsTable;
