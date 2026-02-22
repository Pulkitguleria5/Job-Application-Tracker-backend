import { Job } from '../models/job.js';

export const jobDao = {
    create: async (jobData) => {
        try {
            return await Job.create(jobData);
        } catch (error) {
            console.log('Error creating job:', error);
            throw error;
        }

    },

    update: async (jobId, jobData) => {
        try {
            return await Job.findByIdAndUpdate(jobId,
                { $set: jobData }
                ,{ new: true });

        }
         catch (error) {
            console.log('Error updating job:', error);
            throw error;
        }

    },

    delete: async (jobId) => {
        try {
            return await Job.findByIdAndDelete(jobId);
        }
            catch (error) { 
            console.log('Error deleting job:', error);
            throw error;
        }

    },

    
