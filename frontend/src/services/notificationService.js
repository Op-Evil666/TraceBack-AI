
import { api } from "./api";

// Get notifications for the logged-in user
const getNotifications = async (params = {}) => {
  const response = await api.get("/notifications", { params });
  return response.data;
};

// Get unread notification count
const getUnreadCount = async () => {
  const response = await api.get("/notifications/unread-count");
  return response.data;
};

// Mark a specific notification as read
const markNotificationAsRead = async (notificationId) => {
  const response = await api.patch(
    `/notifications/${encodeURIComponent(notificationId)}/read`
  );
  return response.data;
};

// Mark all notifications as read
const markAllNotificationsAsRead = async () => {
  const response = await api.patch("/notifications/read-all");
  return response.data;
};

// Delete a notification
const deleteNotification = async (notificationId) => {
  const response = await api.delete(
    `/notifications/${encodeURIComponent(notificationId)}`
  );
  return response.data;
};

export {
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
};
