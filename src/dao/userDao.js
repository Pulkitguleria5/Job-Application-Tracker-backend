import User from '../models/user.js';


export const userDao = {

    findByEmail: async (email) => {
        try {
            const user = await User.findOne({ email });
            return user;
        } catch (error) {
            console.log('Error fetching user by email:', error);
            throw error;
        }
    },

    create: async (userData) => {
        try {
            return await User.create(userData);
            
        } catch (error) {
            console.log('Error creating user:', error);
            throw error;
        }

    },
};