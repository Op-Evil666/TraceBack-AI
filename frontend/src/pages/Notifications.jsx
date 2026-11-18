
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Bell,
  CheckCheck,
  Trash2,
  LoaderCircle,
  Inbox,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import {
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../services/notificationService";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");

  // Fetch data without modifying component state
  const fetchNotifications = useCallback(async (page = 1) => {
    const [notificationData, countData] = await Promise.all([
      getNotifications({ page, limit: 10 }),
      getUnreadCount(),
    ]);

    return { notificationData, countData };
  }, []);

  // Initial notification fetch
  useEffect(() => {
    let ignore = false;

    const loadNotifications = async () => {
      try {
        const { notificationData, countData } =
          await fetchNotifications(1);

        if (ignore) return;

        setNotifications(notificationData.notifications || []);
        setPagination(notificationData.pagination);
        setUnreadCount(countData.unreadCount || 0);
      } catch (error) {
        if (ignore) return;

        console.error("Notification fetch error:", error);

        toast.error(
          error.response?.data?.message ||
            "Unable to load notifications."
        );
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadNotifications();

    return () => {
      ignore = true;
    };
  }, [fetchNotifications]);

  // Mark one notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      setActionLoading(notificationId);

      await markNotificationAsRead(notificationId);

      setNotifications((previous) =>
        previous.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );

      setUnreadCount((previous) => Math.max(0, previous - 1));

      toast.success("Notification marked as read.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update notification."
      );
    } finally {
      setActionLoading("");
    }
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = async () => {
    try {
      setActionLoading("all");

      await markAllNotificationsAsRead();

      setNotifications((previous) =>
        previous.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );

      setUnreadCount(0);

      toast.success("All notifications marked as read.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update notifications."
      );
    } finally {
      setActionLoading("");
    }
  };

  // Delete notification
  const handleDelete = async (notificationId) => {
    try {
      setActionLoading(notificationId);

      await deleteNotification(notificationId);

      const deletedNotification = notifications.find(
        (notification) => notification._id === notificationId
      );

      setNotifications((previous) =>
        previous.filter(
          (notification) => notification._id !== notificationId
        )
      );

      if (deletedNotification && !deletedNotification.isRead) {
        setUnreadCount((previous) => Math.max(0, previous - 1));
      }

      setPagination((previous) => ({
        ...previous,
        total: Math.max(0, previous.total - 1),
      }));

      toast.success("Notification deleted.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete notification."
      );
    } finally {
      setActionLoading("");
    }
  };

  // Pagination
  const handlePageChange = async (page) => {
    try {
      setLoading(true);

      const { notificationData, countData } =
        await fetchNotifications(page);

      setNotifications(notificationData.notifications || []);
      setPagination(notificationData.pagination);
      setUnreadCount(countData.unreadCount || 0);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load notifications."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10">

        {/* Page heading */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <Bell className="text-blue-600" size={28} />

              <h1 className="text-3xl font-bold text-slate-900">
                Notifications
              </h1>
            </div>

            <p className="text-slate-500 mt-2">
              Stay updated on potential matches for your items.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              {unreadCount} unread
            </span>

            <button
              onClick={handleMarkAllAsRead}
              disabled={
                unreadCount === 0 || actionLoading === "all"
              }
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {actionLoading === "all" ? (
                <LoaderCircle
                  size={16}
                  className="animate-spin"
                />
              ) : (
                <CheckCheck size={16} />
              )}

              <span className="hidden sm:inline">
                Mark all as read
              </span>
            </button>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="py-24 flex justify-center">
            <LoaderCircle
              size={36}
              className="animate-spin text-blue-600"
            />
          </div>
        ) : notifications.length === 0 ? (

          /* Empty state */
          <div className="bg-white border border-slate-200 rounded-2xl py-20 text-center">
            <Inbox
              size={48}
              className="mx-auto text-slate-300"
            />

            <h2 className="text-xl font-semibold text-slate-800 mt-4">
              You're all caught up!
            </h2>

            <p className="text-slate-500 mt-2">
              New item-match notifications will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* Notification list */}
            <div className="space-y-4">
              {notifications.map((notification) => (
                <article
                  key={notification._id}
                  className={`bg-white border rounded-xl p-5 flex flex-col sm:flex-row sm:items-start gap-4 ${
                    notification.isRead
                      ? "border-slate-200"
                      : "border-blue-200 bg-blue-50/40"
                  }`}
                >
                  <div
                    className={`p-3 rounded-full shrink-0 ${
                      notification.isRead
                        ? "bg-slate-100 text-slate-500"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    <Bell size={21} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold text-slate-900">
                        {notification.title}
                      </h2>

                      {!notification.isRead && (
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                      )}
                    </div>

                    <p className="text-slate-600 text-sm mt-2">
                      {notification.message}
                    </p>

                    <p className="text-xs text-slate-400 mt-3">
                      {new Date(
                        notification.createdAt
                      ).toLocaleString()}
                    </p>

                    {notification.type === "MATCH_FOUND" && (
                      <p className="text-xs text-blue-600 font-medium mt-2">
                        Potential item match found
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-start">
                    {!notification.isRead && (
                      <button
                        onClick={() =>
                          handleMarkAsRead(notification._id)
                        }
                        disabled={
                          actionLoading === notification._id
                        }
                        title="Mark as read"
                        className="p-2 rounded-lg text-blue-600 hover:bg-blue-100 disabled:opacity-50"
                      >
                        <CheckCheck size={19} />
                      </button>
                    )}

                    <button
                      onClick={() =>
                        handleDelete(notification._id)
                      }
                      disabled={
                        actionLoading === notification._id
                      }
                      title="Delete notification"
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 size={19} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={() =>
                    handlePageChange(pagination.page - 1)
                  }
                  disabled={pagination.page <= 1}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-white disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="text-sm text-slate-500">
                  Page {pagination.page} of {pagination.totalPages}
                </span>

                <button
                  onClick={() =>
                    handlePageChange(pagination.page + 1)
                  }
                  disabled={
                    pagination.page >= pagination.totalPages
                  }
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-white disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Notifications;
