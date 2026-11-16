import { z } from "zod";

const verifyOtpSchema = z.strictObject({
    otp: z.string().regex(/^\d{6}$/, "Enter a valid six-digit OTP")
});

const userIdSchema = z.strictObject({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid user ID")
}); 

export { verifyOtpSchema, userIdSchema };