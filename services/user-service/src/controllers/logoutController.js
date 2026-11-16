import { logoutService } from "../services/authService.js";
import AppError from "../utils/appError.js";
import { clearRefreshTokenCookie } from "../utils/cookieUtils.js";

const logout = async (req, res) =>{
    const token = req.cookies.refreshToken;
    if(!token){
        throw new AppError("Missing token. Login first", 401);
    }
    await logoutService(token);
    clearRefreshTokenCookie(res);
    return res.status(200).json({
        success: true,
        message: "Logout successful!"
    });

}

export default logout;