import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { authRoutes } from './src/routes/authRoutes.js';
import { jobRoutes } from './src/routes/jobRoutes.js';
import { resumeRoutes } from './src/routes/resumeRoutes.js';
import cloudinary from './src/config/cloudinary.js';

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));


const ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3000',
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. curl, Postman)
        if (!origin) return callback(null, true);
        // Allow the frontend and any Chrome extension
        if (ALLOWED_ORIGINS.includes(origin) || origin.startsWith('chrome-extension://')) {
            return callback(null, true);
        }
        return callback(new Error(`CORS: Origin ${origin} not allowed`));
    },
    credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());



app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/uploads', express.static('uploads')); // Serve uploaded files statically
app.use('/resume', resumeRoutes);



app.listen(5002, () => {
    console.log('Server is running on port 5002');
});




