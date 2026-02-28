import { Resume } from "../models/resume.js";

export const resumeDao = {
    createResume: async (data) => {
        try {
            return await Resume.create(data);
        } catch (error) {
            throw new Error("Database Error while creating resume");
        }
    },

    getResumeByUserId: async (userId) => {
        try {
            return await Resume.find({ userId }).sort({ createdAt: -1 }); // Get resumes for a user, sorted by most recent
        } catch (error) {
            throw new Error("Database Error while fetching resumes");
        }
    },

    findResumeById: async (id, userId) => {
        try {
            return await Resume.findOne({ _id: id, userId });
        } catch (error) {
            throw new Error("Database Error while finding resume by ID");
        }
    },

    deleteResumeById: async (id) => {
        try {
            return await Resume.findByIdAndDelete(id);
        } catch (error) {
            throw new Error("Database Error while deleting resume by ID");
        }
    },

    updateResumeById: async (id, userId, title) => {
        try {
            return await Resume.findOneAndUpdate({ _id: id, userId },
                { title },
                { new: true }
            );
        } catch (error) {
            throw new Error("Database Error while updating resume by ID");
        }
    },
};