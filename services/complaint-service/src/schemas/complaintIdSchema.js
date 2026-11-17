import mongoose from "mongoose";
import { z } from "zod";

const complaintIdSchema = z.object({
    id: z.string().refine(
        id => mongoose.isValidObjectId(id),
        "Invalid report ID"
    )
});

export default complaintIdSchema;