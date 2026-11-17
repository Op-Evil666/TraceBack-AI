import { z } from "zod";

const updateReportStatusSchema = z.strictObject({
    status: z.enum(["in_progress", "resolved"])
});

export default updateReportStatusSchema;