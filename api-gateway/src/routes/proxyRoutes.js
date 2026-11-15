import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import services from "../config/services.js";
import apiLimiter from "../middlewares/rateLimiter.js";
import proxyOptions from "../config/proxyOptions.js";

const router = express.Router();

router.use(apiLimiter);

router.use("/users", createProxyMiddleware({
    ...proxyOptions,
    target: services.user,
    pathRewrite: (path, req) => {
        // 'path' is what remains after Express strips '/users'.
        // If someone visits http://localhost:8000/api/v1/users (or /users/), path will be '/' or ''
        if (path === '/' || path === '' || path === '/health') {
            // Rewrite the base route to your user-service's actual health/status endpoint
            return '/health'; // Change this to match your user-service's health route (e.g., '/api/v1/health')
        }

        // Handle specific sub-routes normally (like register/login)
        if (path.startsWith('/register')) {
            return '/api/v1/auth/register';
        }
        if (path.startsWith('/login')) {
            return '/api/v1/auth/login';
        }

        // Default fallback for other user routes
        return `/api/v1/auth${path}`;
    }
}));

router.use("/reports", createProxyMiddleware({
    ...proxyOptions,
    target: services.report,
    pathRewrite: (path, req) => {
        // 'path' is what remains after Express strips '/reports'.
        // If someone visits http://localhost:8000/api/v1/reports (or /reports/), path will be '/' or ''
        if (path === '/health') {
            // Rewrite the base route to your report-service's actual health/status endpoint
            return '/health'; // Change this to match your report-service's health route (e.g., '/api/v1/health')
        }

        // Default fallback for other report routes
        return `/api/v1/reports${path}`;
    }
}));

router.use("/complaints", createProxyMiddleware({
    ...proxyOptions,
    target: services.complaint,
    pathRewrite: (path, req) => {
        // 'path' is what remains after Express strips '/complaints'.
        // If someone visits http://localhost:8000/api/v1/complaints (or /complaints/), path will be '/' or ''
        if (path === '/health') {
            // Rewrite the base route to your complaint-service's actual health/status endpoint
            return '/health'; // Change this to match your complaint-service's health route (e.g., '/api/v1/health')
        }

        // Default fallback for other complaint routes
        return `/api/v1/complaints${path}`;
    }
}));

router.use("/notifications", createProxyMiddleware({
    ...proxyOptions,
    target: services.notification,
    pathRewrite: (path, req) => {
        // 'path' is what remains after Express strips '/notifications'.
        // If someone visits http://localhost:8000/api/v1/notifications (or /notifications/), path will be '/' or ''
        if (path === '/health') {
            // Rewrite the base route to your notification-service's actual health/status endpoint
            return '/health'; // Change this to match your notification-service's health route (e.g., '/api/v1/health')
        }

        // Default fallback for other notification routes
        return `/api/v1/notifications${path}`;
    }
}));

// (Other routes for reports, claims, notifications...)

export default router;