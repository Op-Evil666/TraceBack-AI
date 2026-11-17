import { z } from "zod";

export const createComplaintSchema = z.strictObject({
    title: z.string()
        .trim()
        .min(3, "Title must contain at least 3 characters")
        .max(150, "Title cannot exceed 150 characters"),

    description: z.string()
        .trim()
        .min(10, "Description must contain at least 10 characters")
        .max(2000, "Description cannot exceed 2000 characters"),

    category: z.string()
        .trim()
        .min(2, "Category is required")
        .max(150, "Category cannot exceed 150 characters"),

    location: z.string()
        .trim()
        .min(3, "Location must contain at least 3 characters")
        .max(200, "Location cannot exceed 200 characters"),

    lostDate: z.coerce.date()
        .refine(date => !Number.isNaN(date.getTime()), {
            message: "Invalid date found"
        })
        .refine(date => date <= new Date(), {
            message: "Date found cannot be in the future"
        })
});

export const updateComplaintSchema = createComplaintSchema
    .partial()
    .refine(
        data => Object.keys(data).length > 0,
        { message: "Provide at least one field to update" }
    );
