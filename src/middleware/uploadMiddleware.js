import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import path from 'path';

//storage configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

//file filter (pdf only)
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'application/pdf') {
//         cb(null, true);
//     } else {
//         cb(new Error('Only PDF files are allowed!'), false);
//     }
// };

// export const upload = multer({ storage, fileFilter });


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'careerflow_resumes',
        resource_type: 'raw', // Treat as raw file to allow PDF uploads
        format: async () => 'pdf', // Ensure the file is stored as PDF
        public_id: (req, file) => Date.now().toString(),

    },
});

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

