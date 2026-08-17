import { Bell, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useNotifications from "../../hooks/useNotifications";
import NotificationItem from "./NotificationItem";

const NotificationDropdown = () => {
  const {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllRead,
  } = useNotifications();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = async () => {
    if (!open && notifications.length === 0) {
      await fetchNotifications();
    }

    setOpen((prev) => !prev);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={handleToggle}
        className="relative rounded-full bg-slate-50 dark:bg-slate-950 p-3 transition hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
      >
        <Bell className="text-slate-700 dark:text-slate-300" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-slate-900 dark:text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-x-4 top-24 sm:absolute sm:inset-auto sm:right-0 sm:top-full z-50 mt-3 w-auto sm:w-96 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 p-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Notifications
            </h3>

            {!!notifications.length && (
              <button
                onClick={markAllRead}
                className="cursor-pointer text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[60vh] sm:max-h-96 overflow-y-auto">
            {loading ? (
              <p className="p-6 text-center text-slate-600 dark:text-slate-400">
                Loading...
              </p>
            ) : notifications.length === 0 ? (
              <p className="p-6 text-center text-slate-600 dark:text-slate-400">
                No notifications
              </p>
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

          <div className="border-t border-slate-200 dark:border-slate-800 p-2">
            <button
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="h-4 w-4" />
              Close Notification
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
