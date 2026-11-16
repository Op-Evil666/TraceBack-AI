import express from "express";
import { apiLimiter, registerLimiter, loginLimiter, otpLimiter, refreshLimiter } from "../middlewares/rateLimitMiddleware.js";
import registerUser from "../controllers/registerController.js";
import loginUser from "../controllers/loginController.js";
import refreshUser from "../controllers/refreshController.js";
import verifyUser from "../controllers/verifyUser.js";
import logoutUser from "../controllers/logoutController.js";
import meController from "../controllers/meController.js";
import validate from "../middlewares/schemaMiddleware.js";
import { registerSchema, loginSchema } from "../schemas/authSchema.js";
import { verifyOtpSchema, userIdSchema } from "../schemas/verifySchema.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.use(apiLimiter);
router.post("/register", registerLimiter, validate(registerSchema, "body"), registerUser);
router.post("/login", loginLimiter, validate(loginSchema, "body"), loginUser);
router.post("/refresh", refreshLimiter, refreshUser);
router.post("/verify-otp/:id", otpLimiter, validate(userIdSchema, "params"), validate(verifyOtpSchema, "body"), verifyUser);
router.post("/logout", logoutUser);
router.get("/me", authenticate, meController);

export default router;