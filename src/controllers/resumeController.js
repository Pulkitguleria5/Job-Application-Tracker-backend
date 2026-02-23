import { get } from "mongoose";
import { resumeDao } from "../dao/resumeDao.js";
import { upload } from "../middleware/uploadMiddleware.js";
import fs from 'fs';
import path from 'path';

export const resumeController = {
    uploadResume: async (req, res) => {
        try {
              if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const resumeData = {
            userId: req.user.id,  // Assuming user ID is available in req.user from auth middleware
            title: req.body.title,   // Assuming title is sent in the request body
            fileUrl: `/uploads/${req.file.filename}` // URL to access the uploaded file
        };

        const resume = await resumeDao.createResume(resumeData);
        res.status(201).json({
            message: 'Resume uploaded successfully',
            resume
        });
        } catch (error) {
            console.error('Error uploading resume:', error);
            res.status(500).json({ message: 'Server error while uploading resume',
                error: error.message
             });
        }
    },

    getResumes: async (req, res) => {
        try {
            const resumes = await resumeDao.getResumeByUserId(req.user.id);
            res.status(200).json({ 
                message: 'Resumes fetched successfully',
                resumes 
            });
        }
        catch (error) {
            console.error('Error fetching resumes:', error);
            res.status(500).json({ message: 'Server error while fetching resumes',
                error: error.message
             });
        }
    },

    deleteResume: async (req, res) => {
        try {
            const resume = await resumeDao.findResumeById(req.params.id, req.user.id);
            if (!resume) {
                return res.status(404).json({ message: 'Resume not found' });
            }

            // Delete the file from the filesystem
            const filePath = path.join("uploads", path.basename(resume.fileUrl));

            if (fs.existsSync(filePath)) {
                await fs.promises.unlink(filePath);
            }

            await resumeDao.deleteResumeById(resume._id);

            res.status(200).json({ message: 'Resume deleted successfully' });

        } catch (error) {
            console.error('Error deleting resume:', error);
            res.status(500).json({ message: 'Server error while deleting resume',
                error: error.message
             });
        }
    },


    updateResumeTitle: async (req, res) => {
        try {
            const { title } = req.body;

            if (!title) {
                return res.status(400).json({ message: 'Title is required' });
            }

            const updatedResume = await resumeDao.updateResumeById(req.params.id, req.user.id, title.trim());
            if (!updatedResume) {
                return res.status(404).json({ message: 'Resume not found' });
            }

            res.status(200).json({ message: 'Resume title updated successfully',
                resume: updatedResume
             });
        }
        catch (error) {
            console.error('Error updating resume title:', error);
            res.status(500).json({ message: 'Server error while updating resume title', 
                error: error.message
             });
        }
    }
};




               




    