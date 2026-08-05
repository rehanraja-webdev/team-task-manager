import formatTimeAgo from "../../../utils/formatTimeAgo";

const RecentActivities = ({ activities }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-5 text-xl font-semibold text-white">
        Recent Activities
      </h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity._id}
            className="rounded-xl border border-slate-800 bg-slate-950 p-4"
          >
            <p className="text-white">{activity.action}</p>

            <p className="mt-1 text-sm text-slate-400">
              {formatTimeAgo(activity.createdAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
