import { jobController } from "../controllers/jobController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { jobValidation } from "../validations/jobValidation.js";
import express from "express";

export const jobRoutes = express.Router();


jobRoutes.post('/create', authMiddleware.protect, jobValidation.createJob, validate, jobController.createJob);
jobRoutes.get('/get-jobs', authMiddleware.protect,jobValidation.getJobs, validate, jobController.getJobs);
jobRoutes.get('/stats', authMiddleware.protect, jobController.getJobStats);
jobRoutes.put('/:id', authMiddleware.protect, jobController.updateJob);
jobRoutes.delete('/:id', authMiddleware.protect, jobController.deleteJob);

jobRoutes.get("/resume-stats", authMiddleware.protect, jobController.getResumeStats);
   

