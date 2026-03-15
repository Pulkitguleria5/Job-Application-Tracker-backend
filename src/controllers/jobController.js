
import { jobDao } from "../dao/jobDao.js";
import { resumeDao } from "../dao/resumeDao.js";


export const jobController = {

    createJob: async (req, res) => {
        try {
            const { resumeUsed } = req.body;

            // If resumeUsed is provided, validate it belongs to the user
            if (resumeUsed) {
                const resume = await resumeDao.findResumeById(resumeUsed, req.user.id);
                if (!resume) {
                    return res.status(404).json({ message: 'Resume not found' });
                }
            }

            const jobData = req.body;

            jobData.userId = req.user.id;
            const job = await jobDao.create(jobData);
            res.status(201).json({
                message: 'Job created successfully',
                job
            });
        } catch (error) {
            console.log('Error creating job:', error);
            res.status(500).json({ message: 'Error creating job' });
        }

    },

    updateJob: async (req, res) => {
        try {

            const jobId = req.params.id;
            const jobData = req.body;
            const userId = req.user.id;

            // If resumeUsed is being updated, validate it
            if (jobData.resumeUsed) {
                const resume = await resumeDao.findResumeById(jobData.resumeUsed, req.user.id);
                if (!resume) {
                    return res.status(404).json({ message: 'Resume not found' });
                }
            }


            // Ensure the job belongs to the user
            const job = await jobDao.update(jobId, userId, jobData);
            if (!job) {
                return res.status(404).json({ message: 'Job not found or not authorized' });
            }

            res.status(200).json({
                message: 'Job updated successfully',
                job: job
            });

        } catch (error) {
            console.log('Error updating job:', error);
            res.status(500).json({ message: 'Error updating job' });
        }

    },

    deleteJob: async (req, res) => {
        try {
            const jobId = req.params.id;
            const userId = req.user.id;

            // Ensure the job belongs to the user
            const job = await jobDao.delete(jobId, userId);
            if (!job) {
                return res.status(404).json({ message: 'Job not found or not authorized' });
            }
            res.status(200).json({
                message: 'Job deleted successfully',
                job: job
            });
        } catch (error) {
            console.log('Error deleting job:', error);
            res.status(500).json({ message: 'Error deleting job' });
        }

    },

    getJobs: async (req, res) => {
        try {
            const userId = req.user.id;
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const status = req.query.status;
            const search = req.query.search;
            const sortBy = req.query.sortBy || 'createdAt';
            const order = req.query.order === 'asc' ? 1 : -1;

            const query = { userId: userId };
            if (status) {
                query.status = status;
            }
            if (search) {
                query.$or = [
                    { company: { $regex: search, $options: 'i' } },
                    { role: { $regex: search, $options: 'i' } }
                ];
            }

            const [jobs, total] = await jobDao.getJobs(query, sortBy, order, skip, limit);
            res.status(200).json({
                message: 'Jobs retrieved successfully',
                jobs: jobs,
                pagination: {
                    totalitems: total,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    itemsPerPage: limit
                }
            });
        }

        catch (error) {
            console.log('Error getting jobs:', error);
            res.status(500).json({ message: 'Error getting jobs' });
        }

    },

    getJobStats: async (req, res) => {
        try {
            const userId = req.user.id;


            const stats = await jobDao.getJobStats(userId);
            res.status(200).json({
                message: 'Job stats retrieved successfully',
                stats: stats
            });
        }
        catch (error) {
            console.log('Error getting job stats:', error);
            res.status(500).json({ message: 'Error getting job stats' });
        }
    },

    getResumeStats: async (req, res) => {
        try {

            const userId = req.user.id;

            const stats = await jobDao.getResumeStats(userId);

            res.status(200).json({
                message: "Resume stats retrieved successfully",
                stats
            });

        } catch (error) {
            console.log("Error getting resume stats:", error);
            res.status(500).json({ message: "Error getting resume stats" });
        }
    }

}




