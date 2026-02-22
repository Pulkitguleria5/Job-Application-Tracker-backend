import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, },

    email: { type: String, required: true, unique: true, },

    password: { type: String , required:false,},

    googleId: {type: String,}
},
    { timestamps: true }   // Automatically adds createdAt and updatedAt fields in the schema
);


const User = mongoose.model('User', userSchema);

export default User;