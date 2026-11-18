import express from "express";
import cors from "cors";
import helmet from "helmet";

import notificationRoutes from "./routes/notificationRoutes.js";
import errorMiddleware from "./middlewares/errorHandler.js";

const app = express();

app.use(helmet());

app.use(cors({
  origin: process.env.GATEWAY_URL,
  credentials: true,
}));

app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) =>{
    res.status(200).json({
        success: true,
        message: "Notification service is running"
    })
})

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "notification-service",
    status: "UP",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/notifications", notificationRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

app.use(errorMiddleware);

export default app;
