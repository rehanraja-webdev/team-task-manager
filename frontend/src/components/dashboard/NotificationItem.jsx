import { Check } from "lucide-react";
import formatTimeAgo from "../../utils/formatTimeAgo";

const NotificationItem = ({ notification, onRead }) => {
  const isUnread = !notification.isRead;

  return (
    <button
      type="button"
      onClick={() => {
        if (isUnread) {
          onRead(notification._id);
        }
      }}
      className={`
        block w-full cursor-pointer border-b px-4 py-3.5
        text-left transition
        last:border-b-0
        border-slate-100
        hover:bg-slate-50
        focus:outline-none
        focus:ring-2
        focus:ring-inset
        focus:ring-indigo-500/30
        dark:border-slate-800
        dark:hover:bg-slate-800/50
        ${
          isUnread
            ? "bg-indigo-50/60 dark:bg-indigo-500/5"
            : "bg-white dark:bg-slate-900"
        }
      `}
    >
      <div className="flex items-start gap-3">
        {/* Unread indicator */}
        <div className="mt-1.5 flex h-2 w-2 shrink-0">
          {isUnread ? (
            <span className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
          ) : (
            <span className="h-2 w-2 rounded-full bg-transparent" />
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h4
              className={`text-sm ${
                isUnread
                  ? "font-semibold text-slate-900 dark:text-white"
                  : "font-medium text-slate-700 dark:text-slate-200"
              }`}
            >
              {notification.title}
            </h4>

            {!isUnread && (
              <Check
                size={14}
                className="mt-0.5 shrink-0 text-slate-400 dark:text-slate-500"
              />
            )}
          </div>

          <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-600 dark:text-slate-400">
            {notification.message}
          </p>

          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
            {formatTimeAgo(notification.createdAt)}
          </p>
        </div>
      </div>
    </button>
  );
};

export default NotificationItem;
