import express from 'express';
import helmet from 'helmet';
import apiHealthRoute from './routes/apiHealthRoute.js'
import reportRoutes from './routes/reportRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) =>{
    return res.status(200).json({
        success: true,
        message: "Report service is running"
    });
});

app.use("/health", apiHealthRoute);
app.use("/api/v1/reports", reportRoutes);

app.use(errorMiddleware);

export default app;