import {userDao} from '../dao/userDao.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';


export const authController = {

    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: 'Name, email, and password are required.' });
            }
            // Check if user already exists
            const existingUser = await userDao.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use.' });
            }

            //hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);


            const newUser = await userDao.create({
                name,
                email,
                password: hashedPassword
            });

            res.status(201).json({
                message: 'User registered successfully',
                user: newUser
            });

        } catch (error) {
            console.log('Error in register:', error);
            res.status(500).json({ message: 'Server error during registration' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required.' });
            }

            const user = await userDao.findByEmail(email);
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password.' });
            }

            const token = jwt.sign({
                id: user._id,
                email: user.email,
                name: user.name
            }, process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.cookie('jwt', token, {
                httpOnly: true,
                secure: true,
                domain: 'localhost',
                path: '/'
            });

            return res.json({
                message: 'Login successful',
                user: user
            });
        }
        catch (error) {

            console.log('Error in login:', error);
            res.status(500).json({ message: 'Server error during login' });
        }

    },

    logout: (req, res) => {

        try {
            res.clearCookie('jwt');
            return res.json({ message: 'Logout successful' });
        }
        catch (error) {
            console.log('Error in logout:', error);
            return res.status(500).json({ message: 'Server error during logout' });
        }

    },


    googleSso: async (req, res) => {

        try{
            const { idToken } = req.body;
            if (!idToken) {
                return res.status(400).json({ message: 'Token ID is required.' });
            }

            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

            const googleResponse = await client.verifyIdToken({
                idToken: idToken,
                audience: process.env.GOOGLE_CLIENT_ID
            });

            const payload = googleResponse.getPayload();
            const { sub: googleId, email, name } = payload;

            let user = await userDao.findByEmail(email);
            if (!user) {
                user = await userDao.create({
                    name,
                    email,
                    googleId
                });
            }

            const token = jwt.sign({
                id: user._id,
                email: user.email,
                name: user.name,
                googleId: user.googleId
            }, process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.cookie('jwt', token, {
                httpOnly: true,
                secure: true,
                domain: 'localhost',
                path: '/'
            });

            return res.json({
                message: 'Google SSO successful',
                user: user
            });
        }
        catch (error) {
            console.log('Error in googleSso:', error);
            return res.status(500).json({ message: 'Server error during Google SSO' });
        }
    },

};





