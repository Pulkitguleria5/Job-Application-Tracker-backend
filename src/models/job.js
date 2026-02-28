import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true , index: true},
    company : { type: String, required: true ,trim: true},
    role : { type: String, required: true ,trim: true},
    jobUrl : { type: String, required: false ,trim: true},
    salaryRange : { type: String, required: false ,trim: true},
    status : { type: String, enum: ['Applied', 'Interviewing', 'Offered', 'Rejected'], default: 'Applied',index: true},
    notes : { type: String},
    appliedDate : { type: Date, default: Date.now},
    followUpDate : { type: Date ,index: true},
    resumeUsed : { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },

},
    { timestamps: true }   // Automatically adds createdAt and updatedAt fields in the schema
);

jobSchema.index({ createdAt: -1 }); // already sorts by createdAt descending by default


export const Job = mongoose.model('Job', jobSchema);
