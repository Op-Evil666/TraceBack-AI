import { z } from "zod";

const paginationSchema = z.strictObject({
    page: z.coerce.number()
        .int("Page must be an integer")
        .min(1, "Specify a valid page")
        .default(1),

    limit: z.coerce.number()
        .int("Limit must be an integer")
        .min(1, "Provide a valid limit")
        .max(10, "Limit exceeded")
        .default(10)
});

export default paginationSchema;
