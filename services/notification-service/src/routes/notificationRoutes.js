
import express from "express";

import {
  createNotification,
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

import authenticate from "../middlewares/authenticate.js";
import internalAuth from "../middlewares/internalAuth.js";

const router = express.Router();

// AI Service only
router.post("/internal", internalAuth, createNotification);

// Authenticated user routes
router.get("/unread-count", authenticate, getUnreadCount);
router.get("/", authenticate, getNotifications);
router.patch("/read-all", authenticate, markAllAsRead);
router.patch("/:id/read", authenticate, markAsRead);
router.delete("/:id", authenticate, deleteNotification);

export default router;