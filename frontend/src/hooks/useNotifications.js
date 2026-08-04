import { useState } from "react";
import toast from "react-hot-toast";

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../services/notification.service";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const data = await getNotifications();

      setNotifications(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load notifications",
      );
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await markNotificationRead(id);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification,
        ),
      );
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const markAllRead = async () => {
    try {
      await markAllNotificationsRead();

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  return {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllRead,
  };
};

export default useNotifications;
