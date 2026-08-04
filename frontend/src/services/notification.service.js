import api from "../api/axios";

export const getNotifications = async () => {
  const res = await api.get("/v1/notifications");
  return res.data.data;
};

export const markNotificationRead = async (id) => {
  await api.patch(`/v1/notifications/${id}/read`);
};

export const markAllNotificationsRead = async () => {
  await api.patch("/v1/notifications/read-all");
};
