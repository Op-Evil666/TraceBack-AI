import { refreshService } from "../services/authService.js";
import AppError from "../utils/appError.js";

const refreshUser = async (req, res, next) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            throw new AppError("No token found", 401);
        }

        const accessToken = await refreshService(refreshToken, res);

        return res.status(200).json({
            success: true,
            message: "Access token refreshed",
            accessToken
        });
    } catch (error) {
        next(error);
    }
};

export default refreshUser;