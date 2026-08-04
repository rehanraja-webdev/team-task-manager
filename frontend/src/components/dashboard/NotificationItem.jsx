import formatTimeAgo from "../../utils/formatTimeAgo";

const NotificationItem = ({ notification, onRead }) => {
  return (
    <button
      onClick={() => {
        if (!notification.isRead) {
          onRead(notification._id);
        }
      }}
      className={`w-full text-left px-4 py-3 border-b border-slate-800 hover:bg-slate-800 transition ${
        !notification.isRead ? "bg-slate-800/40" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-white">{notification.title}</h4>

        {!notification.isRead && (
          <span className="w-2 h-2 rounded-full bg-indigo-500 mt-2" />
        )}
      </div>

      <p className="text-sm text-slate-400 mt-1">{notification.message}</p>

      <p className="mt-2 text-xs text-slate-500">
        {formatTimeAgo(notification.createdAt)}
      </p>
    </button>
  );
};

export default NotificationItem;
