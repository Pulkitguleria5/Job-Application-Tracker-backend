import jwt from 'jsonwebtoken';

export const authMiddleware = {
    protect : async (req, res, next) => {
        try{

            const token = req.cookies?.jwt;
            if (!token) {
                return res.status(401).json({ message: 'No token, authorization denied' });
            }

            try{
                const user = jwt.verify(token, process.env.JWT_SECRET);
                req.user = user;
                next();
            } catch (err) {
                return res.status(401).json({ message: 'Token is not valid' });
            }

        } catch (error) {
            console.log('Error in authMiddleware:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    },
};

