import { jobController } from "../controllers/jobController";
import { authMiddleware } from "../middleware/authMiddleware";
import express from "express";

export const jobRoutes = express.Router();


jobRoutes.post('/create', authMiddleware.protect, jobController.createJob);
jobRoutes.get('/get-jobs', authMiddleware.protect, jobController.getJobs);
jobRoutes.get('/stats', authMiddleware.protect, jobController.getJobStats);
jobRoutes.put('/:id', authMiddleware.protect, jobController.updateJob);
jobRoutes.delete('/:id', authMiddleware.protect, jobController.deleteJob);
   

