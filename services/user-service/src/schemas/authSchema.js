import { z } from "zod";

const registerSchema = z.strictObject({
    name: z.string()
    .trim()
    .min(2, "Name must be atleast 2 characters long")
    .max(50, "Name must be less than 50 characters long"),
    email: z.email()
    .trim()
    .toLowerCase(),
    password: z.string()
    .min(8, "Password must be atleast 8 characters long")
    .max(128, "Password must be less than 128 characters long"),
    confirmPassword: z.string()
    .min(8, "Confirm password must be atleast 8 characters long")
    .max(128, "Confirm password must be less than 128 characters long")
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

const loginSchema = z.strictObject({
    email: z.email()
        .trim()
        .toLowerCase(),

    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .max(128, "Password must be less than 128 characters long")
});

export { registerSchema, loginSchema };