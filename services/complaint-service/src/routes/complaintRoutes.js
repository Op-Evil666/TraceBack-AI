import express from 'express';
import authenticate from "../middlewares/authenticate.js";
import authorizeComplaintMiddleware from '../middlewares/authorizationComplaintMiddleware.js';
import validate from '../middlewares/schemaMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';
import authorizeAIService from '../middlewares/authorizeAIService.js';
import authorizeAdminMiddleware from '../middlewares/authorizeAdminMiddleware.js';
import { createComplaintSchema, updateComplaintSchema } from '../schemas/complaintSchema.js';
import paginationSchema from '../schemas/paginationSchema.js';
import complaintIdSchema from '../schemas/complaintIdSchema.js';
import statusSchema from "../schemas/statusSchema.js"
import createComplaint from '../controllers/createComplaint.js';
import getAllComplaints from '../controllers/getAllComplaints.js';
import getSpecificComplaint from '../controllers/getSpecificComplaint.js';
import getMyComplaints from '../controllers/getMyComplaints.js';
import updateComplaint from "../controllers/updateComplaint.js";
import updateComplaintStatus from "../controllers/updateComplaintStatus.js";
import deleteComplaint from "../controllers/deleteComplaint.js";

const router = express.Router();

router.post("/", authenticate, upload.single("image"), validate(createComplaintSchema, "body"), createComplaint);
router.get("/", authenticate, validate(paginationSchema, "query"), getAllComplaints);
router.get("/my-complaints", authenticate, validate(paginationSchema, "query"), getMyComplaints);
router.get("/:id", authenticate, validate(complaintIdSchema, "params"), getSpecificComplaint);
router.patch("/:id", authenticate, validate(complaintIdSchema, "params"), upload.single("image"), validate(updateComplaintSchema, "body"), authorizeComplaintMiddleware, updateComplaint);
router.patch("/:id/ai-match", authorizeAIService, validate(complaintIdSchema, "params"), validate(statusSchema, "body"), updateComplaintStatus);
router.patch("/:id/status", authenticate, authorizeAdminMiddleware, validate(complaintIdSchema, "params"), validate(statusSchema, "body"), authorizeComplaintMiddleware, updateComplaintStatus);
router.delete("/:id", authenticate, validate(complaintIdSchema, "params"), authorizeComplaintMiddleware, deleteComplaint);

export default router;