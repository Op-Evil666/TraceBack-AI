import { verifyAccessToken } from "../utils/tokenUtils.js";
import AppError from "../utils/appError.js";

const authenticate = (req, res, next) =>{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return next(new AppError("No token found", 401));
        }
        const [scheme, token] = authHeader.split(" ");
        if(scheme !== "Bearer" || !token){
            return next(new AppError("Invalid token", 401));
        }
        let payload;
try {
    payload = verifyAccessToken(token);
} catch (error) {
    return next(new AppError("Invalid or expired token", 401));
}

req.user = payload;
next();
}

export default authenticate;