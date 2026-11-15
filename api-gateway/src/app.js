import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import errorHandler from "./middlewares/errorHandler.js";
import proxyRoutes from "./routes/proxyRoutes.js";
import apiHealthRoute from "./routes/apiHealthRoute.js";

const app = express();

app.use(helmet());

app.use(cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/", (req, res) =>{
    res.status(200).json({
        success: true,
        message: "Welcome to the API Gateway."
    });
});

app.use("/health", apiHealthRoute);

app.use("/api/v1", proxyRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Gateway route not found."
    });
});

app.use(errorHandler);

export default app;
