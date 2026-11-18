import mongoose from "mongoose";
import Notification from "../models/Notification.js";

// AI Service: create a notification.
export const createNotification = async (req, res, next) => {
  try {
    const {
      recipient,
      type,
      title,
      message,
      relatedReport,
      relatedComplaint,
    } = req.body;

    if (
      !recipient ||
      !mongoose.isValidObjectId(recipient) ||
      !type ||
      !title ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing notification fields.",
      });
    }

    if (
      type !== "MATCH_FOUND" ||
      !relatedReport ||
      !mongoose.isValidObjectId(relatedReport) ||
      !relatedComplaint ||
      !mongoose.isValidObjectId(relatedComplaint)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid match notification details.",
      });
    }

    const notification = await Notification.create({
      recipient,
      type,
      title,
      message,
      relatedReport,
      relatedComplaint,
    });

    return res.status(201).json({
      success: true,
      message: "Notification created successfully.",
      notification,
    });
  } catch (error) {
    next(error);
  }
};

// Get authenticated user's notifications with pagination.
export const getNotifications = async (req, res, next) => {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number.parseInt(req.query.limit, 10) || 10)
    );

    const skip = (page - 1) * limit;

    const filter = {
      recipient: req.user.userId,
    };

    const [notifications, total] = await Promise.all([
      Notification.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Notification.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      notifications,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get unread notification count.
export const getUnreadCount = async (req, res, next) => {
  try {
    const count = await Notification.countDocuments({
      recipient: req.user.userId,
      isRead: false,
    });

    return res.status(200).json({
      success: true,
      unreadCount: count,
    });
  } catch (error) {
    next(error);
  }
};

// Mark one notification as read.
export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid notification ID.",
      });
    }

    const notification = await Notification.findOneAndUpdate(
      {
        _id: id,
        recipient: req.user.userId,
      },
      {
        $set: { isRead: true },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification marked as read.",
      notification,
    });
  } catch (error) {
    next(error);
  }
};

// Mark all notifications as read.
export const markAllAsRead = async (req, res, next) => {
  try {
    const result = await Notification.updateMany(
      {
        recipient: req.user.userId,
        isRead: false,
      },
      {
        $set: { isRead: true },
      }
    );

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read.",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    next(error);
  }
};

// Delete one notification.
export const deleteNotification = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid notification ID.",
      });
    }

    const notification = await Notification.findOneAndDelete({
      _id: id,
      recipient: req.user.userId,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};