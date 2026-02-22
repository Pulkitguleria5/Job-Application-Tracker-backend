import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { authRoutes } from './src/routes/authRoutes.js';
import { jobRoutes } from './src/routes/jobRoutes.js';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));


const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());



app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);



app.listen(5002, () => {
    console.log('Server is running on port 5002');
});




