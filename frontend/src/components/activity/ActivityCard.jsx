import formatTimeAgo from "../../utils/formatTimeAgo";

const ActivityCard = ({ activity }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-indigo-500 transition">
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium text-white">{activity.action}</h3>

          <p className="text-slate-400 text-sm mt-1">
            {activity.user.fullname}
          </p>
        </div>

        <span className="text-xs text-slate-500">
          {formatTimeAgo(activity.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default ActivityCard;
