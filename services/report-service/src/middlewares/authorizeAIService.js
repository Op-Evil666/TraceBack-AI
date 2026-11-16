import AppError from "../utils/appError.js";

const authorizeAIService = (req, res, next) => {
    const apiKey = req.headers["x-internal-api-key"];

    if (!apiKey || apiKey !== process.env.AI_SERVICE_API_KEY) {
        return next(new AppError("Unauthorized AI service", 401));
    }

    next();
};

export default authorizeAIService;