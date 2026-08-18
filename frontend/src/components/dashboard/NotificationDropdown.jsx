import { Bell, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useNotifications from "../../hooks/useNotifications";
import NotificationItem from "./NotificationItem";

const NotificationDropdown = () => {
  const { notifications, unreadCount, loading, markAsRead, markAllRead } =
    useNotifications();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={handleToggle}
        aria-label="Notifications"
        className="
          relative cursor-pointer rounded-full
          bg-slate-50 p-3
          transition hover:bg-slate-100
          dark:bg-slate-950 dark:hover:bg-slate-800
        "
      >
        <Bell className="text-slate-700 dark:text-slate-300" />

        {unreadCount > 0 && (
          <span
            className="
              absolute -right-1 -top-1
              flex h-5 min-w-5 items-center justify-center
              rounded-full bg-red-500 px-1
              text-[10px] font-semibold text-white
            "
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="
            fixed inset-x-4 top-24 z-50
            mt-3 overflow-hidden
            rounded-2xl
            border border-slate-200
            bg-white shadow-2xl
            dark:border-slate-800
            dark:bg-slate-900
            sm:absolute sm:inset-auto sm:right-0 sm:top-full
            sm:w-96
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Notifications
              </h3>

              {unreadCount > 0 && (
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {unreadCount} unread
                </p>
              )}
            </div>

            {!!notifications.length && unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="
                  cursor-pointer text-sm text-indigo-600
                  hover:text-indigo-700
                  dark:text-indigo-400 dark:hover:text-indigo-300
                "
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Content */}
          <div className="max-h-[60vh] overflow-y-auto sm:max-h-96">
            {loading ? (
              <div className="p-6 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Loading notifications...
                </p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No notifications
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification._id}
                  notification={notification}
                  onRead={markAsRead}
                />
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 p-2 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="
                flex w-full cursor-pointer items-center justify-center
                gap-2 rounded-xl py-2
                text-xs font-semibold
                text-slate-500 transition
                hover:bg-slate-100 hover:text-slate-700
                dark:text-slate-400
                dark:hover:bg-slate-800 dark:hover:text-slate-200
              "
            >
              <X className="h-4 w-4" />
              Close Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
