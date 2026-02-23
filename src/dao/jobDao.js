import { Job } from '../models/job.js';
import mongoose from 'mongoose';

export const jobDao = {
    create: async (jobData) => {
        try {
            return await Job.create(jobData);
        } catch (error) {
            console.log('Error creating job:', error);
            throw error;
        }

    },

    update: async (jobId, userId, jobData) => {
    try {
        return await Job.findOneAndUpdate(
            { _id: jobId, userId: userId },
            { $set: jobData },
            { new: true }
        );
    } catch (error) {
        console.log('Error updating job:', error);
        throw error;
    }
},

    delete: async (jobId, userId) => {
        try {
            return await Job.findOneAndDelete({ _id: jobId, userId: userId });
        }
        catch (error) {
            console.log('Error deleting job:', error);
            throw error;
        }

    },


    getJobs : async (query, sortBy, order, skip, limit) => {
        try {
            const [jobs,total] = await Promise.all([
                Job.find(query)
                    .sort({ [sortBy]: order })
                    .skip(skip)
                    .limit(limit)
                    .populate('resumeUsed', 'title'), // Populate resumeUsed with only the title field

                    // Get total count for pagination
                      Job.countDocuments(query)
            ]);

            return [jobs, total];
        } catch (error) {
            console.log('Error getting jobs:', error);
            throw error;
        }
    },

    getJobStats: async (userId) => {
        try {
            const stats = await Job.aggregate([
                { $match: { userId: new mongoose.Types.ObjectId(userId) } },
                { $group: { _id: "$status", count: { $sum: 1 } } }
            ]);
            return stats;
        } catch (error) {
            console.log('Error getting job stats:', error);
            throw error;
        }
    },

};

