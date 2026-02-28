import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true , index: true},
    title: { type: String, required: true ,trim: true},
    fileUrl: { type: String, required: true ,trim: true},
    publicId: { type: String, required: true ,trim: true},
},
    { timestamps: true }   // Automatically adds createdAt and updatedAt fields in the schema
);

export const Resume = mongoose.model('Resume', resumeSchema);
