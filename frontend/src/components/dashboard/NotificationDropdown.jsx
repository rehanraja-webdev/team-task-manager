import { Bell, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useNotifications from "../../hooks/useNotifications";
import NotificationItem from "./NotificationItem";

const NotificationDropdown = () => {
  const { notifications, unreadCount, loading, markAsRead, markAllRead } =
    useNotifications();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close when clicking outside
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

  // Close with Escape
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative" ref={ref}>
      {/* Notification button */}
      <button
        type="button"
        onClick={handleToggle}
        aria-label={
          unreadCount > 0
            ? `${unreadCount} unread notifications`
            : "Notifications"
        }
        aria-expanded={open}
        className="
          relative flex h-10 w-10 cursor-pointer items-center justify-center
          rounded-xl
          bg-slate-50
          text-slate-700
          transition-all
          hover:bg-slate-100
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500/30
          dark:bg-slate-950
          dark:text-slate-300
          dark:hover:bg-slate-800
        "
      >
        <Bell size={19} />

        {unreadCount > 0 && (
          <span
            className="
              absolute -right-1 -top-1
              flex h-5 min-w-5 items-center justify-center
              rounded-full
              bg-red-500
              px-1
              text-[10px]
              font-semibold
              leading-none
              text-white
              ring-2 ring-white
              dark:ring-slate-950
            "
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="dialog"
          aria-label="Notifications"
          className="
            fixed inset-x-3 top-20 z-50
            overflow-hidden
            rounded-2xl
            border border-slate-200
            bg-white
            shadow-2xl
            dark:border-slate-800
            dark:bg-slate-900

            sm:absolute
            sm:inset-auto
            sm:right-0
            sm:top-full
            sm:mt-3
            sm:w-96
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3.5 dark:border-slate-800">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Notifications
              </h3>

              {unreadCount > 0 && (
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {unreadCount} unread
                </p>
              )}
            </div>

            {notifications.length > 0 && unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="
                  shrink-0 cursor-pointer
                  rounded-lg px-2 py-1
                  text-xs font-medium
                  text-indigo-600
                  transition
                  hover:bg-indigo-50
                  hover:text-indigo-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500/30
                  dark:text-indigo-400
                  dark:hover:bg-indigo-500/10
                  dark:hover:text-indigo-300
                "
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications */}
          <div className="custom-scrollbar max-h-[60vh] overflow-y-auto sm:max-h-96">
            {loading ? (
              <div className="px-6 py-10 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Loading notifications...
                </p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="px-6 py-10 text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                  <Bell size={19} />
                </div>

                <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                  No notifications
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                  You're all caught up.
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
                gap-2 rounded-xl px-3 py-2
                text-xs font-medium
                text-slate-500
                transition
                hover:bg-slate-100
                hover:text-slate-700
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500/30
                dark:text-slate-400
                dark:hover:bg-slate-800
                dark:hover:text-slate-200
              "
            >
              <X size={14} />
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
