
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["MATCH_FOUND"],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    relatedReport: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    relatedComplaint: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Efficiently retrieve a user's notifications, newest first.
notificationSchema.index({ recipient: 1, createdAt: -1 });

// Efficiently count unread notifications.
notificationSchema.index({ recipient: 1, isRead: 1 });

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);

export default Notification;
