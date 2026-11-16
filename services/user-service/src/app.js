import express from "express";
import authRoutes from "./routes/authRoutes.js";
import healthRoute from "./routes/healthRoute.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "User service is running"
    });
});

app.use("/health", healthRoute);

app.use("/api/v1/auth", authRoutes);

app.use(errorMiddleware);

export default app;
