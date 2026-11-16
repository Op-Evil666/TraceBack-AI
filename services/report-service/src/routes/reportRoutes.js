import express from 'express';
import authenticate from "../middlewares/authenticate.js";
import authorizeReportMiddleware from '../middlewares/authorizationMiddleware.js';
import validate from '../middlewares/schemaMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';
import authorizeAIService from '../middlewares/authorizeAIService.js';
import authorizeAdminMiddleware from '../middlewares/authorizeAdminMiddleware.js';
import { createReportSchema } from '../schemas/reportSchema.js';
import paginationSchema from '../schemas/paginationSchema.js';
import reportIdSchema from '../schemas/reportIdSchema.js';
import statusSchema from "../schemas/statusSchema.js"
import createReport from '../controllers/createReport.js';
import getAllReports from '../controllers/getAllReports.js';
import getSpecificReport from '../controllers/getSpecificReport.js';
import getMyReports from '../controllers/getMyReports.js';
import updateReport from "../controllers/updateReport.js";
import updateReportStatus from "../controllers/updateReportStatus.js";
import deleteReport from "../controllers/deleteReport.js";

const router = express.Router();

router.post("/", authenticate, upload.single("image"), validate(createReportSchema, "body"), createReport);
router.get("/", authenticate, validate(paginationSchema, "query"), getAllReports);
router.get("/my-reports", authenticate, validate(paginationSchema, "query"), getMyReports);
router.get("/:id", authenticate, validate(reportIdSchema, "params"), getSpecificReport);
router.patch("/:id", authenticate, validate(reportIdSchema, "params"), authorizeReportMiddleware, updateReport);
router.patch("/:id/ai-match", authorizeAIService, validate(reportIdSchema, "params"), validate(statusSchema, "body"), updateReportStatus);
router.patch("/:id/status", authenticate, authorizeAdminMiddleware, validate(reportIdSchema, "params"), validate(statusSchema, "body"), authorizeReportMiddleware, updateReportStatus);
router.delete("/:id", authenticate, validate(reportIdSchema, "params"), authorizeReportMiddleware, deleteReport);

export default router;